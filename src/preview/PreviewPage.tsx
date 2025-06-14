import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BookOpen, ArrowLeft, ChevronLeft, ChevronRight, Share2, Download, Cog, Settings } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';
import { supabase } from '../utils/supabase';
import { GlobalBackground, FrostedGlassPanel, CrystalButton } from '../components/ClockEdUI';

const PreviewPage: React.FC = () => {
  const { bookId } = useParams();
  const { setProject, project } = useEditorStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const loadProject = async () => {
      if (!bookId) {
        setError('No book ID provided');
        setLoading(false);
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          setError('You must be logged in to preview this project');
          return;
        }

        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', bookId)
          .eq('user_id', session.user.id)
          .single();

        if (error) {
          setError('Project not found or you do not have permission to view it');
          return;
        }

        if (data) {
          const editorProject = {
            id: data.id,
            title: data.title,
            project_type: data.project_type,
            author: data.author || '',
            description: data.description || '',
            cover_type: data.cover_type || '',
            template_type: data.template_type || '',
            cover_url: data.cover_url || '',
            pages: data.pages && Array.isArray(data.pages) && data.pages.length > 0 
              ? data.pages 
              : [{ id: 'page_1', title: 'Page 1', components: [] }]
          };
          
          setProject(editorProject);
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [bookId, setProject]);

  const nextPage = () => {
    if (project && currentPage < project.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderComponent = (component: any) => {
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
            {component.props.content || 'Text component'}
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
              borderRadius: '8px',
              border: '1px solid rgba(0, 234, 255, 0.3)',
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

  if (loading) {
    return (
      <div className="min-h-screen bg-porcelain relative overflow-hidden">
        <GlobalBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <FrostedGlassPanel className="p-8" glowColor="cyan" hasGearCorner>
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brass mx-auto mb-4"></div>
              <p className="text-dark-bronze font-inter">Loading preview...</p>
            </div>
          </FrostedGlassPanel>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-porcelain relative overflow-hidden">
        <GlobalBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <FrostedGlassPanel className="p-8 text-center" glowColor="aurora">
            <div className="bg-red-500 rounded-full p-4 mb-4 inline-block">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-dark-bronze mb-2">Error Loading Preview</h2>
            <p className="text-dark-bronze/80 mb-4">{error}</p>
            <Link to="/dashboard">
              <CrystalButton variant="primary" size="md" icon={ArrowLeft}>
                Back to Dashboard
              </CrystalButton>
            </Link>
          </FrostedGlassPanel>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-porcelain relative overflow-hidden">
        <GlobalBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <FrostedGlassPanel className="p-8 text-center" glowColor="aurora">
            <p className="text-dark-bronze font-inter">No project found</p>
          </FrostedGlassPanel>
        </div>
      </div>
    );
  }

  const currentPageData = project.pages[currentPage];

  return (
    <div className="min-h-screen bg-porcelain relative overflow-hidden">
      <GlobalBackground />
      
      {/* Header */}
      <header className="relative z-30 border-b border-glass-white/20">
        <FrostedGlassPanel className="rounded-none border-0 border-b border-neon-cyan/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-4">
                <Link to="/dashboard">
                  <CrystalButton variant="ghost" size="sm" icon={ArrowLeft}>
                    <span className="hidden sm:inline">Dashboard</span>
                  </CrystalButton>
                </Link>
                
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Cog className="h-6 w-6 text-brass animate-spin-slow" />
                    <div className="absolute inset-0 h-6 w-6 bg-brass/20 rounded-full blur-sm"></div>
                  </div>
                  <span className="text-lg font-cinzel font-bold text-dark-bronze">
                    {project.title} - Preview
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <CrystalButton variant="ghost" size="sm" icon={Share2} />
                <CrystalButton variant="ghost" size="sm" icon={Download} />
              </div>
            </div>
          </div>
        </FrostedGlassPanel>
      </header>

      {/* Preview Area */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="max-w-4xl w-full">
          {/* Book Preview */}
          <FrostedGlassPanel 
            className="p-8 aspect-[8.5/11] mb-8 relative overflow-hidden" 
            glowColor="brass" 
            borderStyle="crystal"
            hasGearCorner
          >
            {/* Floating background gears */}
            <div className="absolute top-4 right-4 opacity-10">
              <Settings className="h-16 w-16 text-neon-cyan animate-reverse-spin" />
            </div>
            
            {currentPageData ? (
              <div className="relative h-full">
                {/* Page Title */}
                <FrostedGlassPanel className="mb-6 px-4 py-2" glowColor="brass" borderStyle="embossed">
                  <h2 className="text-xl font-cinzel font-bold text-dark-bronze flex items-center space-x-2">
                    <BookOpen className="h-5 w-5 text-brass" />
                    <span>{currentPageData.title}</span>
                  </h2>
                </FrostedGlassPanel>

                {/* Page Content */}
                <div className="relative h-[calc(100%-80px)] bg-frost-texture rounded-lg border border-glass-white/20 overflow-hidden">
                  {currentPageData.components.length > 0 ? (
                    currentPageData.components.map((component) => renderComponent(component))
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <FrostedGlassPanel className="p-8 text-center" glowColor="aurora">
                        <div className="w-16 h-16 bg-brass/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <BookOpen className="h-8 w-8 text-brass/60" />
                        </div>
                        <p className="text-dark-bronze/60 font-inter">
                          This page is empty
                        </p>
                      </FrostedGlassPanel>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <FrostedGlassPanel className="p-8 text-center" glowColor="aurora">
                  <BookOpen className="h-16 w-16 text-brass/60 mx-auto mb-4" />
                  <h3 className="text-2xl font-cinzel font-bold text-dark-bronze/60 mb-4">
                    No Content
                  </h3>
                  <p className="text-dark-bronze/60 font-inter">
                    This book doesn't have any pages yet
                  </p>
                </FrostedGlassPanel>
              </div>
            )}
          </FrostedGlassPanel>

          {/* Navigation Controls */}
          {project.pages.length > 1 && (
            <div className="flex items-center justify-center space-x-4">
              <CrystalButton
                onClick={prevPage}
                disabled={currentPage === 0}
                variant="secondary"
                size="md"
                icon={ChevronLeft}
              />
              
              <FrostedGlassPanel className="px-6 py-3" borderStyle="crystal">
                <span className="text-dark-bronze font-inter font-medium">
                  Page {currentPage + 1} of {project.pages.length}
                </span>
                <div className="mt-2 w-32 bg-glass-white/30 rounded-full h-2 mx-auto">
                  <div
                    className="bg-gradient-to-r from-brass to-neon-cyan h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentPage + 1) / project.pages.length) * 100}%` }}
                  />
                </div>
              </FrostedGlassPanel>
              
              <CrystalButton
                onClick={nextPage}
                disabled={currentPage >= project.pages.length - 1}
                variant="secondary"
                size="md"
                icon={ChevronRight}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPage;