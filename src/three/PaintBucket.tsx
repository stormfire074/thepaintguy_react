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
  const dripRef = useRef<THREE.Mesh>(null);

  // Materials
  const metalMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#b8b8b8',
    roughness: 0.18,
    metalness: 0.95,
    clearcoat: 0.4,
    clearcoatRoughness: 0.15,
    envMapIntensity: 2.5,
    reflectivity: 1,
  }), []);

  const paintMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#2563eb',
    roughness: 0.08,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    envMapIntensity: 2.0,
    reflectivity: 1,
    sheen: 0.8,
    sheenRoughness: 0.3,
    sheenColor: new THREE.Color('#60a5fa'),
  }), []);

  const handleGripMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#1a1a1a',
    roughness: 0.7,
    metalness: 0.1,
  }), []);

  const labelMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#f5f5f5',
    roughness: 0.4,
    metalness: 0.0,
  }), []);

  const labelAccentMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#2563eb',
    roughness: 0.3,
    metalness: 0.0,
  }), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    if (variant === 'hero') {
      groupRef.current.rotation.y = t * 0.25 + mouse.x * 0.5;
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.06 + mouse.y * 0.15;
      groupRef.current.position.y = Math.sin(t * 0.7) * 0.08;
    } else {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.08 + scrollProgress * 0.35;
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.1;
      groupRef.current.position.x = Math.sin(t * 0.25) * 0.15;
    }

    if (handleRef.current) {
      handleRef.current.rotation.z = Math.sin(t * 1.0) * 0.12;
    }

    if (paintRef.current) {
      paintRef.current.position.y = 0.38 + Math.sin(t * 1.8) * 0.008;
      paintRef.current.scale.y = 1 + Math.sin(t * 1.8) * 0.02;
    }

    if (dripRef.current) {
      const dripScale = 1 + Math.sin(t * 0.8) * 0.3;
      dripRef.current.scale.y = dripScale;
      dripRef.current.position.y = -0.15 - Math.sin(t * 0.8) * 0.05;
    }
  });

  return (
    <group ref={groupRef} castShadow>
      {/* === BUCKET BODY === */}
      {/* Main cylinder - tapered */}
      <mesh castShadow receiveShadow material={metalMaterial}>
        <cylinderGeometry args={[0.72, 0.58, 1.2, 64]} />
      </mesh>

      {/* Inner wall (visible when looking down) */}
      <mesh position={[0, 0.05, 0]} material={metalMaterial}>
        <cylinderGeometry args={[0.68, 0.55, 1.1, 64, 1, true]} />
      </mesh>

      {/* Bottom disc */}
      <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]} material={metalMaterial}>
        <circleGeometry args={[0.58, 64]} />
      </mesh>

      {/* === RIM & LIP === */}
      {/* Top rim ring */}
      <mesh position={[0, 0.6, 0]} castShadow material={metalMaterial}>
        <torusGeometry args={[0.72, 0.035, 16, 64]} />
      </mesh>

      {/* Rolled lip edge */}
      <mesh position={[0, 0.62, 0]} material={metalMaterial}>
        <torusGeometry args={[0.73, 0.02, 12, 64]} />
      </mesh>

      {/* Reinforcement band near top */}
      <mesh position={[0, 0.45, 0]} material={metalMaterial}>
        <torusGeometry args={[0.69, 0.015, 8, 64]} />
      </mesh>

      {/* Reinforcement band middle */}
      <mesh position={[0, 0.0, 0]} material={metalMaterial}>
        <torusGeometry args={[0.65, 0.012, 8, 64]} />
      </mesh>

      {/* === PAINT INSIDE === */}
      <mesh ref={paintRef} position={[0, 0.38, 0]} material={paintMaterial}>
        <cylinderGeometry args={[0.66, 0.66, 0.1, 64]} />
      </mesh>

      {/* Paint surface highlight ring */}
      <mesh position={[0, 0.43, 0]} material={paintMaterial}>
        <torusGeometry args={[0.55, 0.02, 8, 32]} />
      </mesh>

      {/* === DRIPS === */}
      <mesh ref={dripRef} position={[0.7, -0.15, 0.15]} rotation={[0, 0.3, 0.15]} material={paintMaterial}>
        <capsuleGeometry args={[0.025, 0.35, 8, 12]} />
      </mesh>

      <mesh position={[0.65, 0.1, -0.2]} rotation={[0.2, 0.5, 0.1]} material={paintMaterial}>
        <capsuleGeometry args={[0.018, 0.2, 6, 8]} />
      </mesh>

      <mesh position={[-0.5, -0.3, 0.4]} rotation={[0.1, -0.3, 0.2]} material={paintMaterial}>
        <capsuleGeometry args={[0.015, 0.25, 6, 8]} />
      </mesh>

      {/* === LABEL === */}
      {/* White label band */}
      <mesh position={[0, 0.0, 0]} material={labelMaterial}>
        <cylinderGeometry args={[0.725, 0.585, 0.45, 64, 1, true]} />
      </mesh>

      {/* Blue accent stripe on label */}
      <mesh position={[0, 0.0, 0]} material={labelAccentMaterial}>
        <cylinderGeometry args={[0.728, 0.588, 0.06, 64, 1, true]} />
      </mesh>

      {/* === HANDLE === */}
      <group ref={handleRef} position={[0, 0.6, 0]}>
        {/* Handle wire arc */}
        <mesh castShadow material={metalMaterial}>
          <torusGeometry args={[0.5, 0.022, 12, 48, Math.PI]} />
        </mesh>

        {/* Handle grip - rubber */}
        <mesh position={[0, 0, 0]} material={handleGripMaterial}>
          <torusGeometry args={[0.5, 0.04, 12, 24, Math.PI * 0.35]} />
        </mesh>

        {/* Handle attachment points */}
        <mesh position={[-0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={metalMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.12, 12]} />
        </mesh>
        <mesh position={[0.5, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={metalMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 0.12, 12]} />
        </mesh>
      </group>
    </group>
  );
}
