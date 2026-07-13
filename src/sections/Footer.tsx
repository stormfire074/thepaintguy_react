import { motion } from 'framer-motion';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { navItems, companyData } from '../data';

const socialIcons = [
  { icon: <FaInstagram className="w-4 h-4" />, href: companyData.social.instagram, label: 'Instagram' },
  { icon: <FaFacebookF className="w-4 h-4" />, href: companyData.social.facebook, label: 'Facebook' },
  { icon: <FaTwitter className="w-4 h-4" />, href: companyData.social.twitter, label: 'Twitter' },
  { icon: <FaLinkedinIn className="w-4 h-4" />, href: companyData.social.linkedin, label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-white relative overflow-hidden" role="contentinfo">
      {/* Subtle top border */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Logo & Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#e94560] to-[#4361ee] flex items-center justify-center">
                <span className="text-white font-bold text-sm">TP</span>
              </div>
              <span className="font-heading text-lg font-bold tracking-tight">
                {companyData.name}
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Premium painting services that transform spaces and exceed expectations. Licensed, insured, and committed to excellence.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">Navigation</h4>
            <nav>
              <ul className="space-y-2.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-white/60 text-sm hover:text-white transition-colors duration-300"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-semibold text-sm uppercase tracking-wider text-white/40 mb-4">Connect</h4>
            <div className="flex gap-3">
              {socialIcons.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} {companyData.name}. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Crafted with precision and care.
          </p>
        </div>
      </div>
    </footer>
  );
}
