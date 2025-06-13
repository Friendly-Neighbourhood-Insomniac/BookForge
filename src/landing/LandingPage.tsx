import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Cog, Settings, Sparkles, ArrowRight, Play, Users, Zap } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-bronze overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/src/components/ClockEdUI/UI/Hero background.webm" type="video/webm" />
          {/* Fallback gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-bronze via-brass-dark to-dark-bronze"></div>
        </video>
        
        {/* Video Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bronze/40 via-transparent to-dark-bronze/60 z-10"></div>
        
        {/* Hero Content */}
        <div className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Logo */}
          <div className="mb-8 animate-float">
            <div className="inline-flex items-center justify-center w-[250px] h-[250px] bg-cracked-porcelain rounded-full shadow-porcelain border-4 border-brass/30 relative overflow-hidden p-4">
              <div className="absolute inset-0 bg-cracked-porcelain"></div>
              <img 
                src="/src/components/ClockEdUI/UI/ClockEd-In-BookForge-Logo.png" 
                alt="ClockEd-In BookForge Logo" 
                className="w-full h-full object-contain relative z-10"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/10 to-transparent rounded-full"></div>
            </div>
          </div>
          
          {/* Main Content Panel */}
          <div className="bg-cracked-porcelain/95 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-porcelain border-2 border-brass/20 relative overflow-hidden">
            {/* Subtle crack effects */}
            <div className="absolute inset-0 bg-cracked-porcelain opacity-50"></div>
            <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-neon-cyan/30 via-transparent to-neon-cyan/30"></div>
            <div className="absolute top-1/3 right-1/4 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/20 to-transparent"></div>
            
            <div className="relative z-10">
              {/* Logo Text */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-bold text-dark-bronze mb-6 leading-tight">
                ClockEd-In
                <span className="block bg-cyan bg-clip-text text-cyan">
                  BookForge
                </span>
              </h1>
              
              {/* Tagline */}
              <p className="text-xl md:text-2xl text-dark-bronze/80 mb-4 font-inter font-medium">
                Create books and workbooks like never before.
              </p>
              
              {/* Subtext */}
              <p className="text-lg md:text-xl bg-cyan-brass-gradient bg-clip-text text-transparent font-semibold mb-10 font-inter">
                Gamified • Interactive • Revolutionary
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/register"
                  className="group relative px-8 py-4 bg-brass-gradient text-white font-bold text-lg rounded-2xl shadow-brass hover:shadow-cyan-glow transition-all duration-300 transform hover:-translate-y-1 border-2 border-brass-light/50 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center space-x-2">
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="absolute inset-0 rounded-2xl border-2 border-neon-cyan/0 group-hover:border-neon-cyan/50 transition-colors duration-300"></div>
                </Link>
                
                <Link
                  to="/login"
                  className="group px-8 py-4 bg-porcelain-gradient text-dark-bronze font-semibold text-lg rounded-2xl shadow-porcelain hover:shadow-brass-glow transition-all duration-300 transform hover:-translate-y-1 border-2 border-brass/30 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brass/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative">Already a member?</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE GRID SECTION */}
      <section className="py-24 bg-gradient-to-b from-dark-bronze to-brass-dark/20 relative">
        {/* Gear Divider */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-brass-gradient"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-brass-gradient rounded-full flex items-center justify-center shadow-brass-glow">
            <Cog className="h-6 w-6 text-white animate-spin-slow" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <div className="inline-block bg-brass-gradient px-8 py-3 rounded-full mb-6 shadow-brass-glow">
              <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-white">
                What You Can Create
              </h2>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Textbooks Card */}
            <div className="group relative bg-cracked-porcelain rounded-3xl p-8 shadow-porcelain border-4 border-brass/30 hover:border-brass/60 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <Cog className="h-8 w-8 text-brass animate-spin-slow" />
              </div>
              
              <div className="relative z-10 flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-brass-gradient rounded-2xl flex items-center justify-center shadow-brass">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-cinzel font-bold text-dark-bronze mb-3">Textbooks</h3>
                  <p className="text-dark-bronze/70 font-inter leading-relaxed">
                    Design structured and modular digital books with professional layouts and interactive elements.
                  </p>
                </div>
              </div>
            </div>

            {/* Gamification Card */}
            <div className="group relative bg-cracked-porcelain rounded-3xl p-8 shadow-porcelain border-4 border-brass/30 hover:border-neon-cyan/60 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <Settings className="h-8 w-8 text-neon-cyan animate-spin-slow" style={{ animationDirection: 'reverse' }} />
              </div>
              
              <div className="relative z-10 flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-neon-cyan to-brass rounded-2xl flex items-center justify-center shadow-cyan-glow">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-cinzel font-bold text-dark-bronze mb-3">Gamification</h3>
                  <p className="text-dark-bronze/70 font-inter leading-relaxed">
                    Embed quizzes, videos, and interactive learning paths to engage students like never before.
                  </p>
                </div>
              </div>
            </div>

            {/* Storybooks Card - Coming Soon */}
            <div className="group relative bg-cracked-porcelain rounded-3xl p-8 shadow-porcelain border-4 border-brass/30 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent opacity-50"></div>
              <div className="absolute top-4 right-4 opacity-20">
                <Cog className="h-8 w-8 text-brass animate-spin-slow" />
              </div>
              
              {/* Coming Soon Banner - Fixed positioning */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-neon-cyan to-brass px-4 py-1 rounded-full shadow-cyan-glow z-20">
                <span className="text-white font-bold text-xs flex items-center space-x-1">
                  <Sparkles className="h-3 w-3" />
                  <span>Coming Soon</span>
                </span>
              </div>
              
              <div className="relative z-10 flex items-start space-x-4">
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-brass to-neon-cyan rounded-2xl flex items-center justify-center shadow-brass opacity-75">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-cinzel font-bold text-dark-bronze mb-3 opacity-75">Storybooks</h3>
                  <p className="text-dark-bronze/60 font-inter leading-relaxed">
                    Narrative-driven books with embedded animations and interactive storytelling elements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="py-24 bg-gradient-to-b from-brass-dark/20 to-dark-bronze relative">
        {/* Top Gear Divider */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-brass-gradient"></div>
        <div className="absolute top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-brass-gradient rounded-full flex items-center justify-center">
            <Cog className="h-4 w-4 text-white animate-spin-slow" />
          </div>
        </div>
        <div className="absolute top-0 right-1/4 transform translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-brass-gradient rounded-full flex items-center justify-center">
            <Settings className="h-4 w-4 text-white animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <div className="relative inline-block">
              <div className="bg-brass-gradient px-12 py-4 rounded-full shadow-brass-glow relative">
                <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-white">How It Works</h2>
                <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
                  <Cog className="h-6 w-6 text-brass-light animate-spin-slow" />
                </div>
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2">
                  <Settings className="h-6 w-6 text-brass-light animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 items-center">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-cracked-porcelain rounded-3xl p-8 shadow-porcelain border-4 border-brass/40 relative overflow-hidden group hover:shadow-brass-glow transition-all duration-300">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Cog className="absolute top-4 right-4 h-12 w-12 text-brass animate-spin-slow" />
                  <Settings className="absolute bottom-4 left-4 h-8 w-8 text-neon-cyan animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-brass-gradient rounded-full flex items-center justify-center mx-auto mb-6 shadow-brass-glow">
                    <span className="text-2xl font-cinzel font-bold text-white">1</span>
                  </div>
                  <h3 className="text-xl font-cinzel font-bold text-dark-bronze mb-4">🛠️ Sign Up</h3>
                  <p className="text-dark-bronze/70 font-inter">Create your account and access the BookForge platform</p>
                </div>
              </div>
              
              {/* Connector */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-1 bg-brass-gradient transform -translate-y-1/2 z-10"></div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-cracked-porcelain rounded-3xl p-8 shadow-porcelain border-4 border-brass/40 relative overflow-hidden group hover:shadow-brass-glow transition-all duration-300">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Settings className="absolute top-4 right-4 h-12 w-12 text-neon-cyan animate-spin-slow" />
                  <Cog className="absolute bottom-4 left-4 h-8 w-8 text-brass animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-neon-cyan to-brass rounded-full flex items-center justify-center mx-auto mb-6 shadow-cyan-glow">
                    <span className="text-2xl font-cinzel font-bold text-white">2</span>
                  </div>
                  <h3 className="text-xl font-cinzel font-bold text-dark-bronze mb-4">📘 Choose Your Book Type</h3>
                  <p className="text-dark-bronze/70 font-inter">Select from textbooks, workbooks, or storybooks</p>
                </div>
              </div>
              
              {/* Connector */}
              <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-1 bg-brass-gradient transform -translate-y-1/2 z-10"></div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-cracked-porcelain rounded-3xl p-8 shadow-porcelain border-4 border-brass/40 relative overflow-hidden group hover:shadow-brass-glow transition-all duration-300">
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Cog className="absolute top-4 right-4 h-12 w-12 text-brass animate-spin-slow" />
                  <Settings className="absolute bottom-4 left-4 h-8 w-8 text-neon-cyan animate-spin-slow" style={{ animationDirection: 'reverse' }} />
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-brass to-neon-cyan rounded-full flex items-center justify-center mx-auto mb-6 shadow-brass-glow">
                    <span className="text-2xl font-cinzel font-bold text-white">3</span>
                  </div>
                  <h3 className="text-xl font-cinzel font-bold text-dark-bronze mb-4">✨ Customize + Export</h3>
                  <p className="text-dark-bronze/70 font-inter">Design your content and export as flipbook or PDF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Gear Divider */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-brass-gradient"></div>
        <div className="absolute bottom-0 left-1/3 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-8 h-8 bg-brass-gradient rounded-full flex items-center justify-center">
            <Cog className="h-4 w-4 text-white animate-spin-slow" />
          </div>
        </div>
        <div className="absolute bottom-0 right-1/3 transform translate-x-1/2 translate-y-1/2">
          <div className="w-8 h-8 bg-brass-gradient rounded-full flex items-center justify-center">
            <Settings className="h-4 w-4 text-white animate-spin-slow" style={{ animationDirection: 'reverse' }} />
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-24 bg-gradient-to-br from-brass-dark via-brass to-brass-light relative overflow-hidden">
        {/* Floating Gears */}
        <div className="absolute top-10 left-10 opacity-20">
          <Cog className="h-24 w-24 text-neon-cyan animate-spin-slow" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <Settings className="h-32 w-32 text-porcelain animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-10">
          <Cog className="h-16 w-16 text-neon-cyan animate-spin-slow" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-white mb-8 leading-tight">
            Start building your own
            <span className="block bg-gradient-to-r from-neon-cyan to-porcelain bg-clip-text text-transparent">
              educational universe.
            </span>
          </h2>
          
          <div className="mt-12">
            <Link
              to="/register"
              className="group inline-flex items-center space-x-3 bg-porcelain-gradient hover:bg-cracked-porcelain text-dark-bronze px-10 py-5 rounded-2xl text-xl font-bold transition-all duration-300 shadow-porcelain hover:shadow-cyan-glow transform hover:-translate-y-1 border-2 border-neon-cyan/30 hover:border-neon-cyan/60"
            >
              <span>Get Started</span>
              <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-dark-bronze relative">
        {/* Cyan Glow Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent shadow-cyan-glow"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="relative">
                <Cog className="h-8 w-8 text-brass animate-spin-slow" />
                <div className="absolute inset-0 h-8 w-8 bg-brass/30 rounded-full blur-sm"></div>
              </div>
              <span className="text-2xl font-cinzel font-bold text-porcelain">ClockEd-In BookForge</span>
            </div>
            
            {/* Links */}
            <div className="flex justify-center space-x-8 mb-8">
              <button className="text-porcelain/70 hover:text-porcelain transition-colors font-inter">
                About
              </button>
              <button className="text-porcelain/70 hover:text-porcelain transition-colors font-inter">
                Privacy
              </button>
              <button className="text-porcelain/70 hover:text-porcelain transition-colors font-inter">
                Contact
              </button>
            </div>
            
            {/* Copyright */}
            <div className="border-t border-brass/30 pt-8">
              <p className="text-porcelain/60 font-inter flex items-center justify-center space-x-2">
                <span>© 2025 ClockEd-In. All rights reserved.</span>
                <Settings className="h-4 w-4 text-brass animate-spin-slow ml-2" />
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;