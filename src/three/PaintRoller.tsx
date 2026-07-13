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

  const handleColor = useMemo(() => new THREE.Color('#555555'), []);
  const rollerColor = useMemo(() => new THREE.Color('#e94560'), []);
  const frameColor = useMemo(() => new THREE.Color('#888888'), []);
  const paintColor = useMemo(() => new THREE.Color('#e94560'), []);

  const handleMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: handleColor,
        roughness: 0.6,
        metalness: 0.3,
      }),
    [handleColor]
  );

  const rollerMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: rollerColor,
        roughness: 0.8,
        metalness: 0.0,
      }),
    [rollerColor]
  );

  const frameMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: frameColor,
        roughness: 0.25,
        metalness: 0.85,
      }),
    [frameColor]
  );

  const paintMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: paintColor,
        roughness: 0.15,
        metalness: 0.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.85,
      }),
    [paintColor]
  );

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle rotation and mouse follow
    groupRef.current.rotation.y = t * 0.25 + mouse.x * 0.4;
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.08 + mouse.y * 0.15;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;

    // Spin the roller cylinder
    if (rollerRef.current) {
      rollerRef.current.rotation.z += 0.03;
    }

    // Slight handle swing
    if (handleRef.current) {
      handleRef.current.rotation.z = Math.sin(t * 0.9) * 0.05;
    }
  });

  return (
    <group ref={groupRef} castShadow>
      {/* Roller cylinder (the soft part) */}
      <mesh ref={rollerRef} castShadow receiveShadow material={rollerMaterial}>
        <cylinderGeometry args={[0.5, 0.5, 1.6, 32]} />
      </mesh>

      {/* Paint coating on roller */}
      <mesh position={[0, 0, 0]} material={paintMaterial}>
        <cylinderGeometry args={[0.52, 0.52, 1.5, 32]} />
      </mesh>

      {/* Metal frame arm */}
      <group ref={handleRef}>
        {/* Vertical shaft */}
        <mesh position={[0, 0.7, 0]} castShadow material={frameMaterial}>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 12]} />
        </mesh>

        {/* Horizontal axle through roller */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={frameMaterial}>
          <cylinderGeometry args={[0.035, 0.035, 1.8, 12]} />
        </mesh>

        {/* L-shaped connector */}
        <mesh position={[0, 0.35, 0]} material={frameMaterial}>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
        </mesh>

        {/* Handle grip */}
        <mesh position={[0, 1.5, 0]} material={handleMaterial}>
          <cylinderGeometry args={[0.06, 0.07, 1.2, 12]} />
        </mesh>

        {/* Handle end cap */}
        <mesh position={[0, 2.15, 0]} material={handleMaterial}>
          <sphereGeometry args={[0.08, 12, 12]} />
        </mesh>
      </group>

      {/* Paint drip from roller */}
      <mesh position={[0.48, -0.2, 0]} rotation={[0, 0, 0.3]} material={paintMaterial}>
        <capsuleGeometry args={[0.02, 0.25, 6, 6]} />
      </mesh>
    </group>
  );
}
