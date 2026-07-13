import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticlesProps {
  count?: number;
  color?: string;
}

export function Particles({ count = 80, color = '#e94560' }: ParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particleColor = useMemo(() => new THREE.Color(color), [color]);

  const { positions, speeds, offsets } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const off = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
      spd[i] = 0.1 + Math.random() * 0.3;
      off[i] = Math.random() * Math.PI * 2;
    }
    return { positions: pos, speeds: spd, offsets: off };
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const x = positions[i * 3] + Math.sin(t * speeds[i] + offsets[i]) * 0.5;
      const y = positions[i * 3 + 1] + Math.cos(t * speeds[i] * 0.7 + offsets[i]) * 0.3;
      const z = positions[i * 3 + 2];

      dummy.position.set(x, y, z);
      dummy.scale.setScalar(0.02 + Math.sin(t + offsets[i]) * 0.01);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={particleColor} transparent opacity={0.4} />
    </instancedMesh>
  );
}
