import React from 'react';
import { motion } from 'framer-motion';
import { Type, Image, QrCode, Layout, Cog, Settings, Layers, Grid } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';

const ComponentToolbar: React.FC = () => {
  const { addComponent } = useEditorStore();

  const tools = [
    { type: 'text' as const, icon: Type, label: 'Text', color: 'from-brass to-brass-light' },
    { type: 'image' as const, icon: Image, label: 'Image', color: 'from-neon-cyan to-brass' },
    { type: 'qr' as const, icon: QrCode, label: 'QR Code', color: 'from-brass-light to-neon-cyan' },
  ];

  const layoutTools = [
    { icon: Layout, label: 'Page Templates', action: () => console.log('Templates') },
    { icon: Layers, label: 'Layer Manager', action: () => console.log('Layers') },
    { icon: Grid, label: 'Alignment', action: () => console.log('Alignment') },
  ];

  return (
    <div className="bg-cracked-porcelain/95 backdrop-blur-md border-t-2 border-brass/30 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-cracked-porcelain opacity-50"></div>
      <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-neon-cyan/20 via-transparent to-neon-cyan/20"></div>
      
      <div className="relative z-10 p-4">
        <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto space-y-4 lg:space-y-0">
          {/* Component Tools Section */}
          <div className="flex items-center space-x-4 w-full lg:w-auto">
            <div className="flex items-center space-x-2 mr-6">
              <Cog className="h-5 w-5 text-brass animate-spin-slow" />
              <h3 className="text-lg font-cinzel font-bold text-dark-bronze hidden sm:block">Add Components</h3>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap">
              {tools.map((tool) => (
                <motion.button
                  key={tool.type}
                  onClick={() => addComponent(tool.type)}
                  className={`group relative flex items-center space-x-2 sm:space-x-3 bg-gradient-to-r ${tool.color} text-white px-3 sm:px-6 py-2 sm:py-3 rounded-xl font-inter font-semibold transition-all duration-300 shadow-brass hover:shadow-cyan-glow border-2 border-brass-light/30 overflow-hidden`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <tool.icon className="h-4 w-4 sm:h-5 sm:w-5 relative z-10" />
                  <span className="relative z-10 text-sm sm:text-base">{tool.label}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Layout Tools Section */}
          <div className="flex items-center space-x-3 w-full lg:w-auto">
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-neon-cyan animate-reverse-spin" />
              <span className="text-dark-bronze font-inter font-medium hidden sm:inline">Layout Tools:</span>
            </div>
            
            <div className="flex items-center space-x-2 flex-wrap">
              {layoutTools.map((tool, index) => (
                <motion.button
                  key={index}
                  onClick={tool.action}
                  className="flex items-center space-x-1 sm:space-x-2 bg-porcelain-gradient hover:bg-brass/10 text-dark-bronze px-2 sm:px-4 py-2 rounded-xl font-inter font-medium transition-all duration-300 shadow-porcelain border border-brass/20 hover:shadow-brass-glow"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={tool.label}
                >
                  <tool.icon className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm">{tool.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentToolbar;