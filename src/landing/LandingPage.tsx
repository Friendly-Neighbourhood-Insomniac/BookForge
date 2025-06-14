import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Cog, Settings, Sparkles, ArrowRight, Play, Users, Zap, ChevronRight } from 'lucide-react';
import { GlobalBackground, FrostedGlassPanel, CrystalButton } from '../components/ClockEdUI';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-porcelain relative overflow-x-hidden">
      {/* Global Background Effects */}
      <GlobalBackground />
      
      {/* HERO SECTION - Keep existing background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video - UNCHANGED */}
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
        
        {/* Enhanced Video Overlay with Steam Effects - UNCHANGED */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bronze/40 via-transparent to-dark-bronze/60 z-10">
          <div className="absolute top-20 left-[10%] w-40 h-40 bg-white/5 rounded-full filter blur-xl animate-puff"></div>
          <div className="absolute bottom-10 right-[15%] w-32 h-32 bg-amber-300/10 rounded-full filter blur-xl animate-puff" style={{ animationDelay: '700ms' }}></div>
        </div>
        
        {/* Hero Content - Updated with new styling */}
        <div className="relative z-30 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
          {/* Interactive Logo with Rotating Gears - UNCHANGED */}
          <div className="mb-8 animate-float relative">
            <Cog className="absolute -top-4 -left-4 w-16 h-16 text-brass/80 animate-spin-slow" />
            <Cog className="absolute -bottom-2 -right-6 w-12 h-12 text-brass/60 animate-reverse-spin" />
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
          
          {/* Main Content Panel - Updated with FrostedGlassPanel */}
          <FrostedGlassPanel className="p-8 md:p-12" glowColor="cyan" hasGearCorner>
            {/* Logo Text */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-cinzel font-bold text-dark-bronze mb-6 leading-tight">
              ClockEd-In
              <span className="block bg-gradient-to-r from-neon-cyan to-neon-cyan-dark bg-clip-text text-transparent">
                BookForge
              </span>
            </h1>
            
            {/* Tagline */}
            <p className="text-xl md:text-2xl text-dark-bronze/80 mb-4 font-inter font-medium">
              Create books and workbooks like never before.
            </p>
            
            {/* Subtext */}
            <p className="text-lg md:text-xl bg-gradient-to-r from-neon-cyan to-brass bg-clip-text text-transparent font-semibold mb-10 font-inter">
              Gamified • Interactive • Revolutionary
            </p>
            
            {/* CTA Buttons - Updated with CrystalButton */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/register">
                <CrystalButton 
                  variant="primary" 
                  size="lg" 
                  icon={ArrowRight}
                  hasGearEffect
                  className="min-w-[200px]"
                >
                  Get Started
                </CrystalButton>
              </Link>
              
              <Link to="/login">
                <CrystalButton 
                  variant="secondary" 
                  size="lg"
                  className="min-w-[200px]"
                >
                  Already a member?
                </CrystalButton>
              </Link>
            </div>
          </FrostedGlassPanel>
        </div>
      </section>

      {/* FEATURE GRID SECTION - Updated with floating glowing cards */}
      <section className="py-24 relative z-10">
        {/* Crystal Gear Divider */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neon-cyan to-transparent shadow-cyan-glow"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-12 h-12 bg-brass-gradient rounded-full flex items-center justify-center shadow-brass-glow border-2 border-neon-cyan/30">
            <Cog className="h-6 w-6 text-white animate-spin-slow" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <FrostedGlassPanel className="inline-block px-8 py-4" glowColor="brass" borderStyle="crystal">
              <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-dark-bronze flex items-center space-x-3">
                <Sparkles className="h-8 w-8 text-neon-cyan animate-pulse" />
                <span>What You Can Create</span>
                <Sparkles className="h-8 w-8 text-neon-cyan animate-pulse" />
              </h2>
            </FrostedGlassPanel>
          </div>

          {/* Floating Feature Cards with Brass Bevels */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Textbooks Card */}
            <div className="group relative">
              <FrostedGlassPanel 
                className="p-8 transform hover:-translate-y-4 hover:scale-105 transition-all duration-500" 
                glowColor="brass" 
                borderStyle="embossed"
                hasGearCorner
              >
                {/* Floating Crystal Icon - Updated with transparent background and PNG */}
                <div className="absolute -top-6 left-8 w-16 h-16 rounded-2xl flex items-center justify-center shadow-brass-glow border-4 border-neon-cyan/20 group-hover:animate-gear-pulse overflow-hidden">
                  <img 
                    src="/src/components/ClockEdUI/Icons/TextBook_Icon.png" 
                    alt="Textbook Icon" 
                    className="w-24 h-24 object-contain"
                  />
                </div>
                
                <div className="pt-8">
                  <h3 className="text-2xl font-cinzel font-bold text-dark-bronze mb-4 flex items-center space-x-2">
                    <span>Textbooks</span>
                    <div className="w-2 h-2 bg-brass rounded-full animate-pulse"></div>
                  </h3>
                  <p className="text-dark-bronze/70 font-inter leading-relaxed">
                    Design structured and modular digital books with professional layouts and interactive elements.
                  </p>
                  
                  {/* Brass Bevel Bottom Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-brass-gradient rounded-b-3xl"></div>
                </div>
              </FrostedGlassPanel>
            </div>

            {/* Gamification Card */}
            <div className="group relative">
              <FrostedGlassPanel 
                className="p-8 transform hover:-translate-y-4 hover:scale-105 transition-all duration-500" 
                glowColor="cyan" 
                borderStyle="crystal"
                hasGearCorner
              >
                {/* Floating Crystal Icon */}
                <div className="absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br from-neon-cyan to-brass rounded-2xl flex items-center justify-center shadow-cyan-glow border-4 border-brass/20 group-hover:animate-gear-pulse">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                
                <div className="pt-8">
                  <h3 className="text-2xl font-cinzel font-bold text-dark-bronze mb-4 flex items-center space-x-2">
                    <span>Gamification</span>
                    <div className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse"></div>
                  </h3>
                  <p className="text-dark-bronze/70 font-inter leading-relaxed">
                    Embed quizzes, videos, and interactive learning paths to engage students like never before.
                  </p>
                  
                  {/* Crystal Bottom Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan to-brass rounded-b-3xl shadow-cyan-glow"></div>
                </div>
              </FrostedGlassPanel>
            </div>

            {/* Storybooks Card - Coming Soon */}
            <div className="group relative">
              <FrostedGlassPanel 
                className="p-8 opacity-80 hover:opacity-100 transition-all duration-500" 
                glowColor="aurora" 
                borderStyle="standard"
              >
                {/* Coming Soon Crystal Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-neon-cyan to-brass px-4 py-2 rounded-full shadow-cyan-glow border-2 border-frost-white/50 z-20">
                  <span className="text-white font-bold text-xs flex items-center space-x-1">
                    <Sparkles className="h-3 w-3" />
                    <span>Coming Soon</span>
                  </span>
                </div>
                
                {/* Floating Crystal Icon */}
                <div className="absolute -top-6 left-8 w-16 h-16 bg-gradient-to-br from-brass to-aurora-glow rounded-2xl flex items-center justify-center shadow-aurora border-4 border-glass-white/30 opacity-75">
                  <Users className="h-8 w-8 text-white" />
                </div>
                
                <div className="pt-8">
                  <h3 className="text-2xl font-cinzel font-bold text-dark-bronze/75 mb-4 flex items-center space-x-2">
                    <span>Storybooks</span>
                    <div className="w-2 h-2 bg-aurora-glow rounded-full animate-pulse"></div>
                  </h3>
                  <p className="text-dark-bronze/60 font-inter leading-relaxed">
                    Narrative-driven books with embedded animations and interactive storytelling elements.
                  </p>
                  
                  {/* Aurora Bottom Border */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-aurora-glow rounded-b-3xl opacity-50"></div>
                </div>
              </FrostedGlassPanel>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION - Animated Timeline with Crystal Pips */}
      <section className="py-24 relative z-10">
        {/* Crystal Gear Dividers */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brass to-transparent shadow-brass-glow"></div>
        <div className="absolute top-0 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-brass-gradient rounded-full flex items-center justify-center border border-neon-cyan/50">
            <Cog className="h-4 w-4 text-white animate-spin-slow" />
          </div>
        </div>
        <div className="absolute top-0 right-1/4 transform translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-brass-gradient rounded-full flex items-center justify-center border border-neon-cyan/50">
            <Settings className="h-4 w-4 text-white animate-reverse-spin" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="text-center mb-16">
            <FrostedGlassPanel className="inline-block px-12 py-6" glowColor="brass" borderStyle="embossed">
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-dark-bronze">How It Works</h2>
                <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
                  <Cog className="h-6 w-6 text-brass animate-spin-slow" />
                </div>
                <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                  <Settings className="h-6 w-6 text-brass animate-reverse-spin" />
                </div>
              </div>
            </FrostedGlassPanel>
          </div>

          {/* Crystal Timeline */}
          <div className="relative">
            {/* Central Timeline Track */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan via-brass to-neon-cyan transform -translate-y-1/2 shadow-cyan-glow"></div>
            
            {/* Crystal Connection Lines */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
              <div className="relative h-1">
                {/* Animated Energy Pulse */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-cyan to-transparent animate-pulse opacity-60"></div>
                
                {/* Crystal Checkpoint Markers */}
                <div className="absolute left-[16.66%] top-1/2 w-4 h-4 bg-neon-cyan rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-cyan-glow animate-pulse" style={{ animationDelay: '0s' }}></div>
                <div className="absolute left-[50%] top-1/2 w-4 h-4 bg-brass rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-brass-glow animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute left-[83.33%] top-1/2 w-4 h-4 bg-neon-cyan rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-cyan-glow animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>

            {/* Steps with Crystal Cards */}
            <div className="grid md:grid-cols-3 gap-8 items-center relative z-10">
              {/* Step 1 */}
              <div className="group relative">
                <FrostedGlassPanel 
                  className="p-8 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500" 
                  glowColor="cyan" 
                  borderStyle="crystal"
                  hasGearCorner
                >
                  {/* Crystal Step Number */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 bg-gradient-to-r from-neon-cyan to-neon-cyan-dark rounded-full flex items-center justify-center shadow-cyan-intense border-4 border-frost-white/50 group-hover:animate-gear-pulse">
                      <span className="text-2xl font-cinzel font-bold text-white">1</span>
                    </div>
                  </div>
                  
                  <div className="text-center pt-8">
                    <h3 className="text-xl font-cinzel font-bold text-dark-bronze mb-4 flex items-center justify-center space-x-2">
                      <span>🛠️ Sign Up</span>
                    </h3>
                    <p className="text-dark-bronze/70 font-inter">Create your account and access the BookForge platform</p>
                  </div>
                  
                  {/* Crystal Bottom Accent */}
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-neon-cyan rounded-b-3xl shadow-cyan-glow"></div>
                </FrostedGlassPanel>
              </div>

              {/* Step 2 */}
              <div className="group relative">
                <FrostedGlassPanel 
                  className="p-8 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500" 
                  glowColor="brass" 
                  borderStyle="embossed"
                  hasGearCorner
                >
                  {/* Crystal Step Number */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 bg-brass-gradient rounded-full flex items-center justify-center shadow-brass-intense border-4 border-neon-cyan/30 group-hover:animate-gear-pulse">
                      <span className="text-2xl font-cinzel font-bold text-white">2</span>
                    </div>
                  </div>
                  
                  <div className="text-center pt-8">
                    <h3 className="text-xl font-cinzel font-bold text-dark-bronze mb-4 flex items-center justify-center space-x-2">
                      <span>📘 Choose Your Book Type</span>
                    </h3>
                    <p className="text-dark-bronze/70 font-inter">Select from textbooks, workbooks, or storybooks</p>
                  </div>
                  
                  {/* Brass Bottom Accent */}
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-brass-gradient rounded-b-3xl shadow-brass-glow"></div>
                </FrostedGlassPanel>
              </div>

              {/* Step 3 */}
              <div className="group relative">
                <FrostedGlassPanel 
                  className="p-8 transform hover:-translate-y-2 hover:scale-105 transition-all duration-500" 
                  glowColor="aurora" 
                  borderStyle="crystal"
                  hasGearCorner
                >
                  {/* Crystal Step Number */}
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 bg-gradient-to-r from-brass to-neon-cyan rounded-full flex items-center justify-center shadow-aurora border-4 border-glass-white/50 group-hover:animate-gear-pulse">
                      <span className="text-2xl font-cinzel font-bold text-white">3</span>
                    </div>
                  </div>
                  
                  <div className="text-center pt-8">
                    <h3 className="text-xl font-cinzel font-bold text-dark-bronze mb-4 flex items-center justify-center space-x-2">
                      <span>✨ Customize + Export</span>
                    </h3>
                    <p className="text-dark-bronze/70 font-inter">Design your content and export as flipbook or PDF</p>
                  </div>
                  
                  {/* Aurora Bottom Accent */}
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-1 bg-gradient-to-r from-neon-cyan to-brass rounded-b-3xl shadow-cyan-glow"></div>
                </FrostedGlassPanel>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <FrostedGlassPanel className="p-12" glowColor="aurora" borderStyle="embossed">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-cinzel font-bold text-dark-bronze mb-8 leading-tight">
              Start building your own
              <span className="block bg-gradient-to-r from-neon-cyan to-brass bg-clip-text text-transparent">
                educational universe.
              </span>
            </h2>
            
            <div className="mt-12">
              <Link to="/register">
                <CrystalButton 
                  variant="primary" 
                  size="xl" 
                  icon={ArrowRight}
                  hasGearEffect
                  className="min-w-[250px]"
                >
                  Get Started
                </CrystalButton>
              </Link>
            </div>
          </FrostedGlassPanel>
        </div>
      </section>

      {/* FOOTER - Embossed Gearwork with Frozen Pipes */}
      <footer className="relative z-10 bg-gradient-to-b from-transparent to-ice-blue/20">
        {/* Aurora Glow Edge */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-aurora-glow to-transparent shadow-aurora"></div>
        
        {/* Frozen Pipes Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-2 h-full bg-brass-gradient"></div>
          <div className="absolute top-0 right-1/4 w-2 h-full bg-neon-cyan"></div>
          <div className="absolute top-1/3 left-0 right-0 h-2 bg-gradient-to-r from-brass via-neon-cyan to-brass"></div>
        </div>
        
        <div className="relative z-10">
          <FrostedGlassPanel className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" borderStyle="embossed" glowColor="aurora">
            <div className="text-center">
              {/* Logo with Gear Effects */}
              <div className="flex items-center justify-center space-x-3 mb-8">
                <div className="relative">
                  <Cog className="h-8 w-8 text-brass animate-spin-slow" />
                  <div className="absolute inset-0 h-8 w-8 bg-brass/30 rounded-full blur-sm"></div>
                </div>
                <span className="text-2xl font-cinzel font-bold text-dark-bronze">ClockEd-In BookForge</span>
                <div className="relative">
                  <Settings className="h-6 w-6 text-neon-cyan animate-reverse-spin" />
                  <div className="absolute inset-0 h-6 w-6 bg-neon-cyan/30 rounded-full blur-sm"></div>
                </div>
              </div>
              
              {/* Links */}
              <div className="flex justify-center space-x-8 mb-8">
                <button className="text-dark-bronze/70 hover:text-neon-cyan transition-colors font-inter hover:animate-pulse">
                  About
                </button>
                <button className="text-dark-bronze/70 hover:text-neon-cyan transition-colors font-inter hover:animate-pulse">
                  Privacy
                </button>
                <button className="text-dark-bronze/70 hover:text-neon-cyan transition-colors font-inter hover:animate-pulse">
                  Contact
                </button>
              </div>
              
              {/* Copyright with Crystal Divider */}
              <div className="border-t border-gradient-to-r from-transparent via-brass/30 to-transparent pt-8">
                <p className="text-dark-bronze/60 font-inter flex items-center justify-center space-x-2">
                  <span>© 2025 ClockEd-In. All rights reserved.</span>
                  <Settings className="h-4 w-4 text-brass animate-reverse-spin ml-2" />
                </p>
                
                {/* Faint Aurora Glow at Bottom */}
                <div className="mt-4 h-1 bg-gradient-to-r from-transparent via-aurora-glow to-transparent opacity-30 rounded-full"></div>
              </div>
            </div>
          </FrostedGlassPanel>
        </div>
        
        {/* Embossed Gear Pattern at Very Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-ice-blue/30 to-transparent">
          <div className="absolute bottom-2 left-[10%] w-4 h-4 bg-brass/20 rounded-full"></div>
          <div className="absolute bottom-2 right-[10%] w-4 h-4 bg-neon-cyan/20 rounded-full"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-brass/30 rounded-full"></div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;