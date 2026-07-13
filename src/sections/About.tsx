import { motion } from 'framer-motion';
import { stats } from '../data';
import { SectionHeading } from '../components/SectionHeading';
import { useInView } from '../hooks';

export function About() {
  const { ref: imageRef, isInView: imageVisible } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="section-padding bg-white relative overflow-hidden" aria-label="About us">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4361ee]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="About Us"
          title="Crafting Beautiful Spaces Since 2009"
          description="We're not just painters — we're artisans who bring vision, precision, and passion to every project."
          align="left"
        />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: -60 }}
            animate={imageVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=800&h=600&fit=crop"
                alt="Professional painter at work"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
            </div>
            {/* Floating accent card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={imageVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 lg:right-8 glass-dark rounded-2xl px-6 py-4 text-white"
            >
              <div className="text-3xl font-bold">15+</div>
              <div className="text-white/60 text-sm">Years of Excellence</div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-charcoal/60 text-lg leading-relaxed mb-8">
              At ThePaintGuy, we believe every space has a story to tell. Our team of skilled professionals combines
              years of expertise with an obsessive attention to detail, delivering results that exceed expectations.
              From the first consultation to the final brushstroke, we treat every project as our own.
            </p>
            <p className="text-charcoal/60 text-lg leading-relaxed mb-10">
              We use only premium paints and materials, sustainable practices, and proven techniques to ensure
              lasting beauty that stands the test of time.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="p-5 rounded-2xl bg-surface hover:bg-charcoal group cursor-default transition-all duration-500"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#e94560] group-hover:text-white transition-colors mb-1">
                    {stat.value}
                  </div>
                  <div className="text-charcoal/50 text-sm group-hover:text-white/60 transition-colors">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
