import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { PaintBucket } from './PaintBucket';
import { Particles } from './Particles';

interface PaintSceneProps {
  mouse?: { x: number; y: number };
  scrollProgress?: number;
  variant?: 'hero' | 'floating';
  className?: string;
}

function HeroScene({ mouse }: { mouse: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[-3, 2, -3]} intensity={0.6} color="#4361ee" />
      <pointLight position={[3, -1, 2]} intensity={0.3} color="#e94560" />
      <PaintBucket mouse={mouse} variant="hero" />
      <ContactShadows position={[0, -0.7, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
      <Particles count={100} color="#4361ee" />
      <Environment preset="studio" />
    </>
  );
}

function FloatingScene({ mouse, scrollProgress }: { mouse: { x: number; y: number }; scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
      <pointLight position={[-3, 2, -3]} intensity={0.6} color="#4361ee" />
      <pointLight position={[3, -1, 2]} intensity={0.3} color="#e94560" />
      <PaintBucket mouse={mouse} scrollProgress={scrollProgress} variant="floating" />
      <ContactShadows position={[0, -0.7, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
      <Particles count={60} color="#4361ee" />
      <Environment preset="studio" />
    </>
  );
}

export function PaintScene({
  mouse = { x: 0, y: 0 },
  scrollProgress = 0,
  variant = 'hero',
  className = '',
}: PaintSceneProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          {variant === 'hero' ? (
            <HeroScene mouse={mouse} />
          ) : (
            <FloatingScene mouse={mouse} scrollProgress={scrollProgress} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
