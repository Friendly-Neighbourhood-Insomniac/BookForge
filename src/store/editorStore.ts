import { create } from 'zustand';

export interface Component {
  id: string;
  type: 'text' | 'image' | 'qr';
  x: number;
  y: number;
  width: number;
  height: number;
  content?: string;
  fontSize?: number;
  imageUrl?: string;
  qrLabel?: string;
  qrTarget?: string;
}

export interface Page {
  id: string;
  title: string;
  components: Component[];
}

export interface Project {
  id: string;
  title: string;
  author: string;
  description: string;
  pages: Page[];
}

interface EditorState {
  project: Project | null;
  activePageId: string | null;
  selectedComponentId: string | null;
  unsavedChanges: boolean;
  isLoading: boolean;
  
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
  markSaved: () => void;
  setLoading: (loading: boolean) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  project: null,
  activePageId: null,
  selectedComponentId: null,
  unsavedChanges: false,
  isLoading: false,

  setProject: (project) => set({ project, activePageId: project.pages[0]?.id || null }),
  
  setActivePageId: (pageId) => set({ activePageId: pageId, selectedComponentId: null }),
  
  setSelectedComponentId: (componentId) => set({ selectedComponentId: componentId }),
  
  addPage: () => {
    const state = get();
    if (!state.project) return;
    
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
  },
  
  addComponent: (type) => {
    const state = get();
    if (!state.project || !state.activePageId) return;
    
    const newComponent: Component = {
      id: `component_${Date.now()}`,
      type,
      x: 200,
      y: 200,
      width: type === 'text' ? 200 : 150,
      height: type === 'text' ? 50 : 150,
      ...(type === 'text' && { content: 'New text', fontSize: 16 }),
      ...(type === 'image' && { imageUrl: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=1' }),
      ...(type === 'qr' && { qrLabel: 'QR Code', qrTarget: 'https://example.com' })
    };
    
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
  },
  
  updateComponent: (componentId, updates) => {
    const state = get();
    if (!state.project || !state.activePageId) return;
    
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
  },
  
  deleteComponent: (componentId) => {
    const state = get();
    if (!state.project || !state.activePageId) return;
    
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
  },
  
  duplicateComponent: (componentId) => {
    const state = get();
    if (!state.project || !state.activePageId) return;
    
    const activePage = state.project.pages.find(p => p.id === state.activePageId);
    const component = activePage?.components.find(c => c.id === componentId);
    
    if (!component) return;
    
    const duplicatedComponent: Component = {
      ...component,
      id: `component_${Date.now()}`,
      x: component.x + 20,
      y: component.y + 20
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
  },
  
  updateProject: (updates) => {
    const state = get();
    if (!state.project) return;
    
    set({
      project: { ...state.project, ...updates },
      unsavedChanges: true
    });
  },
  
  markSaved: () => set({ unsavedChanges: false }),
  
  setLoading: (loading) => set({ isLoading: loading })
}));