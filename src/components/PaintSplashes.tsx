import { motion, useScroll, useTransform } from 'framer-motion';

interface Splash {
  id: number;
  top: string;
  left: string;
  size: number;
  color: string;
  delay: number;
  rotation: number;
}

const splashes: Splash[] = [
  { id: 1, top: '15%', left: '70%', size: 180, color: '#4361ee', delay: 0, rotation: -15 },
  { id: 2, top: '30%', left: '20%', size: 140, color: '#e94560', delay: 0.1, rotation: 25 },
  { id: 3, top: '45%', left: '80%', size: 200, color: '#f0a500', delay: 0.2, rotation: -30 },
  { id: 4, top: '55%', left: '15%', size: 120, color: '#2ec4b6', delay: 0.15, rotation: 40 },
  { id: 5, top: '70%', left: '75%', size: 160, color: '#4361ee', delay: 0.25, rotation: -20 },
  { id: 6, top: '80%', left: '30%', size: 130, color: '#e94560', delay: 0.3, rotation: 15 },
];

function SplashBlob({ color, size }: { color: string; size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className="drop-shadow-lg"
      style={{ filter: `drop-shadow(0 4px 12px ${color}40)` }}
    >
      <defs>
        <radialGradient id={`grad-${color.replace('#', '')}`}>
          <stop offset="0%" stopColor={color} stopOpacity="0.6" />
          <stop offset="70%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* Main splash body */}
      <path
        d="M100,30 C135,25 165,50 175,80 C185,110 170,145 145,165 C120,185 85,190 55,175 C25,160 10,130 15,95 C20,60 45,35 100,30 Z"
        fill={`url(#grad-${color.replace('#', '')})`}
      />
      {/* Drip tendrils */}
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
      {/* Center dot */}
      <circle cx="100" cy="100" r="20" fill={color} opacity="0.25" />
    </svg>
  );
}

export function PaintSplashes() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="fixed inset-0 z-[5] pointer-events-none overflow-hidden">
      {splashes.map((splash) => (
        <PaintSplashItem key={splash.id} splash={splash} scrollYProgress={scrollYProgress} />
      ))}
    </div>
  );
}

function PaintSplashItem({
  splash,
  scrollYProgress,
}: {
  splash: Splash;
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  // Each splash triggers at a different scroll threshold
  const threshold = splash.id / (splashes.length + 1);
  const opacity = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold, threshold + 0.15, threshold + 0.25],
    [0, 1, 1, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold, threshold + 0.2],
    [0.3, 1, 0.6]
  );
  const rotate = useTransform(
    scrollYProgress,
    [threshold - 0.05, threshold + 0.2],
    [splash.rotation - 20, splash.rotation + 10]
  );

  return (
    <motion.div
      className="absolute"
      style={{
        top: splash.top,
        left: splash.left,
        opacity,
        scale,
        rotate,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <SplashBlob color={splash.color} size={splash.size} />
    </motion.div>
  );
}
