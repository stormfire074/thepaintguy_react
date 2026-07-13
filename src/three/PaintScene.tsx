import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { PaintBucket } from './PaintBucket';
import { PaintDrips } from './PaintDrips';
import { Particles } from './Particles';
import * as THREE from 'three';

interface PaintSceneProps {
  mouse?: { x: number; y: number };
  scrollProgress?: number;
  className?: string;
}

function SceneContent({
  mouse,
  scrollProgress,
}: {
  mouse: { x: number; y: number };
  scrollProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;

    // Move bucket along a curved path as user scrolls
    const x = Math.sin(scrollProgress * Math.PI) * 3;
    const y = -scrollProgress * 8 + 2;
    const z = -scrollProgress * 2;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, 0.05);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, y, 0.05);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, z, 0.05);

    // Rotation follows scroll
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      scrollProgress * Math.PI * 2,
      0.03
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      Math.sin(scrollProgress * Math.PI) * 0.4,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
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

      <PaintBucket mouse={mouse} scrollProgress={scrollProgress} variant="floating" />

      {/* Paint drips that fall as bucket tilts during scroll */}
      <PaintDrips scrollProgress={scrollProgress} />

      <ContactShadows
        position={[0, -0.7, 0]}
        opacity={0.4}
        scale={5}
        blur={2.5}
        far={4}
      />

      <Particles count={80} color="#4361ee" />
      <Environment preset="studio" />
    </group>
  );
}

export function PaintScene({
  mouse = { x: 0, y: 0 },
  scrollProgress = 0,
  className = '',
}: PaintSceneProps) {
  return (
    <div className={className}>
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <SceneContent mouse={mouse} scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
