import { motion } from 'framer-motion';
import { HiHome, HiOfficeBuilding, HiColorSwatch, HiSun } from 'react-icons/hi';
import { services } from '../data';
import { SectionHeading } from '../components/SectionHeading';

const iconMap: Record<string, React.ReactNode> = {
  home: <HiHome className="w-7 h-7" />,
  building: <HiOfficeBuilding className="w-7 h-7" />,
  palette: <HiColorSwatch className="w-7 h-7" />,
  sun: <HiSun className="w-7 h-7" />,
};

export function Services() {
  return (
    <section id="services" className="section-padding bg-surface relative overflow-hidden" aria-label="Services">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#e94560]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#4361ee]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          eyebrow="Services"
          title="What We Do Best"
          description="Comprehensive painting solutions tailored to your needs, delivered with unmatched quality and care."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-8 rounded-3xl bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden"
            >
              {/* Paint reveal effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl"
                style={{
                  background: `radial-gradient(circle at 50% 120%, ${service.color}15, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:scale-110"
                style={{
                  backgroundColor: `${service.color}15`,
                  color: service.color,
                }}
              >
                {iconMap[service.icon]}
              </div>

              <h3 className="relative font-heading text-xl font-bold text-charcoal mb-3">
                {service.title}
              </h3>

              <p className="relative text-charcoal/50 text-sm leading-relaxed">
                {service.description}
              </p>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-8 right-8 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                style={{ backgroundColor: service.color }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
