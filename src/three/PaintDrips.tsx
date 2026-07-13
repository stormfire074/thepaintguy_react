import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PaintDripsProps {
  scrollProgress: number;
}

const DRIP_COUNT = 20;

export function PaintDrips({ scrollProgress }: PaintDripsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dripsData = useRef(
    Array.from({ length: DRIP_COUNT }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 2,
        0,
        (Math.random() - 0.5) * 0.5
      ),
      velocity: 0,
      active: false,
      spawnScroll: Math.random() * 0.8 + 0.1,
      scale: 0.3 + Math.random() * 0.7,
      wobbleOffset: Math.random() * Math.PI * 2,
    }))
  );

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#4361ee'),
        roughness: 0.15,
        metalness: 0.0,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transparent: true,
        opacity: 0.9,
      }),
    []
  );

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = state.clock.getElapsedTime();

    dripsData.current.forEach((drip, i) => {
      // Activate drip when scroll reaches its spawn point
      if (!drip.active && scrollProgress >= drip.spawnScroll) {
        drip.active = true;
        drip.velocity = 0.01 + Math.random() * 0.02;
        drip.position.set(
          (Math.random() - 0.5) * 1.5,
          0.3,
          (Math.random() - 0.5) * 0.3
        );
      }

      if (drip.active) {
        // Fall downward with acceleration
        drip.velocity += 0.0008;
        drip.position.y -= drip.velocity;

        // Slight wobble
        drip.position.x += Math.sin(t * 2 + drip.wobbleOffset) * 0.001;

        // Stretch as it falls
        const stretch = 1 + drip.velocity * 15;

        // Fade out near bottom
        const fadeStart = -3;
        const opacity = drip.position.y > fadeStart ? 1 : Math.max(0, (drip.position.y - fadeStart - 1) / -1);

        dummy.position.copy(drip.position);
        dummy.scale.set(
          0.04 * drip.scale,
          0.04 * drip.scale * stretch,
          0.04 * drip.scale
        );
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        if (opacity <= 0) {
          // Reset for reuse
          drip.active = false;
          drip.position.y = 0.3;
          drip.velocity = 0;
        }
      } else {
        // Hide inactive drips
        dummy.position.set(0, -100, 0);
        dummy.scale.set(0, 0, 0);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
    });

    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, DRIP_COUNT]} material={material}>
      <capsuleGeometry args={[1, 2, 4, 8]} />
    </instancedMesh>
  );
}
