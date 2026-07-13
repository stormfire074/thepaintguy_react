import { motion } from 'framer-motion';

interface PaintSplashProps {
  color?: string;
  size?: number;
  className?: string;
  delay?: number;
}

export function PaintSplash({ color = '#4361ee', size = 200, className = '', delay = 0 }: PaintSplashProps) {
  return (
    <motion.svg
      initial={{ scale: 0, rotate: -15, opacity: 0 }}
      whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M100,20 C130,20 160,40 170,70 C180,100 170,130 150,150 C130,170 100,180 70,170 C40,160 20,130 20,100 C20,70 40,40 70,30 C80,25 90,20 100,20 Z"
        fill={color}
        opacity={0.15}
      />
      <path
        d="M100,40 C125,40 150,55 155,80 C160,105 150,130 135,145 C120,160 100,165 80,155 C60,145 45,125 45,100 C45,75 60,55 80,45 C85,42 92,40 100,40 Z"
        fill={color}
        opacity={0.25}
      />
      <circle cx="100" cy="100" r="30" fill={color} opacity={0.35} />
    </motion.svg>
  );
}
