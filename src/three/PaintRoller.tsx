import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PaintRollerProps {
  mouse?: { x: number; y: number };
}

export function PaintRoller({ mouse = { x: 0, y: 0 } }: PaintRollerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const rollerRef = useRef<THREE.Mesh>(null);
  const handleRef = useRef<THREE.Group>(null);

  const frameMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#a0a0a0',
    roughness: 0.2,
    metalness: 0.9,
    clearcoat: 0.3,
    clearcoatRoughness: 0.2,
    envMapIntensity: 2.0,
  }), []);

  const rollerMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#e8e8e8',
    roughness: 0.85,
    metalness: 0.0,
  }), []);

  const paintMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#dc2626',
    roughness: 0.12,
    metalness: 0.0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.08,
    envMapIntensity: 1.5,
    sheen: 0.6,
    sheenColor: new THREE.Color('#f87171'),
  }), []);

  const handleMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#1a1a1a',
    roughness: 0.55,
    metalness: 0.15,
  }), []);

  const gripMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#16a34a',
    roughness: 0.7,
    metalness: 0.05,
  }), []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.rotation.y = t * 0.2 + mouse.x * 0.35;
    groupRef.current.rotation.x = Math.sin(t * 0.35) * 0.06 + mouse.y * 0.12;
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.06;

    if (rollerRef.current) {
      rollerRef.current.rotation.z += 0.025;
    }

    if (handleRef.current) {
      handleRef.current.rotation.z = Math.sin(t * 0.7) * 0.04;
    }
  });

  return (
    <group ref={groupRef} castShadow>
      {/* === ROLLER CYLINDER === */}
      <mesh ref={rollerRef} castShadow receiveShadow material={rollerMaterial}>
        <cylinderGeometry args={[0.48, 0.48, 1.5, 64]} />
      </mesh>

      {/* Paint coating on roller */}
      <mesh material={paintMaterial}>
        <cylinderGeometry args={[0.50, 0.50, 1.42, 64]} />
      </mesh>

      {/* Roller end caps */}
      <mesh position={[0, 0.76, 0]} rotation={[-Math.PI / 2, 0, 0]} material={frameMaterial}>
        <circleGeometry args={[0.50, 32]} />
      </mesh>
      <mesh position={[0, -0.76, 0]} rotation={[Math.PI / 2, 0, 0]} material={frameMaterial}>
        <circleGeometry args={[0.50, 32]} />
      </mesh>

      {/* Roller texture rings (fabric texture simulation) */}
      {[-0.5, -0.25, 0, 0.25, 0.5].map((y) => (
        <mesh key={y} position={[0, y, 0]} material={paintMaterial}>
          <torusGeometry args={[0.51, 0.008, 6, 48]} />
        </mesh>
      ))}

      {/* === METAL FRAME === */}
      <group ref={handleRef}>
        {/* Vertical shaft */}
        <mesh position={[0, 1.1, 0]} castShadow material={frameMaterial}>
          <cylinderGeometry args={[0.035, 0.035, 0.75, 16]} />
        </mesh>

        {/* L-shaped bend */}
        <mesh position={[0, 0.72, 0]} material={frameMaterial}>
          <boxGeometry args={[0.07, 0.1, 0.07]} />
        </mesh>

        {/* Horizontal axle through roller */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={frameMaterial}>
          <cylinderGeometry args={[0.03, 0.03, 1.7, 16]} />
        </mesh>

        {/* Axle end caps */}
        <mesh position={[0, 0, 0.85]} material={frameMaterial}>
          <sphereGeometry args={[0.04, 12, 12]} />
        </mesh>
        <mesh position={[0, 0, -0.85]} material={frameMaterial}>
          <sphereGeometry args={[0.04, 12, 12]} />
        </mesh>

        {/* Handle tube */}
        <mesh position={[0, 1.8, 0]} material={handleMaterial}>
          <cylinderGeometry args={[0.055, 0.06, 1.1, 16]} />
        </mesh>

        {/* Handle grip (rubber) */}
        <mesh position={[0, 1.65, 0]} material={gripMaterial}>
          <cylinderGeometry args={[0.07, 0.065, 0.5, 16]} />
        </mesh>

        {/* Grip texture rings */}
        {[-0.15, -0.05, 0.05, 0.15].map((y) => (
          <mesh key={y} position={[0, 1.65 + y, 0]} material={gripMaterial}>
            <torusGeometry args={[0.072, 0.005, 6, 24]} />
          </mesh>
        ))}

        {/* Handle end cap */}
        <mesh position={[0, 2.38, 0]} material={handleMaterial}>
          <sphereGeometry args={[0.065, 16, 16]} />
        </mesh>

        {/* Bottom end cap */}
        <mesh position={[0, 0.72, 0]} material={handleMaterial}>
          <sphereGeometry args={[0.045, 12, 12]} />
        </mesh>
      </group>

      {/* === PAINT DRIPS === */}
      <mesh position={[0.49, -0.3, 0.2]} rotation={[0, 0.4, 0.2]} material={paintMaterial}>
        <capsuleGeometry args={[0.018, 0.3, 6, 8]} />
      </mesh>
      <mesh position={[-0.45, -0.1, -0.3]} rotation={[0.2, -0.3, 0.15]} material={paintMaterial}>
        <capsuleGeometry args={[0.012, 0.2, 6, 8]} />
      </mesh>
      <mesh position={[0.3, -0.5, 0.1]} rotation={[0.1, 0.2, -0.1]} material={paintMaterial}>
        <capsuleGeometry args={[0.01, 0.15, 4, 6]} />
      </mesh>
    </group>
  );
}
