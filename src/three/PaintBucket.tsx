import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PaintBucketProps {
  mouse?: { x: number; y: number };
  scrollProgress?: number;
  variant?: 'hero' | 'floating';
}

export function PaintBucket({ mouse = { x: 0, y: 0 }, scrollProgress = 0, variant = 'hero' }: PaintBucketProps) {
  const groupRef = useRef<THREE.Group>(null);
  const handleRef = useRef<THREE.Group>(null);
  const paintRef = useRef<THREE.Mesh>(null);

  const bucketColor = useMemo(() => new THREE.Color('#c0c0c0'), []);
  const paintColor = useMemo(() => new THREE.Color('#4361ee'), []);
  const handleColor = useMemo(() => new THREE.Color('#888888'), []);

  const paintMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: paintColor,
        roughness: 0.15,
        metalness: 0.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        envMapIntensity: 1.5,
      }),
    [paintColor]
  );

  const metalMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: bucketColor,
        roughness: 0.2,
        metalness: 0.9,
        clearcoat: 0.3,
        clearcoatRoughness: 0.2,
        envMapIntensity: 2.0,
      }),
    [bucketColor]
  );

  const handleMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: handleColor,
        roughness: 0.3,
        metalness: 0.8,
      }),
    [handleColor]
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (variant === 'hero') {
      groupRef.current.rotation.y = t * 0.3 + mouse.x * 0.5;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.05 + mouse.y * 0.2;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.1;
    } else {
      groupRef.current.rotation.y = t * 0.2;
      groupRef.current.rotation.z = Math.sin(t * 0.6) * 0.1 + scrollProgress * 0.5;
      groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
      groupRef.current.position.x = Math.sin(t * 0.3) * 0.2;
    }

    if (handleRef.current) {
      handleRef.current.rotation.z = Math.sin(t * 1.2) * 0.15;
    }

    if (paintRef.current) {
      const scaleY = 1 + Math.sin(t * 2) * 0.03;
      paintRef.current.scale.y = scaleY;
      paintRef.current.position.y = 0.32 + Math.sin(t * 2) * 0.01;
    }
  });

  return (
    <group ref={groupRef} castShadow>
      {/* Bucket body */}
      <mesh castShadow receiveShadow material={metalMaterial}>
        <cylinderGeometry args={[0.7, 0.55, 1.2, 32]} />
      </mesh>

      {/* Bucket rim */}
      <mesh position={[0, 0.6, 0]} castShadow material={metalMaterial}>
        <torusGeometry args={[0.7, 0.04, 16, 32]} />
      </mesh>

      {/* Paint surface inside */}
      <mesh ref={paintRef} position={[0, 0.32, 0]} material={paintMaterial}>
        <cylinderGeometry args={[0.65, 0.65, 0.08, 32]} />
      </mesh>

      {/* Paint overflow drip on side */}
      <mesh position={[0.68, 0.1, 0]} rotation={[0, 0, 0.2]} material={paintMaterial}>
        <capsuleGeometry args={[0.03, 0.3, 8, 8]} />
      </mesh>

      {/* Handle */}
      <group ref={handleRef} position={[0, 0.6, 0]}>
        <mesh castShadow material={handleMaterial}>
          <torusGeometry args={[0.55, 0.025, 8, 32, Math.PI]} />
        </mesh>
        {/* Handle grips */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.55, 0.035, 8, 16, Math.PI * 0.3]} />
        </mesh>
      </group>

      {/* Label stripe */}
      <mesh position={[0, 0, 0]} material={paintMaterial}>
        <cylinderGeometry args={[0.705, 0.555, 0.25, 32, 1, true]} />
      </mesh>
    </group>
  );
}
