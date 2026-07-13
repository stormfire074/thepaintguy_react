import { lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Footer } from './sections/Footer';
import { useMousePosition, useScrollProgress } from './hooks';
import { PaintScene } from './three/PaintScene';
import { SplashDivider } from './components/PaintSplashes';
import { ErrorBoundary } from './components/ErrorBoundary';
import './styles/animations.css';

const About = lazy(() => import('./sections/About').then(m => ({ default: m.About })));
const Services = lazy(() => import('./sections/Services').then(m => ({ default: m.Services })));
const Process = lazy(() => import('./sections/Process').then(m => ({ default: m.Process })));
const BeforeAfter = lazy(() => import('./sections/BeforeAfter').then(m => ({ default: m.BeforeAfter })));
const Gallery = lazy(() => import('./sections/Gallery').then(m => ({ default: m.Gallery })));
const Testimonials = lazy(() => import('./sections/Testimonials').then(m => ({ default: m.Testimonials })));
const Contact = lazy(() => import('./sections/Contact').then(m => ({ default: m.Contact })));

function App() {
  const mouse = useMousePosition();
  const scrollProgress = useScrollProgress();

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed full-page 3D: bucket first half, roller second half */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ErrorBoundary>
          <PaintScene
            mouse={mouse}
            scrollProgress={scrollProgress}
            variant="floating"
            className="w-full h-full"
          />
        </ErrorBoundary>
      </div>

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <SplashDivider colors={['#4361ee', '#e94560', '#f0a500']} />
          <About />
          <SplashDivider colors={['#e94560', '#2ec4b6', '#4361ee']} />
          <Services />
          <SplashDivider colors={['#f0a500', '#4361ee', '#e94560']} />
          <Process />
          <SplashDivider colors={['#2ec4b6', '#e94560', '#f0a500']} />
          <BeforeAfter />
          <SplashDivider colors={['#4361ee', '#f0a500', '#2ec4b6']} />
          <Gallery />
          <SplashDivider colors={['#e94560', '#4361ee', '#f0a500']} />
          <Testimonials />
          <SplashDivider colors={['#f0a500', '#2ec4b6', '#e94560']} />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
