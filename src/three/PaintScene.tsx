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

function SceneContent({
  mouse,
  scrollProgress,
  variant,
}: {
  mouse: { x: number; y: number };
  scrollProgress: number;
  variant: 'hero' | 'floating';
}) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-3, 2, -3]} intensity={0.6} color="#4361ee" />
      <pointLight position={[3, -1, 2]} intensity={0.3} color="#e94560" />

      <PaintBucket mouse={mouse} scrollProgress={scrollProgress} variant={variant} />

      <ContactShadows
        position={[0, -0.7, 0]}
        opacity={0.4}
        scale={5}
        blur={2.5}
        far={4}
      />

      <Particles count={variant === 'hero' ? 100 : 40} color="#4361ee" />

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
      >
        <Suspense fallback={null}>
          <SceneContent mouse={mouse} scrollProgress={scrollProgress} variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}
