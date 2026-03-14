import { useEffect, useState, useRef } from 'react';

type CatAppearance = 'HIDDEN' | 'STALKING' | 'SITTING';

export default function JapanAestheticLayer() {
  const [isDark, setIsDark] = useState(false);
  
  // Track system theme
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    return () => observer.disconnect();
  }, []);

  if (isDark) return null;

  return (
    <div className="JapanAesthetic pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* <CompanionCat /> */}
      {/* Sakura Petals */}
      {[...Array(12)].map((_, i) => (
        <SakuraPetal key={i} />
      ))}
    </div>
  );
}

function CompanionCat() {
  const catRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    mouse: { x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 },
    cat: { x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight + 150 : 0 },
    mode: 'HIDDEN' as CatAppearance,
    lastMove: Date.now()
  });
  
  const [appearance, setAppearance] = useState<CatAppearance>('HIDDEN');
  
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      stateRef.current.mouse = { x: e.clientX, y: e.clientY };
      stateRef.current.lastMove = Date.now();
      
      if (stateRef.current.mode !== 'HIDDEN') {
        stateRef.current.mode = 'HIDDEN';
        setAppearance('HIDDEN');
      }
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    
    const update = () => {
      const state = stateRef.current;
      const now = Date.now();
      const timeSinceMove = now - state.lastMove;
      
      // TRIGGER AFK STALKING AFTER 2.5s
      if (state.mode === 'HIDDEN' && timeSinceMove > 2500) {
        // Spawn cat at bottom edge
        const spawnX = Math.max(50, Math.min(window.innerWidth - 50, state.mouse.x + (Math.random() > 0.5 ? 200 : -200)));
        state.cat.x = spawnX;
        state.cat.y = window.innerHeight + 100; // Starts below screen
        state.mode = 'STALKING';
        setAppearance('STALKING');
      }
      
      if (state.mode === 'STALKING') {
        const targetX = state.mouse.x;
        const targetY = state.mouse.y + 35; // Position slightly below the cursor
        
        const dx = targetX - state.cat.x;
        const dy = targetY - state.cat.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 5) {
          state.mode = 'SITTING';
          setAppearance('SITTING');
        } else {
          // Creeping speed (slowly approaches)
          const speed = Math.max(1, Math.min(distance * 0.05, 4)); 
          state.cat.x += (dx / distance) * speed;
          state.cat.y += (dy / distance) * speed;
        }
      }
      
      if (state.mode === 'HIDDEN') {
        // Run away / fall down quickly when scared by mouse movement
        state.cat.y += 20; 
      }
      
      if (catRef.current) {
         let scaleX = 1;
         // If walking or sitting, look towards the mouse
         if (state.mode !== 'HIDDEN') {
             // In stalking SVG, head is on the right side (x=80). So setting scaleX to 1 faces right.
             scaleX = state.mouse.x < state.cat.x ? -1 : 1; 
         }
         
         catRef.current.style.transform = `translate(${state.cat.x}px, ${state.cat.y}px) scaleX(${scaleX})`;
      }
      
      animationFrameId = requestAnimationFrame(update);
    };
    
    animationFrameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div 
      ref={catRef}
      className={`absolute transition-opacity duration-[800ms] ${appearance === 'HIDDEN' ? 'opacity-0' : 'opacity-100'}`}
      style={{ 
        top: 0, left: 0, 
        width: '60px', height: '60px',
        marginLeft: '-30px', marginTop: '-30px',
        willChange: 'transform, opacity'
      }}
    >
      {appearance === 'SITTING' ? (
        <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor" className="text-[#1a1a1a]">
          {/* Sitting cat looking up/raising paw */}
          {/* Body & base curve */}
          <path d="M30,80 C20,80 15,65 30,55 C45,45 50,25 50,25 C50,25 55,25 60,40 C65,55 60,80 45,80 Z" />
          {/* Hind leg bundle */}
          <path d="M25,80 C10,80 10,65 25,65 C35,65 40,80 25,80 Z" /> 
          
          {/* Raised paw */}
          <path d="M50,25 C50,15 55,10 60,10 C65,10 65,15 60,25 C55,35 55,40 55,40" fill="currentColor" />
          
          {/* Tail wrapped or raised */}
          <path d="M55,60 C65,60 75,50 70,30 C65,10 50,15 60,25 C70,35 60,50 50,60" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          
          {/* Head */}
          <circle cx="50" cy="25" r="14" />
          {/* Ears */}
          <path d="M40,17 L32,5 L48,10 Z" />
          <path d="M60,17 L68,5 L52,10 Z" />
          
          {/* Eyes watching the cursor */}
          <circle cx="45" cy="22" r="2" fill="white" />
          <circle cx="55" cy="22" r="2" fill="white" />
        </svg>
      ) : (
        <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor" className="text-[#1a1a1a]">
          {/* Stalking cat */}
          <path d="M20,60 C40,45 60,45 80,55 C90,60 90,70 80,70 C60,70 40,70 20,70 C5,70 10,65 20,60 Z" />
          {/* Head */}
          <circle cx="80" cy="50" r="14" />
          {/* Ears */}
          <path d="M73,43 L65,30 L80,38 Z" />
          <path d="M87,43 L95,30 L80,38 Z" />
          {/* Tail */}
          <path d="M20,60 C10,55 5,40 15,30" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}

function SakuraPetal() {
  const [pos, setPos] = useState({ 
    left: Math.random() * 100, 
    top: -10, 
    rotate: Math.random() * 360,
    speed: 0.5 + Math.random() * 1
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPos(prev => {
        const newTop = prev.top + prev.speed;
        const newLeft = prev.left + Math.sin(newTop / 10) * 0.2;
        if (newTop > 110) return { ...prev, top: -10, left: Math.random() * 100 };
        return { ...prev, top: newTop, left: newLeft, rotate: prev.rotate + 1 };
      });
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="absolute bg-pink-200/40 blur-[1px]"
      style={{
        left: `${pos.left}%`,
        top: `${pos.top}%`,
        width: '12px',
        height: '8px',
        borderRadius: '50% 0 50% 0',
        transform: `rotate(${pos.rotate}deg)`,
      }}
    />
  );
}
