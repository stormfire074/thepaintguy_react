import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';
import { testimonials } from '../data';
import { SectionHeading } from '../components/SectionHeading';

export function Testimonials() {
  return (
    <section id="testimonials" className="section-padding bg-white relative overflow-hidden" aria-label="Testimonials">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(67,97,238,0.05),transparent_70%)]" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our Clients Say"
          description="Don't just take our word for it — hear from the people who've experienced our work."
        />

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              whileHover={{ y: -6 }}
              className="relative group"
            >
              {/* Glass Card */}
              <div className="relative p-8 rounded-3xl bg-white/60 backdrop-blur-xl border border-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)] transition-all duration-500">
                {/* Quote mark */}
                <div className="text-6xl text-[#4361ee]/10 font-serif leading-none mb-2">"</div>

                {/* Quote */}
                <p className="text-charcoal/70 text-base leading-relaxed mb-6 -mt-8">
                  {testimonial.quote}
                </p>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <HiStar key={i} className="w-4 h-4 text-[#f0a500]" />
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#e94560] to-[#4361ee] flex items-center justify-center text-white text-sm font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-charcoal/40 text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>

                {/* Floating glow on hover */}
                <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-[#e94560]/20 via-[#4361ee]/20 to-[#f0a500]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
