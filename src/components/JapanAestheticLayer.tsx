import { useEffect, useState } from 'react';

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
      {/* Sakura Petals */}
      {[...Array(12)].map((_, i) => (
        <SakuraPetal key={i} />
      ))}
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
