import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, BookOpen, Maximize2, Minimize2, Cog, Settings } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';
import { Project, Component } from '../../store/editorStore';
import { FrostedGlassPanel, CrystalButton, GlobalBackground } from '../../components/ClockEdUI';

interface FlipbookPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}

const FlipbookPreviewModal: React.FC<FlipbookPreviewModalProps> = ({
  isOpen,
  onClose,
  project
}) => {
  const flipBookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (project?.pages) {
      setTotalPages(project.pages.length);
    }
  }, [project]);

  const renderComponent = (component: Component) => {
    const style = {
      position: 'absolute' as const,
      left: `${component.position.x}px`,
      top: `${component.position.y}px`,
      width: `${component.size.width}px`,
      height: `${component.size.height}px`,
      zIndex: component.zIndex,
    };

    switch (component.type) {
      case 'text':
        return (
          <div
            key={component.id}
            style={{
              ...style,
              fontSize: `${component.props.fontSize || 16}px`,
              color: '#1e1e1e',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.4',
              padding: '8px',
            }}
          >
            {component.props.content || 'New text'}
          </div>
        );
      
      case 'image':
        return component.props.imageUrl ? (
          <img
            key={component.id}
            src={component.props.imageUrl}
            alt="Component"
            style={{
              ...style,
              objectFit: 'cover',
              borderRadius: '4px',
              border: '1px solid rgba(0, 234, 255, 0.2)',
            }}
          />
        ) : null;
      
      case 'qr':
        return (
          <div
            key={component.id}
            style={{
              ...style,
              backgroundColor: 'white',
              border: '2px solid #d4af37',
              borderRadius: '8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              boxShadow: '0 4px 8px rgba(0, 234, 255, 0.1)',
            }}
          >
            <div style={{
              width: '60%',
              height: '60%',
              backgroundColor: '#1e1e1e',
              borderRadius: '4px',
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              color: 'white',
            }}>
              QR
            </div>
            <span style={{
              fontSize: '10px',
              color: '#1e1e1e',
              textAlign: 'center',
              fontFamily: 'Inter, sans-serif',
            }}>
              {component.props.qrLabel || 'QR Code'}
            </span>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderPage = (page: any, index: number) => {
    return (
      <div
        key={page.id}
        className="page-content"
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f8f9fb',
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid rgba(0, 234, 255, 0.3)',
          borderRadius: '12px',
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(0, 234, 255, 0.05) 1px, transparent 1px),
            radial-gradient(circle at 80% 70%, rgba(0, 234, 255, 0.05) 1px, transparent 1px),
            linear-gradient(135deg, #f8f9fb 0%, #f2f4f7 100%)
          `,
        }}
      >
        {/* Crystal Page Header */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          background: 'linear-gradient(135deg, #d4af37 0%, #f4d03f 50%, #8b6914 100%)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Cinzel, serif',
          zIndex: 10,
          boxShadow: '0 4px 12px rgba(212, 175, 55, 0.3), 0 0 20px rgba(0, 234, 255, 0.2)',
          border: '1px solid rgba(0, 234, 255, 0.3)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{page.title}</span>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              border: '2px solid rgba(255, 255, 255, 0.5)', 
              borderRadius: '50%',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '4px',
                height: '4px',
                backgroundColor: 'rgba(0, 234, 255, 0.8)',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
              }} />
            </div>
          </div>
        </div>

        {/* Page Content Area */}
        <div style={{
          position: 'absolute',
          top: '70px',
          left: '0',
          right: '0',
          bottom: '0',
          padding: '16px',
        }}>
          {page.components.map((component: Component) => renderComponent(component))}
          
          {/* Empty State */}
          {page.components.length === 0 && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'rgba(30, 30, 30, 0.4)',
              fontFamily: 'Inter, sans-serif',
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(0, 234, 255, 0.1))',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                border: '2px dashed rgba(212, 175, 55, 0.3)',
              }}>
                <BookOpen size={24} style={{ color: 'rgba(212, 175, 55, 0.6)' }} />
              </div>
              <p>Empty page</p>
            </div>
          )}
        </div>

        {/* Page Number */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          fontSize: '12px',
          color: 'rgba(30, 30, 30, 0.6)',
          fontFamily: 'Inter, sans-serif',
          background: 'rgba(248, 249, 251, 0.8)',
          padding: '4px 8px',
          borderRadius: '6px',
          border: '1px solid rgba(0, 234, 255, 0.2)',
        }}>
          {index + 1}
        </div>
      </div>
    );
  };

  const handleFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  const nextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Crystal Background */}
        <div className="absolute inset-0 bg-dark-bronze/80 backdrop-blur-md">
          <GlobalBackground enableGears enableFrost enableAurora={false} enableSnowfall={false} />
        </div>

        <motion.div
          className={`relative z-10 ${
            isFullscreen ? 'w-full h-full' : 'max-w-6xl w-full max-h-[90vh]'
          }`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <FrostedGlassPanel glowColor="aurora" borderStyle="crystal" hasGearCorner className="h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-glass-white/20">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <BookOpen className="h-6 w-6 text-brass" />
                  <div className="absolute inset-0 h-6 w-6 bg-brass/20 rounded-full blur-sm"></div>
                </div>
                <h2 className="text-xl font-cinzel font-bold text-dark-bronze">
                  {project.title} - Flipbook Preview
                </h2>
                <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
              </div>
              
              <div className="flex items-center space-x-2">
                <CrystalButton
                  onClick={toggleFullscreen}
                  variant="ghost"
                  size="sm"
                  icon={isFullscreen ? Minimize2 : Maximize2}
                />
                <CrystalButton
                  onClick={onClose}
                  variant="ghost"
                  size="sm"
                  icon={X}
                  className="hover:border-red-400/30 hover:shadow-red-500/30"
                />
              </div>
            </div>

            {/* Flipbook Container */}
            <div className="flex-1 p-6 flex items-center justify-center relative overflow-hidden">
              {/* Floating gears */}
              <div className="absolute top-8 left-8 opacity-20">
                <Cog className="h-12 w-12 text-brass animate-spin-slow" />
              </div>
              <div className="absolute bottom-8 right-8 opacity-20">
                <Settings className="h-10 w-10 text-neon-cyan animate-reverse-spin" />
              </div>

              {project.pages && project.pages.length > 0 ? (
                <div className="relative">
                  <HTMLFlipBook
                    ref={flipBookRef}
                    width={400}
                    height={600}
                    size="stretch"
                    minWidth={300}
                    maxWidth={500}
                    minHeight={400}
                    maxHeight={700}
                    maxShadowOpacity={0.5}
                    showCover={true}
                    mobileScrollSupport={false}
                    onFlip={handleFlip}
                    className="flipbook"
                    style={{}}
                    startPage={0}
                    drawShadow={true}
                    flippingTime={1000}
                    usePortrait={true}
                    startZIndex={0}
                    autoSize={false}
                    clickEventForward={true}
                    useMouseEvents={true}
                    swipeDistance={30}
                    showPageCorners={true}
                    disableFlipByClick={false}
                  >
                    {project.pages.map((page, index) => renderPage(page, index))}
                  </HTMLFlipBook>
                  
                  {/* Crystal sparkles around flipbook */}
                  <div className="absolute -top-4 -left-4 w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
                  <div className="absolute -top-4 -right-4 w-2 h-2 bg-brass rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute -bottom-4 -left-4 w-2 h-2 bg-brass rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute -bottom-4 -right-4 w-2 h-2 bg-neon-cyan rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                </div>
              ) : (
                <FrostedGlassPanel className="p-16 text-center" glowColor="aurora" hasGearCorner>
                  <div className="w-16 h-16 bg-brass/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <BookOpen className="h-8 w-8 text-brass/60" />
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-brass/30"></div>
                  </div>
                  <h3 className="text-xl font-cinzel font-bold text-dark-bronze/60 mb-2">
                    No pages to preview
                  </h3>
                  <p className="text-dark-bronze/40 font-inter">
                    Add some pages to your book to see the flipbook preview
                  </p>
                </FrostedGlassPanel>
              )}
            </div>

            {/* Controls */}
            {project.pages && project.pages.length > 0 && (
              <div className="border-t border-glass-white/20">
                <FrostedGlassPanel className="rounded-none border-0" borderStyle="standard">
                  <div className="flex items-center justify-between p-6">
                    <CrystalButton
                      onClick={prevPage}
                      disabled={currentPage === 0}
                      variant="secondary"
                      size="md"
                      icon={ChevronLeft}
                    >
                      Previous
                    </CrystalButton>

                    <div className="flex items-center space-x-4 text-dark-bronze font-inter">
                      <span>Page {currentPage + 1} of {totalPages}</span>
                      <div className="w-32 bg-glass-white/30 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-brass to-neon-cyan h-2 rounded-full transition-all duration-300 shadow-cyan-glow"
                          style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                        />
                      </div>
                    </div>

                    <CrystalButton
                      onClick={nextPage}
                      disabled={currentPage >= totalPages - 1}
                      variant="secondary"
                      size="md"
                      icon={ChevronRight}
                    >
                      Next
                    </CrystalButton>
                  </div>
                </FrostedGlassPanel>
              </div>
            )}
          </FrostedGlassPanel>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FlipbookPreviewModal;