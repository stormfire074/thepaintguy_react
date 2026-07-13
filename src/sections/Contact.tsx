import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPhone, HiMail, HiLocationMarker, HiClock, HiCheckCircle } from 'react-icons/hi';
import { companyData } from '../data';
import { SectionHeading } from '../components/SectionHeading';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    { icon: <HiPhone className="w-5 h-5" />, label: companyData.phone },
    { icon: <HiMail className="w-5 h-5" />, label: companyData.email },
    { icon: <HiLocationMarker className="w-5 h-5" />, label: companyData.address },
    { icon: <HiClock className="w-5 h-5" />, label: companyData.hours },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden" aria-label="Contact us">
      {/* Large paint splash background */}
      <div className="absolute inset-0">
        <svg viewBox="0 0 1440 800" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="splash-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4361ee" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#e94560" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#f0a500" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          <path
            d="M200,100 Q400,50 600,150 T1000,100 Q1200,80 1300,200 T1350,400 Q1300,600 1100,700 T700,750 Q400,780 200,650 T100,400 Z"
            fill="url(#splash-gradient)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          eyebrow="Contact"
          title="Let's Create Something Beautiful"
          description="Ready to transform your space? Get in touch for a free consultation and quote."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-charcoal/70 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="John Doe"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-charcoal/10 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-[#4361ee]/30 focus:border-[#4361ee] transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-charcoal/70 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="john@example.com"
                    className="w-full px-5 py-3.5 rounded-2xl bg-white border border-charcoal/10 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-[#4361ee]/30 focus:border-[#4361ee] transition-all duration-300"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-charcoal/70 mb-2">Service</label>
                <select
                  id="service"
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border border-charcoal/10 text-charcoal focus:outline-none focus:ring-2 focus:ring-[#4361ee]/30 focus:border-[#4361ee] transition-all duration-300"
                >
                  <option>Residential Painting</option>
                  <option>Commercial Painting</option>
                  <option>Interior Painting</option>
                  <option>Exterior Painting</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-charcoal/70 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  className="w-full px-5 py-3.5 rounded-2xl bg-white border border-charcoal/10 text-charcoal placeholder:text-charcoal/30 focus:outline-none focus:ring-2 focus:ring-[#4361ee]/30 focus:border-[#4361ee] transition-all duration-300 resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#e94560] to-[#4361ee] text-white font-semibold text-base hover:shadow-2xl hover:shadow-[#e94560]/25 transition-shadow duration-300 relative overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.span
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center justify-center gap-2"
                    >
                      <HiCheckCircle className="w-5 h-5" />
                      Message Sent!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-3xl bg-charcoal text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#4361ee]/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#e94560]/20 rounded-full blur-3xl" />

              <h3 className="font-heading text-2xl font-bold mb-6 relative">Get in Touch</h3>

              <div className="space-y-5 relative">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#e94560] shrink-0">
                      {info.icon}
                    </div>
                    <span className="text-white/70 text-sm leading-relaxed pt-2">
                      {info.label}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <motion.a
                href="tel:+15552345678"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full py-4 rounded-2xl bg-gradient-to-r from-[#e94560] to-[#ff6b35] text-white font-semibold text-center block relative"
              >
                Call Us Now
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
