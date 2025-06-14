import React, { useEffect, useState } from 'react';
import { Cog, Settings, Zap } from 'lucide-react';

interface FloatingGear {
  id: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;
  icon: 'cog' | 'settings' | 'zap';
  opacity: number;
}

interface FrostCluster {
  id: string;
  x: number;
  y: number;
  scale: number;
  delay: number;
}

interface GlobalBackgroundProps {
  enableFrost?: boolean;
  enableGears?: boolean;
  enableSnowfall?: boolean;
  enableAurora?: boolean;
  className?: string;
}

const GlobalBackground: React.FC<GlobalBackgroundProps> = ({
  enableFrost = true,
  enableGears = true,
  enableSnowfall = true,
  enableAurora = true,
  className = '',
}) => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [gears, setGears] = useState<FloatingGear[]>([]);
  const [frostClusters, setFrostClusters] = useState<FrostCluster[]>([]);

  // Initialize floating gears
  useEffect(() => {
    if (!enableGears) return;

    const generateGears = () => {
      const newGears: FloatingGear[] = [];
      const gearCount = Math.min(8, Math.max(4, Math.floor(window.innerWidth / 300)));

      for (let i = 0; i < gearCount; i++) {
        const icons: ('cog' | 'settings' | 'zap')[] = ['cog', 'settings', 'zap'];
        newGears.push({
          id: `gear-${i}`,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: 20 + Math.random() * 40,
          speed: 0.5 + Math.random() * 1.5,
          direction: Math.random() * Math.PI * 2,
          icon: icons[Math.floor(Math.random() * icons.length)],
          opacity: 0.1 + Math.random() * 0.3,
        });
      }
      setGears(newGears);
    };

    generateGears();
    window.addEventListener('resize', generateGears);
    return () => window.removeEventListener('resize', generateGears);
  }, [enableGears]);

  // Initialize frost clusters
  useEffect(() => {
    if (!enableFrost) return;

    const generateFrostClusters = () => {
      const newClusters: FrostCluster[] = [];
      const clusterCount = Math.min(12, Math.max(6, Math.floor(window.innerWidth / 200)));

      for (let i = 0; i < clusterCount; i++) {
        newClusters.push({
          id: `frost-${i}`,
          x: Math.random() * 100,
          y: Math.random() * 100,
          scale: 0.5 + Math.random() * 1.5,
          delay: Math.random() * 3,
        });
      }
      setFrostClusters(newClusters);
    };

    generateFrostClusters();
    window.addEventListener('resize', generateFrostClusters);
    return () => window.removeEventListener('resize', generateFrostClusters);
  }, [enableFrost]);

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      
      // Trigger frost effects after some scrolling
      if (currentScrollY > 100 && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  // Animate floating gears
  useEffect(() => {
    if (!enableGears || gears.length === 0) return;

    const animateGears = () => {
      setGears(prevGears => 
        prevGears.map(gear => ({
          ...gear,
          x: gear.x + Math.cos(gear.direction) * gear.speed,
          y: gear.y + Math.sin(gear.direction) * gear.speed,
          direction: gear.direction + (Math.random() - 0.5) * 0.1,
          // Wrap around screen edges
          ...(gear.x > window.innerWidth + 50 && { x: -50 }),
          ...(gear.x < -50 && { x: window.innerWidth + 50 }),
          ...(gear.y > window.innerHeight + 50 && { y: -50 }),
          ...(gear.y < -50 && { y: window.innerHeight + 50 }),
        }))
      );
    };

    const interval = setInterval(animateGears, 100);
    return () => clearInterval(interval);
  }, [enableGears, gears.length]);

  const getGearIcon = (iconType: string, size: number) => {
    const iconProps = {
      size,
      className: "text-brass/40 drop-shadow-sm"
    };

    switch (iconType) {
      case 'settings':
        return <Settings {...iconProps} />;
      case 'zap':
        return <Zap {...iconProps} />;
      default:
        return <Cog {...iconProps} />;
    }
  };

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden z-0 ${className}`}>
      {/* Base Aurora Background */}
      {enableAurora && (
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `
              radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0, 234, 255, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 60% 80% at 80% 120%, rgba(179, 157, 219, 0.1) 0%, transparent 50%),
              radial-gradient(ellipse 100% 60% at 20% 120%, rgba(212, 175, 55, 0.05) 0%, transparent 50%)
            `,
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        />
      )}

      {/* Primary Icy Porcelain Background */}
      <div 
        className="absolute inset-0 bg-icy-porcelain opacity-95"
        style={{
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      />

      {/* Floating Gears */}
      {enableGears && gears.map((gear) => (
        <div
          key={gear.id}
          className="absolute animate-spin-slow transition-transform duration-1000 ease-out"
          style={{
            left: `${gear.x}px`,
            top: `${gear.y}px`,
            opacity: gear.opacity,
            transform: `translate(-50%, -50%) scale(${0.8 + scrollY * 0.0002})`,
          }}
        >
          {getGearIcon(gear.icon, gear.size)}
        </div>
      ))}

      {/* Frost Spread Clusters */}
      {enableFrost && isVisible && frostClusters.map((cluster) => (
        <div
          key={cluster.id}
          className="absolute animate-frost-spread"
          style={{
            left: `${cluster.x}%`,
            top: `${cluster.y}%`,
            transform: `translate(-50%, -50%) scale(${cluster.scale})`,
            animationDelay: `${cluster.delay}s`,
          }}
        >
          <div className="w-32 h-32 bg-gradient-radial from-neon-cyan/20 via-neon-cyan/10 to-transparent rounded-full blur-sm" />
          <div className="absolute inset-4 w-24 h-24 bg-gradient-radial from-frost-white/30 via-ice-blue/20 to-transparent rounded-full blur-xs" />
          <div className="absolute inset-8 w-16 h-16 bg-gradient-radial from-neon-cyan/40 via-transparent to-transparent rounded-full" />
        </div>
      ))}

      {/* Crystal Pattern Overlay */}
      {enableFrost && (
        <div 
          className="absolute inset-0 bg-crystal-pattern opacity-20"
          style={{
            transform: `translateY(${scrollY * -0.02}px) scale(${1 + scrollY * 0.0001})`,
          }}
        />
      )}

      {/* Snowfall Effect */}
      {enableSnowfall && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={`snow-${i}`}
              className="absolute w-1 h-1 bg-frost-white/60 rounded-full animate-snowfall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Scroll-Triggered Frost Texture */}
      {enableFrost && scrollY > 200 && (
        <div 
          className="absolute inset-0 bg-frost-texture opacity-40 transition-opacity duration-1000"
          style={{
            opacity: Math.min(0.6, (scrollY - 200) / 500),
            transform: `translateY(${scrollY * 0.03}px)`,
          }}
        />
      )}

      {/* Interactive Glow Zones */}
      <div className="absolute inset-0">
        {/* Top-left glow */}
        <div 
          className="absolute top-0 left-0 w-96 h-96 bg-gradient-radial from-neon-cyan/10 via-neon-cyan/5 to-transparent rounded-full blur-3xl"
          style={{
            transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0003})`,
          }}
        />
        
        {/* Bottom-right glow */}
        <div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-radial from-brass/10 via-brass/5 to-transparent rounded-full blur-3xl"
          style={{
            transform: `translate(50%, 50%) scale(${1 + scrollY * 0.0002})`,
          }}
        />
        
        {/* Center aurora streak */}
        <div 
          className="absolute top-1/2 left-1/2 w-full h-2 bg-gradient-to-r from-transparent via-aurora-glow/20 to-transparent blur-sm"
          style={{
            transform: `translate(-50%, -50%) rotate(${scrollY * 0.1}deg)`,
          }}
        />
      </div>

      {/* Gear Interconnection Lines */}
      {enableGears && gears.length > 1 && (
        <svg className="absolute inset-0 w-full h-full opacity-10">
          {gears.slice(0, -1).map((gear, index) => {
            const nextGear = gears[index + 1];
            const distance = Math.sqrt(
              Math.pow(nextGear.x - gear.x, 2) + Math.pow(nextGear.y - gear.y, 2)
            );
            
            // Only draw lines for gears that are reasonably close
            if (distance < 300) {
              return (
                <line
                  key={`connection-${gear.id}-${nextGear.id}`}
                  x1={gear.x}
                  y1={gear.y}
                  x2={nextGear.x}
                  y2={nextGear.y}
                  stroke="rgba(212, 175, 55, 0.3)"
                  strokeWidth="1"
                  strokeDasharray="2,4"
                  className="animate-pulse"
                />
              );
            }
            return null;
          })}
        </svg>
      )}
    </div>
  );
};

export default GlobalBackground;