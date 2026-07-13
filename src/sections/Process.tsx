import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { processSteps } from '../data';
import { SectionHeading } from '../components/SectionHeading';

export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rollerX = useTransform(scrollYProgress, [0, 1], ['-10%', '110%']);

  return (
    <section id="process" className="relative overflow-hidden" aria-label="Our process" ref={containerRef}>
      <div className="section-padding bg-charcoal relative">
        <div className="max-w-7xl mx-auto relative">
          <SectionHeading
            eyebrow="Process"
            title="How We Work"
            description="A meticulous five-step process that ensures perfection from start to finish."
            light
          />

          {/* Paint Roller Track */}
          <div className="relative mb-16 hidden lg:block">
            <div className="h-2 bg-white/10 rounded-full overflow-hidden relative">
              <motion.div
                className="absolute top-1/2 -translate-y-1/2"
                style={{ left: rollerX }}
              >
                {/* Roller */}
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white to-white/80 shadow-lg shadow-white/20 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-4 border-charcoal" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.12 }}
                className="relative group"
              >
                {/* Step card */}
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10">
                  {/* Step number */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm mb-4"
                    style={{ backgroundColor: step.color }}
                  >
                    {step.step}
                  </div>

                  <h3 className="font-heading text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-white/50 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connector line (not on last) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/3 -right-3 w-6 h-px bg-white/20" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
