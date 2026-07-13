import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { PaintBucket } from './PaintBucket';
import { PaintRoller } from './PaintRoller';
import { Particles } from './Particles';
import * as THREE from 'three';

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
  const groupRef = useRef<THREE.Group>(null);

  const bucketOpacity = THREE.MathUtils.clamp(1 - (scrollProgress - 0.4) / 0.15, 0, 1);
  const rollerOpacity = THREE.MathUtils.clamp((scrollProgress - 0.45) / 0.15, 0, 1);

  useFrame(() => {
    if (!groupRef.current) return;

    // Gentle drift — stays near center, just sways slightly
    const x = Math.sin(scrollProgress * Math.PI * 0.8) * 0.4;
    const y = Math.cos(scrollProgress * Math.PI * 0.6) * 0.3;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, 0.03);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, 0.03);

    // Gentle tilt
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      scrollProgress * Math.PI * 0.8,
      0.02
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      Math.sin(scrollProgress * Math.PI) * 0.15,
      0.03
    );
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={1.4} castShadow />
      <pointLight position={[-2, 2, -2]} intensity={0.5} color="#4361ee" />
      <pointLight position={[2, -1, 3]} intensity={0.3} color="#e94560" />

      <group ref={groupRef}>
        <group visible={bucketOpacity > 0.01}>
          <PaintBucket mouse={mouse} scrollProgress={scrollProgress} variant="floating" />
        </group>
        <group visible={rollerOpacity > 0.01}>
          <PaintRoller mouse={mouse} />
        </group>
      </group>

      <ContactShadows position={[0, -1, 0]} opacity={0.3} scale={4} blur={2} far={3} />
      <Particles count={40} color="#4361ee" />
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
        camera={{ position: [0, 0, 5], fov: 40 }}
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
