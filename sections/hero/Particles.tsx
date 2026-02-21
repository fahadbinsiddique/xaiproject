"use client";

import { useFrame } from "@react-three/fiber";
import { useScroll } from "framer-motion";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COUNT = 1200;
const COLORS = ["#5B8CFF", "#7B68EE", "#4ECDC4", "#FF6B6B"];

export default function Particles() {
  const mesh = useRef<THREE.Points>(null);
  const { scrollYProgress } = useScroll();

  const { positions, gridPositions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const gridPositions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
      const r = Math.random() * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      const gridSize = Math.ceil(Math.pow(COUNT, 1 / 3));
      const x = (i % gridSize) - gridSize / 2;
      const y = (Math.floor(i / gridSize) % gridSize) - gridSize / 2;
      const z = Math.floor(i / (gridSize * gridSize)) - gridSize / 2;

      gridPositions[i * 3 + 0] = x * 0.3;
      gridPositions[i * 3 + 1] = y * 0.3;
      gridPositions[i * 3 + 2] = z * 0.3;

      const color = new THREE.Color(
        COLORS[Math.floor(Math.random() * COLORS.length)],
      );
      colors[i * 3 + 0] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 0.5 + 0.25;
    }

    return { positions, gridPositions, colors, sizes };
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;

    const progress = scrollYProgress.get();
    const time = state.clock.getElapsedTime();

    const positionsArray = mesh.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < COUNT; i++) {
      const ix = i * 3;

      const targetX = THREE.MathUtils.lerp(
        positions[ix + 0],
        gridPositions[ix + 0],
        progress,
      );
      const targetY = THREE.MathUtils.lerp(
        positions[ix + 1],
        gridPositions[ix + 1],
        progress,
      );
      const targetZ = THREE.MathUtils.lerp(
        positions[ix + 2],
        gridPositions[ix + 2],
        progress,
      );

      const waveX = Math.sin(time * 2 + i) * 0.1 * (1 - progress);
      const waveY = Math.cos(time * 2 + i) * 0.1 * (1 - progress);
      const waveZ = Math.sin(time * 1.5 + i) * 0.1 * (1 - progress);

      positionsArray[ix + 0] = targetX + waveX;
      positionsArray[ix + 1] = targetY + waveY;
      positionsArray[ix + 2] = targetZ + waveZ;
    }

    mesh.current.geometry.attributes.position.needsUpdate = true;

    mesh.current.rotation.y += 0.001;
    mesh.current.rotation.x = Math.sin(time * 0.2) * 0.1;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={COUNT}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>

      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
