import { motion } from 'framer-motion';

interface PaintRibbonProps {
  color?: string;
  direction?: 'left' | 'right';
  className?: string;
}

export function PaintRibbon({ color = '#4361ee', direction = 'left', className = '' }: PaintRibbonProps) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className={`relative h-1 overflow-hidden rounded-full ${className}`}
      style={{ transformOrigin: direction === 'left' ? 'left' : 'right' }}
    >
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
    </motion.div>
  );
}
