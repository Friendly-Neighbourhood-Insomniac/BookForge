import { create } from 'zustand';
import { supabase } from '../utils/supabase';

export interface Component {
  id: string;
  type: 'text' | 'image' | 'qr';
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  zIndex: number;
  props: Record<string, any>;
  meta?: Record<string, any>;
}

export interface Page {
  id: string;
  title: string;
  components: Component[];
}

export interface Project {
  id: string;
  title: string;
  project_type: 'textbook' | 'workbook';
  author?: string;
  description?: string;
  cover_type?: string;
  template_type?: string;
  cover_url?: string;
  pages: Page[];
}

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

interface EditorState {
  project: Project | null;
  activePageId: string | null;
  selectedComponentId: string | null;
  unsavedChanges: boolean;
  isLoading: boolean;
  saveStatus: SaveStatus;
  undoStack: Project[];
  redoStack: Project[];
  autosaveTimeout: NodeJS.Timeout | null;
  
  // Actions
  setProject: (project: Project) => void;
  setActivePageId: (pageId: string) => void;
  setSelectedComponentId: (componentId: string | null) => void;
  addPage: () => void;
  addComponent: (type: Component['type']) => void;
  updateComponent: (componentId: string, updates: Partial<Component>) => void;
  deleteComponent: (componentId: string) => void;
  duplicateComponent: (componentId: string) => void;
  updateProject: (updates: Partial<Project>) => void;
  saveProjectToSupabase: () => Promise<void>;
  triggerSave: (immediate?: boolean) => void;
  markSaved: () => void;
  setLoading: (loading: boolean) => void;
  setSaveStatus: (status: SaveStatus) => void;
  undo: () => void;
  redo: () => void;
  pushToUndoStack: () => void;
  clearRedoStack: () => void;
}

const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj));

