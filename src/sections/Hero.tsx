import { motion } from 'framer-motion';
import { HiArrowRight } from 'react-icons/hi';
import { useMousePosition } from '../hooks';
import { PaintScene } from '../three/PaintScene';

export function Hero() {
  const mouse = useMousePosition();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-charcoal via-navy to-charcoal"
      aria-label="Hero"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(67,97,238,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(233,69,96,0.1),transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-screen py-32">
          {/* Text Content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-sm font-medium mb-6 backdrop-blur-sm border border-white/10">
                Premium Painting Services
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] tracking-tight mb-6"
            >
              Bringing{' '}
              <span className="text-gradient">Color</span>
              <br />
              To Every Space.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/60 text-lg md:text-xl leading-relaxed max-w-lg mb-10"
            >
              Expert residential and commercial painting services. We transform spaces with precision, care, and vibrant color.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#e94560] to-[#ff6b35] text-white font-semibold text-base hover:shadow-2xl hover:shadow-[#e94560]/30 transition-all duration-500 hover:scale-105"
              >
                Get Free Quote
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold text-base hover:bg-white/10 transition-all duration-300"
              >
                View Our Work
              </a>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mt-12 flex items-center gap-8"
            >
              <div className="flex -space-x-2">
                {['SM', 'DC', 'ER', 'JR'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-white/20 to-white/5 border-2 border-charcoal flex items-center justify-center text-white text-xs font-bold"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <div className="text-white/50 text-sm">
                <span className="text-white font-semibold">500+</span> Happy Clients
              </div>
            </motion.div>
          </div>

          {/* 3D Bucket */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2 h-[400px] md:h-[500px] lg:h-[600px]"
          >
            <PaintScene mouse={mouse} variant="hero" className="w-full h-full" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-3 rounded-full bg-white/50"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
