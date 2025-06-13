import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Cog, 
  Settings, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon,
  FileText,
  Calculator,
  Atom,
  Globe,
  Palette,
  CheckCircle,
  Sparkles,
  AlertCircle,
  Users
} from 'lucide-react';
import { supabase } from '../utils/supabase';
import { Session } from '@supabase/supabase-js';
import PorcelainPanel from '../components/ClockEdUI/PorcelainPanel';

const NewProjectFlow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProjectType, setSelectedProjectType] = useState<'textbook' | 'workbook' | null>(null);
  const [bookTitle, setBookTitle] = useState('');
  const [selectedCover, setSelectedCover] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const totalSteps = 4;

  // Get session and set up auth listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = useMemo(() => {
    switch (currentStep) {
      case 1:
        return selectedProjectType !== null && bookTitle.trim().length > 0;
      case 2:
        return selectedCover !== null;
      case 3:
        return selectedTemplate !== null;
      default:
        return true;
    }
  }, [currentStep, selectedProjectType, bookTitle, selectedCover, selectedTemplate]);

  const handleProjectTypeSelect = (type: 'textbook' | 'workbook') => {
    setSelectedProjectType(type);
    setError(''); // Clear any existing errors
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitle(e.target.value);
    setError(''); // Clear any existing errors
  };

  const handleFinish = async () => {
    setLoading(true);
    setError('');

    try {
      // Validation
      if (!session?.user) {
        setError('You must be logged in to create a project');
        return;
      }

      if (!selectedProjectType) {
        setError('Please select a project type');
        return;
      }

      if (!bookTitle.trim()) {
        setError('Please enter a book title');
        return;
      }

      // Create project in Supabase
      const { data, error: supabaseError } = await supabase
        .from('projects')
        .insert([
          {
            title: bookTitle.trim(),
            project_type: selectedProjectType,
            user_id: session.user.id,
            cover_type: selectedCover,
            template_type: selectedTemplate,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ])
        .select()
        .single();

      if (supabaseError) {
        console.error('Supabase error:', supabaseError);
        setError(`Failed to create project: ${supabaseError.message}`);
        return;
      }

      if (data) {
        // Successfully created, navigate to editor
        navigate(`/editor/${data.id}`);
      } else {
        setError('Failed to create project: No data returned');
      }
    } catch (err) {
      console.error('Error creating project:', err);
      setError('An unexpected error occurred while creating the project');
    } finally {
      setLoading(false);
    }
  };

  const stepVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const stepTransition = {
    x: { type: "spring", stiffness: 300, damping: 30 },
    opacity: { duration: 0.2 }
  };

  return (
    <div className="min-h-screen bg-dark-bronze">
      {/* Header */}
      <header className="bg-cracked-porcelain/95 backdrop-blur-md shadow-porcelain border-b-2 border-brass/30 relative">
        <div className="absolute inset-0 bg-cracked-porcelain opacity-50"></div>
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-neon-cyan/20 via-transparent to-neon-cyan/20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="flex items-center space-x-3 text-dark-bronze hover:text-brass transition-colors">
                <ArrowLeft className="h-5 w-5" />
                <span className="font-inter font-medium">Back to Dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Cog className="h-8 w-8 text-brass animate-spin-slow" />
                <div className="absolute inset-0 h-8 w-8 bg-brass/20 rounded-full blur-sm"></div>
              </div>
              <span className="text-2xl font-cinzel font-bold text-dark-bronze">New Project</span>
            </div>
            
            <div className="w-32"></div> {/* Spacer for centering */}
          </div>
        </div>
      </header>

      {/* Step Tracker */}
      <div className="bg-brass-gradient py-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brass/20 via-transparent to-brass/20"></div>
        <div className="absolute top-2 left-10 opacity-20">
          <Settings className="h-8 w-8 text-neon-cyan animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        </div>
        <div className="absolute bottom-2 right-10 opacity-20">
          <Cog className="h-6 w-6 text-porcelain animate-spin-slow" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step, index) => (
              <div key={step} className="flex items-center">
                <motion.div
                  className={`relative flex items-center justify-center w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                    step <= currentStep
                      ? 'bg-porcelain border-neon-cyan shadow-cyan-glow'
                      : 'bg-brass-dark border-porcelain/30'
                  }`}
                  animate={{
                    scale: step === currentStep ? 1.1 : 1,
                    rotate: step === currentStep ? 360 : 0
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {step < currentStep ? (
                    <CheckCircle className="h-6 w-6 text-neon-cyan" />
                  ) : (
                    <span className={`font-cinzel font-bold ${
                      step <= currentStep ? 'text-dark-bronze' : 'text-porcelain/60'
                    }`}>
                      {step}
                    </span>
                  )}
                  
                  {step === currentStep && (
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-neon-cyan"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </motion.div>
                
                {index < 3 && (
                  <div className={`w-16 md:w-24 h-1 mx-2 transition-all duration-300 ${
                    step < currentStep ? 'bg-neon-cyan shadow-cyan-glow' : 'bg-porcelain/30'
                  }`} />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-white font-inter font-medium">
              Step {currentStep} of {totalSteps}: {
                currentStep === 1 ? 'Select Project Type & Title' :
                currentStep === 2 ? 'Design Cover' :
                currentStep === 3 ? 'Choose Template' :
                'Enter Editor'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative h-[600px]">
          <AnimatePresence mode="wait" custom={currentStep}>
            <motion.div
              key={currentStep}
              custom={currentStep}
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={stepTransition}
              className="absolute inset-0"
            >
              {/* Step 1: Select Project Type & Enter Title */}
              {currentStep === 1 && (
                <div className="text-center">
                  <div className="mb-8">
                    <h2 className="text-4xl font-cinzel font-bold text-porcelain mb-4">
                      Create a New Book Project
                    </h2>
                    <p className="text-xl text-porcelain/80 font-inter">
                      Choose your book type and enter a title to get started
                    </p>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 max-w-2xl mx-auto"
                    >
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        <span className="text-red-700 text-sm">{error}</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Book Title Input */}
                  <div className="mb-8 max-w-2xl mx-auto">
                    <PorcelainPanel className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-cinzel font-bold text-dark-bronze mb-2">Book Title</h3>
                        <p className="text-dark-bronze/70 font-inter text-sm">Enter a title for your new book</p>
                      </div>
                      <input
                        type="text"
                        value={bookTitle}
                        onChange={handleTitleChange}
                        className="w-full px-4 py-3 border-2 border-brass/30 rounded-xl focus:ring-2 focus:ring-brass focus:border-brass transition-colors bg-white font-inter text-lg"
                        placeholder="Enter your book title..."
                        disabled={loading}
                      />
                    </PorcelainPanel>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Textbook Option */}
                    <motion.div
                      className={`group cursor-pointer transition-all duration-300 ${
                        selectedProjectType === 'textbook' ? 'transform -translate-y-2' : ''
                      }`}
                      onClick={() => handleProjectTypeSelect('textbook')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <PorcelainPanel className={`p-8 transition-all duration-300 ${
                        selectedProjectType === 'textbook' 
                          ? 'border-neon-cyan shadow-cyan-glow animate-glow-pulse' 
                          : 'hover:border-brass/60 hover:shadow-brass-glow'
                      }`}>
                        <div className="relative">
                          <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Cog className="h-12 w-12 text-brass animate-spin-slow" />
                          </div>
                          
                          <div className="flex flex-col items-center text-center">
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                              selectedProjectType === 'textbook'
                                ? 'bg-gradient-to-br from-neon-cyan to-brass shadow-cyan-glow'
                                : 'bg-brass-gradient shadow-brass'
                            }`}>
                              <BookOpen className="h-10 w-10 text-white" />
                            </div>
                            
                            <h3 className="text-2xl font-cinzel font-bold text-dark-bronze mb-4">
                              Textbook
                            </h3>
                            <p className="text-dark-bronze/70 font-inter leading-relaxed">
                              Ideal for theory-heavy learning material with structured chapters and comprehensive content.
                            </p>
                            
                            {selectedProjectType === 'textbook' && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 flex items-center space-x-2 text-neon-cyan font-semibold"
                              >
                                <CheckCircle className="h-5 w-5" />
                                <span>Selected</span>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </PorcelainPanel>
                    </motion.div>

                    {/* Workbook Option */}
                    <motion.div
                      className={`group cursor-pointer transition-all duration-300 ${
                        selectedProjectType === 'workbook' ? 'transform -translate-y-2' : ''
                      }`}
                      onClick={() => handleProjectTypeSelect('workbook')}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <PorcelainPanel className={`p-8 transition-all duration-300 ${
                        selectedProjectType === 'workbook' 
                          ? 'border-neon-cyan shadow-cyan-glow animate-glow-pulse' 
                          : 'hover:border-brass/60 hover:shadow-brass-glow'
                      }`}>
                        <div className="relative">
                          <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                            <Settings className="h-12 w-12 text-neon-cyan animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                          </div>
                          
                          <div className="flex flex-col items-center text-center">
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                              selectedProjectType === 'workbook'
                                ? 'bg-gradient-to-br from-neon-cyan to-brass shadow-cyan-glow'
                                : 'bg-gradient-to-br from-brass to-neon-cyan shadow-brass'
                            }`}>
                              <FileText className="h-10 w-10 text-white" />
                            </div>
                            
                            <h3 className="text-2xl font-cinzel font-bold text-dark-bronze mb-4">
                              Workbook
                            </h3>
                            <p className="text-dark-bronze/70 font-inter leading-relaxed">
                              Great for interactive practice pages with exercises, worksheets, and hands-on activities.
                            </p>
                            
                            {selectedProjectType === 'workbook' && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 flex items-center space-x-2 text-neon-cyan font-semibold"
                              >
                                <CheckCircle className="h-5 w-5" />
                                <span>Selected</span>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </PorcelainPanel>
                    </motion.div>

                    {/* Storybook Option - Coming Soon */}
                    <motion.div className="group cursor-not-allowed opacity-50">
                      <PorcelainPanel className="p-8 transition-all duration-300 relative">
                        <div className="relative">
                          <div className="absolute top-4 right-4 opacity-20">
                            <Cog className="h-12 w-12 text-brass animate-spin-slow" />
                          </div>
                          
                          {/* Coming Soon Banner */}
                          <div className="absolute top-2 right-2 bg-gradient-to-r from-neon-cyan to-brass px-3 py-1 rounded-full shadow-cyan-glow z-20">
                            <span className="text-white font-bold text-xs flex items-center space-x-1">
                              <Sparkles className="h-3 w-3" />
                              <span>Coming Soon</span>
                            </span>
                          </div>
                          
                          <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br from-brass to-neon-cyan shadow-brass opacity-75">
                              <Users className="h-10 w-10 text-white" />
                            </div>
                            
                            <h3 className="text-2xl font-cinzel font-bold text-dark-bronze mb-4 opacity-75">
                              Storybook
                            </h3>
                            <p className="text-dark-bronze/60 font-inter leading-relaxed">
                              Narrative-driven books with embedded animations and interactive storytelling elements.
                            </p>
                          </div>
                        </div>
                      </PorcelainPanel>
                    </motion.div>
                  </div>

                  {/* Validation Status */}
                  <div className="mt-8 max-w-2xl mx-auto">
                    <div className="flex items-center justify-center space-x-6 text-sm font-inter">
                      <div className={`flex items-center space-x-2 ${
                        selectedProjectType ? 'text-neon-cyan' : 'text-porcelain/50'
                      }`}>
                        {selectedProjectType ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <div className="h-4 w-4 border-2 border-current rounded-full"></div>
                        )}
                        <span>Project Type Selected</span>
                      </div>
                      <div className={`flex items-center space-x-2 ${
                        bookTitle.trim() ? 'text-neon-cyan' : 'text-porcelain/50'
                      }`}>
                        {bookTitle.trim() ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          <div className="h-4 w-4 border-2 border-current rounded-full"></div>
                        )}
                        <span>Book Title Entered</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Cover Design */}
              {currentStep === 2 && (
                <div className="text-center">
                  <div className="mb-8">
                    <h2 className="text-4xl font-cinzel font-bold text-porcelain mb-4">
                      Design Your Cover
                    </h2>
                    <p className="text-xl text-porcelain/80 font-inter">
                      Choose a cover design or upload your own
                    </p>
                  </div>

                  <PorcelainPanel className="p-8 max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Upload Option */}
                      <motion.div
                        className={`group cursor-pointer border-4 border-dashed rounded-2xl p-8 transition-all duration-300 ${
                          selectedCover === 'upload'
                            ? 'border-neon-cyan bg-neon-cyan/10 shadow-cyan-glow'
                            : 'border-brass/40 hover:border-brass/60 hover:bg-brass/5'
                        }`}
                        onClick={() => setSelectedCover('upload')}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex flex-col items-center">
                          <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 ${
                            selectedCover === 'upload'
                              ? 'bg-gradient-to-br from-neon-cyan to-brass shadow-cyan-glow'
                              : 'bg-brass-gradient shadow-brass'
                          }`}>
                            <Upload className="h-8 w-8 text-white" />
                          </div>
                          <h3 className="text-xl font-cinzel font-bold text-dark-bronze mb-2">
                            Upload Custom Cover
                          </h3>
                          <p className="text-dark-bronze/70 font-inter text-sm">
                            Upload your own cover image or design
                          </p>
                        </div>
                      </motion.div>

                      {/* Preset Options */}
                      <div className="space-y-4">
                        <h3 className="text-xl font-cinzel font-bold text-dark-bronze mb-4">
                          Subject-Based Presets
                        </h3>
                        
                        {['Mathematics', 'Science', 'Literature', 'History'].map((subject, index) => (
                          <motion.div
                            key={subject}
                            className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
                              selectedCover === subject.toLowerCase()
                                ? 'border-neon-cyan bg-neon-cyan/10 shadow-cyan-glow'
                                : 'border-brass/30 hover:border-brass/60 hover:bg-brass/5'
                            }`}
                            onClick={() => setSelectedCover(subject.toLowerCase())}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                selectedCover === subject.toLowerCase()
                                  ? 'bg-gradient-to-br from-neon-cyan to-brass'
                                  : 'bg-brass-gradient'
                              }`}>
                                {subject === 'Mathematics' && <Calculator className="h-5 w-5 text-white" />}
                                {subject === 'Science' && <Atom className="h-5 w-5 text-white" />}
                                {subject === 'Literature' && <BookOpen className="h-5 w-5 text-white" />}
                                {subject === 'History' && <Globe className="h-5 w-5 text-white" />}
                              </div>
                              <span className="font-inter font-medium text-dark-bronze">
                                {subject} Template
                              </span>
                              {selectedCover === subject.toLowerCase() && (
                                <CheckCircle className="h-5 w-5 text-neon-cyan ml-auto" />
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </PorcelainPanel>
                </div>
              )}

              {/* Step 3: Choose Template */}
              {currentStep === 3 && (
                <div className="text-center">
                  <div className="mb-8">
                    <h2 className="text-4xl font-cinzel font-bold text-porcelain mb-4">
                      Choose Page Template
                    </h2>
                    <p className="text-xl text-porcelain/80 font-inter">
                      Select a layout that fits your content style
                    </p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {[
                      { id: 'classic', name: 'Classic Layout', icon: BookOpen, desc: 'Traditional textbook layout with headers and body text' },
                      { id: 'modern', name: 'Modern Layout', icon: Palette, desc: 'Contemporary design with visual elements and sidebars' },
                      { id: 'interactive', name: 'Interactive Layout', icon: Sparkles, desc: 'Gamified layout with embedded activities and media' }
                    ].map((template) => (
                      <motion.div
                        key={template.id}
                        className={`group cursor-pointer transition-all duration-300 ${
                          selectedTemplate === template.id ? 'transform -translate-y-2' : ''
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <PorcelainPanel className={`p-6 transition-all duration-300 ${
                          selectedTemplate === template.id 
                            ? 'border-neon-cyan shadow-cyan-glow animate-glow-pulse' 
                            : 'hover:border-brass/60 hover:shadow-brass-glow'
                        }`}>
                          <div className="relative">
                            <div className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity">
                              <Cog className="h-8 w-8 text-brass animate-spin-slow" />
                            </div>
                            
                            {/* Template Preview */}
                            <div className="bg-porcelain border-2 border-brass/20 rounded-xl p-4 mb-4 h-32 flex items-center justify-center">
                              <template.icon className={`h-12 w-12 transition-all duration-300 ${
                                selectedTemplate === template.id ? 'text-neon-cyan' : 'text-brass'
                              }`} />
                            </div>
                            
                            <h3 className="text-lg font-cinzel font-bold text-dark-bronze mb-2">
                              {template.name}
                            </h3>
                            <p className="text-dark-bronze/70 font-inter text-sm leading-relaxed">
                              {template.desc}
                            </p>
                            
                            {selectedTemplate === template.id && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-3 flex items-center justify-center space-x-2 text-neon-cyan font-semibold"
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span className="text-sm">Selected</span>
                              </motion.div>
                            )}
                          </div>
                        </PorcelainPanel>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Ready to Create */}
              {currentStep === 4 && (
                <div className="text-center">
                  <PorcelainPanel className="p-12 max-w-2xl mx-auto">
                    <div className="relative">
                      <div className="absolute top-6 right-6 opacity-20">
                        <Cog className="h-16 w-16 text-brass animate-spin-slow" />
                      </div>
                      <div className="absolute bottom-6 left-6 opacity-20">
                        <Settings className="h-12 w-12 text-neon-cyan animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                      </div>
                      
                      <div className="relative z-10">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="mb-8"
                        >
                          <div className="inline-flex items-center justify-center w-24 h-24 bg-brass-gradient rounded-full shadow-brass-glow border-4 border-brass-light/30 relative">
                            <Sparkles className="h-12 w-12 text-white" />
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/20 to-transparent rounded-full"></div>
                          </div>
                        </motion.div>
                        
                        <h2 className="text-3xl font-cinzel font-bold text-dark-bronze mb-4">
                          Ready to Create!
                        </h2>
                        <p className="text-dark-bronze/70 font-inter text-lg mb-8 leading-relaxed">
                          Your {selectedProjectType} project is configured and ready. 
                          <span className="block mt-2 text-brass font-semibold">
                            Let's start building something amazing!
                          </span>
                        </p>
                        
                        <div className="bg-brass/10 rounded-xl p-4 mb-8 border border-brass/20">
                          <h3 className="font-cinzel font-bold text-dark-bronze mb-2">Project Summary:</h3>
                          <div className="space-y-1 text-sm font-inter text-dark-bronze/70">
                            <p>Title: <span className="font-semibold">{bookTitle}</span></p>
                            <p>Type: <span className="font-semibold capitalize">{selectedProjectType}</span></p>
                            <p>Cover: <span className="font-semibold capitalize">{selectedCover}</span></p>
                            <p>Template: <span className="font-semibold capitalize">{selectedTemplate}</span></p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PorcelainPanel>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-12">
          <motion.button
            onClick={prevStep}
            disabled={currentStep === 1 || loading}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-inter font-medium transition-all duration-300 ${
              currentStep === 1 || loading
                ? 'bg-porcelain/20 text-porcelain/40 cursor-not-allowed'
                : 'bg-porcelain-gradient text-dark-bronze hover:shadow-brass-glow transform hover:-translate-y-1'
            }`}
            whileHover={currentStep > 1 && !loading ? { scale: 1.05 } : {}}
            whileTap={currentStep > 1 && !loading ? { scale: 0.95 } : {}}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </motion.button>

          <div className="flex items-center space-x-2 text-porcelain/60 font-inter text-sm">
            <span>{currentStep} of {totalSteps}</span>
          </div>

          {currentStep < totalSteps ? (
            <motion.button
              onClick={nextStep}
              disabled={!isStepValid || loading}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-inter font-bold transition-all duration-300 ${
                isStepValid && !loading
                  ? 'bg-brass-gradient text-white hover:shadow-cyan-glow transform hover:-translate-y-1 border-2 border-brass-light/50'
                  : 'bg-brass/30 text-porcelain/40 cursor-not-allowed'
              }`}
              whileHover={isStepValid && !loading ? { scale: 1.05 } : {}}
              whileTap={isStepValid && !loading ? { scale: 0.95 } : {}}
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          ) : (
            <motion.button
              onClick={handleFinish}
              disabled={loading}
              className={`group flex items-center space-x-2 px-8 py-3 rounded-xl font-inter font-bold transition-all duration-300 shadow-brass transform border-2 border-brass-light/50 relative overflow-hidden ${
                loading
                  ? 'bg-brass/50 text-porcelain/60 cursor-not-allowed'
                  : 'bg-brass-gradient hover:shadow-cyan-glow text-white hover:-translate-y-1'
              }`}
              whileHover={!loading ? { scale: 1.05 } : {}}
              whileTap={!loading ? { scale: 0.95 } : {}}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">
                {loading ? 'Creating Project...' : 'Enter Editor'}
              </span>
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="relative z-10"
                >
                  <Cog className="h-4 w-4" />
                </motion.div>
              ) : (
                <Sparkles className="h-4 w-4 relative z-10 group-hover:animate-pulse" />
              )}
            </motion.button>
          )}
        </div>
      </main>
    </div>
  );
};

export default NewProjectFlow;