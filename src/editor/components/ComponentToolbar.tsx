import React from 'react';
import { motion } from 'framer-motion';
import { Type, Image, QrCode, Layout, Cog, Settings, Layers, Grid } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import { FrostedGlassPanel, CrystalButton } from '../../components/ClockEdUI';

const ComponentToolbar: React.FC = () => {
  const { addComponent } = useEditorStore();

  const tools = [
    { type: 'text' as const, icon: Type, label: 'Text', color: 'brass' },
    { type: 'image' as const, icon: Image, label: 'Image', color: 'cyan' },
    { type: 'qr' as const, icon: QrCode, label: 'QR Code', color: 'aurora' },
  ];

  const layoutTools = [
    { icon: Layout, label: 'Page Templates', action: () => console.log('Templates') },
    { icon: Layers, label: 'Layer Manager', action: () => console.log('Layers') },
    { icon: Grid, label: 'Alignment', action: () => console.log('Alignment') },
  ];

  return (
    <div className="relative z-20 border-t border-glass-white/20">
      <FrostedGlassPanel className="rounded-none border-0 border-t border-neon-cyan/20">
        <div className="relative z-10 p-4">
          <div className="flex flex-col lg:flex-row items-center justify-between max-w-6xl mx-auto space-y-4 lg:space-y-0">
            {/* Component Tools Section */}
            <div className="flex items-center space-x-4 w-full lg:w-auto">
              <div className="flex items-center space-x-2 mr-6">
                <div className="relative">
                  <Cog className="h-5 w-5 text-brass animate-spin-slow" />
                  <div className="absolute inset-0 h-5 w-5 bg-brass/20 rounded-full blur-sm"></div>
                </div>
                <h3 className="text-lg font-cinzel font-bold text-dark-bronze hidden sm:block">Add Components</h3>
              </div>
              
              <div className="flex items-center space-x-2 sm:space-x-3 flex-wrap">
                {tools.map((tool) => (
                  <motion.div key={tool.type}>
                    <CrystalButton
                      onClick={() => addComponent(tool.type)}
                      variant="primary"
                      size="md"
                      icon={tool.icon}
                      hasGearEffect
                      className={`
                        ${tool.color === 'cyan' ? 'bg-gradient-to-r from-neon-cyan to-brass border-neon-cyan/30' : ''}
                        ${tool.color === 'aurora' ? 'bg-gradient-to-r from-brass to-neon-cyan border-aurora-glow/30' : ''}
                      `}
                    >
                      <span className="text-sm sm:text-base">{tool.label}</span>
                    </CrystalButton>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Layout Tools Section */}
            <div className="flex items-center space-x-3 w-full lg:w-auto">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Settings className="h-5 w-5 text-neon-cyan animate-reverse-spin" />
                  <div className="absolute inset-0 h-5 w-5 bg-neon-cyan/20 rounded-full blur-sm"></div>
                </div>
                <span className="text-dark-bronze font-inter font-medium hidden sm:inline">Layout Tools:</span>
              </div>
              
              <div className="flex items-center space-x-2 flex-wrap">
                {layoutTools.map((tool, index) => (
                  <motion.div key={index}>
                    <CrystalButton
                      onClick={tool.action}
                      variant="ghost"
                      size="sm"
                      icon={tool.icon}
                    >
                      <span className="hidden sm:inline text-sm">{tool.label}</span>
                    </CrystalButton>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FrostedGlassPanel>
    </div>
  );
};

export default ComponentToolbar;