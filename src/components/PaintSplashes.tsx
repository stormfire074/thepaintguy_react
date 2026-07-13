import { useState, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

interface Splash {
  id: number;
  top: string;
  left: string;
  size: number;
  color: string;
  rotation: number;
  scrollThreshold: number;
}

const splashes: Splash[] = [
  { id: 1, top: '15%', left: '70%', size: 180, color: '#4361ee', rotation: -15, scrollThreshold: 0.12 },
  { id: 2, top: '30%', left: '20%', size: 140, color: '#e94560', rotation: 25, scrollThreshold: 0.28 },
  { id: 3, top: '45%', left: '80%', size: 200, color: '#f0a500', rotation: -30, scrollThreshold: 0.44 },
  { id: 4, top: '55%', left: '15%', size: 120, color: '#2ec4b6', rotation: 40, scrollThreshold: 0.58 },
  { id: 5, top: '70%', left: '75%', size: 160, color: '#4361ee', rotation: -20, scrollThreshold: 0.72 },
  { id: 6, top: '80%', left: '30%', size: 130, color: '#e94560', rotation: 15, scrollThreshold: 0.86 },
];

function SplashBlob({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{ filter: `drop-shadow(0 4px 12px ${color}40)` }}
    >
      <defs>
        <radialGradient id={`splash-grad-${color.replace('#', '')}`}>
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="70%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M100,30 C135,25 165,50 175,80 C185,110 170,145 145,165 C120,185 85,190 55,175 C25,160 10,130 15,95 C20,60 45,35 100,30 Z"
        fill={`url(#splash-grad-${color.replace('#', '')})`}
      />
      <path
        d="M140,160 Q155,180 145,200"
        stroke={color}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M80,170 Q70,190 75,200"
        stroke={color}
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
        opacity="0.3"
      />
      <circle cx="100" cy="100" r="20" fill={color} opacity="0.25" />
    </svg>
  );
}

function SplashItem({ splash }: { splash: Splash }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  const opacity = useMotionValue(0);
  const scaleVal = useMotionValue(0.3);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = scrollTop / docHeight;

      if (progress >= splash.scrollThreshold && !visible && !exiting) {
        setVisible(true);
        animate(opacity, 1, { duration: 0.5 });
        animate(scaleVal, 1, { duration: 0.6, ease: 'easeOut' });

        setTimeout(() => {
          setExiting(true);
          animate(opacity, 0, { duration: 0.8 });
          animate(scaleVal, 0.5, { duration: 0.8 });
        }, 1500);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [splash.scrollThreshold, visible, exiting, opacity, scaleVal]);

  if (!visible) return null;

  return (
    <motion.div
      className="absolute"
      style={{
        top: splash.top,
        left: splash.left,
        opacity,
      }}
    >
      <motion.div
        style={{
          scale: scaleVal,
          rotate: splash.rotation,
          x: '-50%',
          y: '-50%',
        }}
      >
        <SplashBlob color={splash.color} size={splash.size} />
      </motion.div>
    </motion.div>
  );
}

export function PaintSplashes() {
  return (
    <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
      {splashes.map((splash) => (
        <SplashItem key={splash.id} splash={splash} />
      ))}
    </div>
  );
}
