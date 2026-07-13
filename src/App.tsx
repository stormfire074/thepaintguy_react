import { Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Footer } from './sections/Footer';
import { useMousePosition, useScrollProgress } from './hooks';
import { PaintScene } from './three/PaintScene';
import { PaintSplashes } from './components/PaintSplashes';
import './styles/animations.css';

const About = lazy(() => import('./sections/About').then(m => ({ default: m.About })));
const Services = lazy(() => import('./sections/Services').then(m => ({ default: m.Services })));
const Process = lazy(() => import('./sections/Process').then(m => ({ default: m.Process })));
const BeforeAfter = lazy(() => import('./sections/BeforeAfter').then(m => ({ default: m.BeforeAfter })));
const Gallery = lazy(() => import('./sections/Gallery').then(m => ({ default: m.Gallery })));
const Testimonials = lazy(() => import('./sections/Testimonials').then(m => ({ default: m.Testimonials })));
const Contact = lazy(() => import('./sections/Contact').then(m => ({ default: m.Contact })));

function SectionLoader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 rounded-full border-2 border-charcoal/10 border-t-[#e94560] animate-spin" />
    </div>
  );
}

function App() {
  const mouse = useMousePosition();
  const scrollProgress = useScrollProgress();

  return (
    <div className="relative min-h-screen bg-white">
      {/* Fixed full-page 3D paint bucket background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <PaintScene
          mouse={mouse}
          scrollProgress={scrollProgress}
          className="w-full h-full"
        />
      </div>

      {/* 2D paint splashes that appear on scroll */}
      <PaintSplashes />

      {/* All content sits above the bucket */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Suspense fallback={<SectionLoader />}>
            <About />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Services />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Process />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <BeforeAfter />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Gallery />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Testimonials />
          </Suspense>
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