export const useEditorStore = create<EditorState>((set, get) => ({
  project: null,
  activePageId: null,
  selectedComponentId: null,
  unsavedChanges: false,
  isLoading: false,
  saveStatus: 'idle',
  undoStack: [],
  redoStack: [],
  autosaveTimeout: null,

  setProject: (project) => {
    set({ 
      project, 
      activePageId: project.pages[0]?.id || null,
      undoStack: [],
      redoStack: [],
      unsavedChanges: false
    });
  },
  
  setActivePageId: (pageId) => set({ activePageId: pageId, selectedComponentId: null }),
  
  setSelectedComponentId: (componentId) => set({ selectedComponentId: componentId }),

  pushToUndoStack: () => {
    const state = get();
    if (!state.project) return;
    
    const newUndoStack = [...state.undoStack, deepClone(state.project)];
    // Limit undo stack to 20 items
    if (newUndoStack.length > 20) {
      newUndoStack.shift();
    }
    
    set({ undoStack: newUndoStack });
  },

  clearRedoStack: () => set({ redoStack: [] }),
  
  addPage: () => {
    const state = get();
    if (!state.project) return;
    
    // Push current state to undo stack
    state.pushToUndoStack();
    state.clearRedoStack();
    
    const newPage: Page = {
      id: `page_${Date.now()}`,
      title: `Page ${state.project.pages.length + 1}`,
      components: []
    };
    
    set({
      project: {
        ...state.project,
        pages: [...state.project.pages, newPage]
      },
      activePageId: newPage.id,
      unsavedChanges: true
    });
    
    state.triggerSave();
  },
  
  addComponent: (type) => {
    const state = get();
    if (!state.project || !state.activePageId) return;
    
    // Push current state to undo stack
    state.pushToUndoStack();
    state.clearRedoStack();
    
    const newComponent: Component = {
      id: `component_${Date.now()}`,
      type,
      position: { x: 200, y: 200 },
      size: { 
        width: type === 'text' ? 200 : 150, 
        height: type === 'text' ? 50 : 150 
      },
      zIndex: 1,
      props: {},
      meta: {}
    };

    // Set type-specific props
    switch (type) {
      case 'text':
        newComponent.props = { content: 'New text', fontSize: 16 };
        break;
      case 'image':
        newComponent.props = { imageUrl: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1' };
        break;
      case 'qr':
        newComponent.props = { qrLabel: 'QR Code', qrTarget: 'https://example.com' };
        break;
    }
    
    const updatedPages = state.project.pages.map(page =>
      page.id === state.activePageId
        ? { ...page, components: [...page.components, newComponent] }
        : page
    );
    
    set({
      project: { ...state.project, pages: updatedPages },
      selectedComponentId: newComponent.id,
      unsavedChanges: true
    });
    
    state.triggerSave();
  },
  
  updateComponent: (componentId, updates) => {
    const state = get();
    if (!state.project || !state.activePageId) return;
    
    // Push current state to undo stack
    state.pushToUndoStack();
    state.clearRedoStack();
    
    const updatedPages = state.project.pages.map(page =>
      page.id === state.activePageId
        ? {
            ...page,
            components: page.components.map(comp =>
              comp.id === componentId ? { ...comp, ...updates } : comp
            )
          }
        : page
    );
    
    set({
      project: { ...state.project, pages: updatedPages },
      unsavedChanges: true
    });
    
    state.triggerSave();
  },
  
  deleteComponent: (componentId) => {
    const state = get();
    if (!state.project || !state.activePageId) return;
    
    // Push current state to undo stack
    state.pushToUndoStack();
    state.clearRedoStack();
    
    const updatedPages = state.project.pages.map(page =>
      page.id === state.activePageId
        ? {
            ...page,
            components: page.components.filter(comp => comp.id !== componentId)
          }
        : page
    );
    
    set({
      project: { ...state.project, pages: updatedPages },
      selectedComponentId: null,
      unsavedChanges: true
    });
    
    state.triggerSave();
  },
  
  duplicateComponent: (componentId) => {
    const state = get();
    if (!state.project || !state.activePageId) return;
    
    // Push current state to undo stack
    state.pushToUndoStack();
    state.clearRedoStack();
    
    const activePage = state.project.pages.find(p => p.id === state.activePageId);
    const component = activePage?.components.find(c => c.id === componentId);
    
    if (!component) return;
    
    const duplicatedComponent: Component = {
      ...deepClone(component),
      id: `component_${Date.now()}`,
      position: {
        x: component.position.x + 20,
        y: component.position.y + 20
      }
    };
    
    const updatedPages = state.project.pages.map(page =>
      page.id === state.activePageId
        ? { ...page, components: [...page.components, duplicatedComponent] }
        : page
    );
    
    set({
      project: { ...state.project, pages: updatedPages },
      selectedComponentId: duplicatedComponent.id,
      unsavedChanges: true
    });
    
    state.triggerSave();
  },
  
  updateProject: (updates) => {
    const state = get();
    if (!state.project) return;
    
    // Push current state to undo stack
    state.pushToUndoStack();
    state.clearRedoStack();
    
    set({
      project: { ...state.project, ...updates },
      unsavedChanges: true
    });
    
    state.triggerSave();
  },

  saveProjectToSupabase: async () => {
    const state = get();
    if (!state.project) return;

    set({ saveStatus: 'saving' });

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        throw new Error('No authenticated user');
      }

      // Prepare the update data
      const updateData = {
        title: state.project.title,
        project_type: state.project.project_type,
        author: state.project.author || null,
        description: state.project.description || null,
        cover_type: state.project.cover_type || null,
        template_type: state.project.template_type || null,
        cover_url: state.project.cover_url || null,
        pages: state.project.pages,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', state.project.id)
        .eq('user_id', session.user.id); // Ensure RLS compliance

      if (error) {
        console.error('Supabase save error:', error);
        set({ saveStatus: 'error' });
        throw error;
      }

      set({ 
        saveStatus: 'saved',
        unsavedChanges: false
      });

      // Reset status after 2 seconds
      setTimeout(() => {
        const currentState = get();
        if (currentState.saveStatus === 'saved') {
          set({ saveStatus: 'idle' });
        }
      }, 2000);

    } catch (error) {
      console.error('Error saving project:', error);
      set({ saveStatus: 'error' });
      
      // Reset error status after 3 seconds
      setTimeout(() => {
        const currentState = get();
        if (currentState.saveStatus === 'error') {
          set({ saveStatus: 'idle' });
        }
      }, 3000);
    }
  },

  triggerSave: (immediate = false) => {
    const state = get();
    
    // Clear existing timeout
    if (state.autosaveTimeout) {
      clearTimeout(state.autosaveTimeout);
    }

    if (immediate) {
      state.saveProjectToSupabase();
    } else {
      // Set up autosave after 15 seconds
      const timeout = setTimeout(() => {
        const currentState = get();
        if (currentState.unsavedChanges) {
          currentState.saveProjectToSupabase();
        }
      }, 15000);

      set({ autosaveTimeout: timeout });
    }
  },
  
  markSaved: () => set({ unsavedChanges: false, saveStatus: 'saved' }),
  
  setLoading: (loading) => set({ isLoading: loading }),

  setSaveStatus: (status) => set({ saveStatus: status }),

  undo: () => {
    const state = get();
    if (state.undoStack.length === 0) return;

    const previousState = state.undoStack[state.undoStack.length - 1];
    const newUndoStack = state.undoStack.slice(0, -1);
    const newRedoStack = state.project ? [...state.redoStack, deepClone(state.project)] : state.redoStack;

    set({
      project: previousState,
      undoStack: newUndoStack,
      redoStack: newRedoStack,
      unsavedChanges: true,
      selectedComponentId: null
    });

    state.triggerSave();
  },

  redo: () => {
    const state = get();
    if (state.redoStack.length === 0) return;

    const nextState = state.redoStack[state.redoStack.length - 1];
    const newRedoStack = state.redoStack.slice(0, -1);
    const newUndoStack = state.project ? [...state.undoStack, deepClone(state.project)] : state.undoStack;

    set({
      project: nextState,
      undoStack: newUndoStack,
      redoStack: newRedoStack,
      unsavedChanges: true,
      selectedComponentId: null
    });

    state.triggerSave();
  }
}));