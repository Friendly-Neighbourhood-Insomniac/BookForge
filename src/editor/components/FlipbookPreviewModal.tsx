import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, BookOpen, Maximize2, Minimize2 } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';
import { Project, Component } from '../../store/editorStore';

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
          backgroundColor: '#fafafa',
          position: 'relative',
          overflow: 'hidden',
          border: '1px solid #d4af37',
          borderRadius: '8px',
        }}
      >
        {/* Page Header */}
        <div style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          right: '16px',
          backgroundColor: '#b08d57',
          color: 'white',
          padding: '8px 16px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Cinzel, serif',
          zIndex: 10,
        }}>
          {page.title}
        </div>

        {/* Page Content Area */}
        <div style={{
          position: 'absolute',
          top: '60px',
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
              color: '#1e1e1e40',
              fontFamily: 'Inter, sans-serif',
            }}>
              <BookOpen size={48} style={{ margin: '0 auto 16px' }} />
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
          color: '#1e1e1e60',
          fontFamily: 'Inter, sans-serif',
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
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={`bg-dark-bronze rounded-2xl shadow-2xl border-4 border-brass/30 relative ${
            isFullscreen ? 'w-full h-full' : 'max-w-6xl w-full max-h-[90vh]'
          }`}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-brass/30">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-6 w-6 text-brass" />
              <h2 className="text-xl font-cinzel font-bold text-porcelain">
                {project.title} - Preview
              </h2>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleFullscreen}
                className="p-2 text-porcelain hover:text-brass transition-colors rounded-lg hover:bg-brass/10"
                title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 text-porcelain hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Flipbook Container */}
          <div className="flex-1 p-6 flex items-center justify-center">
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
              </div>
            ) : (
              <div className="text-center py-16">
                <BookOpen className="h-16 w-16 text-brass/40 mx-auto mb-4" />
                <h3 className="text-xl font-cinzel font-bold text-porcelain/60 mb-2">
                  No pages to preview
                </h3>
                <p className="text-porcelain/40 font-inter">
                  Add some pages to your book to see the flipbook preview
                </p>
              </div>
            )}
          </div>

          {/* Controls */}
          {project.pages && project.pages.length > 0 && (
            <div className="flex items-center justify-between p-6 border-t border-brass/30">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="flex items-center space-x-2 px-4 py-2 bg-brass-gradient text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-brass-glow transition-all duration-300"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-4 text-porcelain font-inter">
                <span>Page {currentPage + 1} of {totalPages}</span>
                <div className="w-32 bg-brass/20 rounded-full h-2">
                  <div
                    className="bg-brass-gradient h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
                  />
                </div>
              </div>

              <button
                onClick={nextPage}
                disabled={currentPage >= totalPages - 1}
                className="flex items-center space-x-2 px-4 py-2 bg-brass-gradient text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-brass-glow transition-all duration-300"
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FlipbookPreviewModal;