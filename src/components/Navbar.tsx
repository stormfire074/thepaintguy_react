import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';
import { navItems, companyData } from '../data';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group" aria-label="ThePaintGuy home">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e94560] to-[#4361ee] flex items-center justify-center">
              <span className="text-white font-bold text-sm">TP</span>
            </div>
            <span className={`font-heading text-lg font-bold tracking-tight transition-colors duration-300 ${
              isScrolled ? 'text-charcoal' : 'text-white'
            }`}>
              {companyData.name}
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/10 ${
                  isScrolled
                    ? 'text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="ml-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#e94560] to-[#4361ee] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[#e94560]/25 transition-all duration-300 hover:scale-105"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-charcoal' : 'text-white'
            }`}
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="px-4 py-3 rounded-xl text-charcoal/70 hover:text-charcoal hover:bg-charcoal/5 text-base font-medium transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsMobileOpen(false)}
                className="mt-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#e94560] to-[#4361ee] text-white text-center font-semibold"
              >
                Get Free Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
