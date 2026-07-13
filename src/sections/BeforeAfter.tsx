import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';

export function BeforeAfter() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e: React.MouseEvent) => { if (isDragging.current) handleMove(e.clientX); };
  const handleTouchMove = (e: React.TouchEvent) => { handleMove(e.touches[0].clientX); };

  return (
    <section id="before-after" className="section-padding bg-white relative" aria-label="Before and after comparison">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Results"
          title="See The Transformation"
          description="Drag the paint stroke to reveal the stunning before and after difference."
        />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          <div
            ref={containerRef}
            className="relative aspect-[16/10] rounded-3xl overflow-hidden cursor-ew-resize select-none shadow-2xl"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleMouseUp}
            role="slider"
            aria-label="Before and after comparison slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(sliderPos)}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowLeft') setSliderPos((p) => Math.max(0, p - 2));
              if (e.key === 'ArrowRight') setSliderPos((p) => Math.min(100, p + 2));
            }}
          >
            {/* Before (full width underneath) */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=750&fit=crop"
                alt="Room before painting - worn and faded walls"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-sm">
                Before
              </div>
            </div>

            {/* After (clipped) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=750&fit=crop"
                alt="Room after painting - fresh and vibrant walls"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-semibold backdrop-blur-sm">
                After
              </div>
            </div>

            {/* Paint Stroke Divider */}
            <div
              className="absolute top-0 bottom-0 z-10"
              style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
            >
              {/* Main stroke line */}
              <div className="absolute top-0 bottom-0 w-1 -translate-x-1/2">
                <svg width="4" height="100%" viewBox="0 0 4 800" preserveAspectRatio="none" className="h-full">
                  <path
                    d="M2,0 Q0,200 2,400 Q4,600 2,800"
                    stroke="white"
                    strokeWidth="3"
                    fill="none"
                    filter="drop-shadow(0 0 6px rgba(255,255,255,0.5))"
                  />
                </svg>
              </div>

              {/* Handle */}
              <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-2xl flex items-center justify-center cursor-grab active:cursor-grabbing">
                <div className="flex items-center gap-1">
                  <div className="w-0.5 h-4 rounded-full bg-charcoal/40" />
                  <div className="w-0.5 h-4 rounded-full bg-charcoal/40" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
