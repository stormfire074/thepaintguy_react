import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''} mb-16 lg:mb-20`}
    >
      {eyebrow && (
        <span className={`inline-block text-sm font-semibold tracking-widest uppercase mb-4 ${
          light ? 'text-white/60' : 'text-[#e94560]'
        }`}>
          {eyebrow}
        </span>
      )}
      <h2 className={`font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6 ${
        light ? 'text-white' : 'text-charcoal'
      }`}>
        {title}
      </h2>
      {description && (
        <p className={`text-lg md:text-xl leading-relaxed max-w-2xl ${
          align === 'center' ? 'mx-auto' : ''
        } ${light ? 'text-white/70' : 'text-charcoal/60'}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
