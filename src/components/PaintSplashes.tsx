import { motion } from 'framer-motion';

interface SplashProps {
  color?: string;
  size?: number;
  className?: string;
  direction?: 'left' | 'right' | 'center';
}

export function PaintSplash({ color = '#4361ee', size = 180, className = '', direction = 'center' }: SplashProps) {
  const xOffset = direction === 'left' ? '-20%' : direction === 'right' ? '20%' : '0%';

  return (
    <motion.div
      className={`relative pointer-events-none select-none ${className}`}
      initial={{ opacity: 0, scale: 0.15, x: xOffset }}
      whileInView={{
        opacity: [0, 0.8, 0.8, 0],
        scale: [0.15, 1.15, 1, 0.7],
      }}
      viewport={{ once: false, amount: 0.5 }}
      transition={{
        duration: 2.2,
        ease: 'easeOut',
        times: [0, 0.25, 0.65, 1],
      }}
    >
      <svg width={size} height={size * 0.8} viewBox="0 0 240 200">
        <defs>
          <radialGradient id={`psplash-${color.replace('#', '')}`}>
            <stop offset="0%" stopColor={color} stopOpacity="0.45" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Main blob */}
        <path
          d="M120,20 C165,15 205,50 215,95 C225,140 200,180 160,195 C120,210 70,205 40,180 C10,155 -5,110 5,70 C15,30 55,25 120,20 Z"
          fill={`url(#psplash-${color.replace('#', '')})`}
        />
        {/* Inner fill */}
        <path
          d="M120,55 C155,52 185,72 190,100 C195,128 178,155 155,167 C132,179 105,181 85,170 C65,159 52,138 55,112 C58,86 75,58 120,55 Z"
          fill={color}
          opacity="0.3"
        />
        {/* Drip 1 */}
        <path d="M175,180 Q192,200 185,218" stroke={color} strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.4" />
        {/* Drip 2 */}
        <path d="M95,190 Q85,212 90,225" stroke={color} strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.35" />
        {/* Drip 3 */}
        <path d="M155,188 Q160,208 155,220" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.3" />
        {/* Center dot */}
        <circle cx="120" cy="110" r="22" fill={color} opacity="0.15" />
      </svg>
    </motion.div>
  );
}

export function SplashDivider({ colors = ['#4361ee', '#e94560', '#f0a500'] }: { colors?: string[] }) {
  return (
    <div className="relative flex justify-center items-center py-0 overflow-visible" aria-hidden="true">
      {colors.map((color, i) => (
        <PaintSplash
          key={i}
          color={color}
          size={140 + i * 20}
          className={`absolute ${
            i === 0 ? '-left-[5%] top-[-40px]' : i === 1 ? 'left-[40%] top-[-60px]' : '-right-[5%] top-[-30px]'
          }`}
        />
      ))}
    </div>
  );
}
