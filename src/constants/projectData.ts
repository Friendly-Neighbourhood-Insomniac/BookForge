export const COVER_PRESETS = [
  { id: 'mathematics', name: 'Mathematics', icon: 'Calculator' },
  { id: 'science', name: 'Science', icon: 'Atom' },
  { id: 'literature', name: 'Literature', icon: 'BookOpen' },
  { id: 'history', name: 'History', icon: 'Globe' }
] as const;

export const TEMPLATE_OPTIONS = [
  { 
    id: 'classic', 
    name: 'Classic Layout', 
    icon: 'BookOpen', 
    description: 'Traditional textbook layout with headers and body text' 
  },
  { 
    id: 'modern', 
    name: 'Modern Layout', 
    icon: 'Palette', 
    description: 'Contemporary design with visual elements and sidebars' 
  },
  { 
    id: 'interactive', 
    name: 'Interactive Layout', 
    icon: 'Sparkles', 
    description: 'Gamified layout with embedded activities and media' 
  }
] as const;

export const PROJECT_TYPES = [
  {
    id: 'textbook',
    name: 'Textbook',
    description: 'Ideal for theory-heavy learning material with structured chapters and comprehensive content.',
    icon: 'BookOpen'
  },
  {
    id: 'workbook',
    name: 'Workbook', 
    description: 'Great for interactive practice pages with exercises, worksheets, and hands-on activities.',
    icon: 'FileText'
  }
] as const;