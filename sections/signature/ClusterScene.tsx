"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

const COUNT = 300;
const CLUSTER_COUNT = 5;

const COLORS = [
  "#5B8CFF", // Primary blue
  "#7B68EE", // Purple
  "#4ECDC4", // Teal
  "#FF6B6B", // Coral
  "#FFD93D", // Yellow
];

interface ClusterPointsProps {
  morphed: boolean;
  hoveredCluster: number | null;
  setHoveredCluster: (index: number | null) => void;
}

function ClusterPoints({
  morphed,
  hoveredCluster,
  setHoveredCluster,
}: ClusterPointsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempColor = useMemo(() => new THREE.Color(), []);

  const scatterPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < COUNT; i++) {
      const r = Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions.push([
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      ]);
    }
    return positions;
  }, []);

  const clusterPositions = useMemo(() => {
    const positions = [];
    const radius = 2.5;
    for (let i = 0; i < CLUSTER_COUNT; i++) {
      const angle = (i / CLUSTER_COUNT) * Math.PI * 2;
      positions.push([
        Math.cos(angle) * radius,
        Math.sin(angle) * radius * 0.5,
        0,
      ]);
    }
    return positions;
  }, []);

  const particleClusters = useMemo(() => {
    return Array.from({ length: COUNT }, () =>
      Math.floor(Math.random() * CLUSTER_COUNT),
    );
  }, []);

  const particleColors = useMemo(() => {
    const colors = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const clusterIdx = particleClusters[i];
      const color = new THREE.Color(COLORS[clusterIdx % COLORS.length]);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    return colors;
  }, [particleClusters]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();

    for (let i = 0; i < COUNT; i++) {
      const clusterIdx = particleClusters[i];

      const target = morphed
        ? clusterPositions[clusterIdx % CLUSTER_COUNT]
        : scatterPositions[i];

      let offsetX = 0,
        offsetY = 0,
        offsetZ = 0;
      if (morphed) {
        const spread = 0.4;
        const angle1 = (i * 12.345) % (Math.PI * 2);
        const angle2 = (i * 7.891) % Math.PI;
        offsetX = Math.sin(angle1) * Math.cos(angle2) * spread;
        offsetY = Math.sin(angle1) * Math.sin(angle2) * spread;
        offsetZ = Math.cos(angle1) * spread;
      }

      const currentMatrix = new THREE.Matrix4();
      meshRef.current.getMatrixAt(i, currentMatrix);
      const currentPos = new THREE.Vector3();
      currentPos.setFromMatrixPosition(currentMatrix);

      const speed = morphed ? 0.08 : 0.03;
      const x = THREE.MathUtils.lerp(currentPos.x, target[0] + offsetX, speed);
      const y = THREE.MathUtils.lerp(currentPos.y, target[1] + offsetY, speed);
      const z = THREE.MathUtils.lerp(currentPos.z, target[2] + offsetZ, speed);

      if (morphed) {
        const floatAmplitude = 0.1;
        const floatSpeed = 2;
        const finalY = y + Math.sin(time * floatSpeed + i) * floatAmplitude;
        tempMatrix.setPosition(x, finalY, z);
      } else {
        tempMatrix.setPosition(x, y, z);
      }

      meshRef.current.setMatrixAt(i, tempMatrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    if (!morphed) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[null as any, null as any, COUNT]}
      onPointerMove={(e) => {
        if (morphed) {
          const instanceId = e.instanceId;
          if (instanceId !== undefined) {
            setHoveredCluster(particleClusters[instanceId]);
          }
        }
      }}
      onPointerLeave={() => setHoveredCluster(null)}
    >
      <sphereGeometry args={[0.08, 16, 16]} />
      <instancedBufferAttribute
        attach="attributes-color"
        args={[particleColors, 3]}
      />
      <meshStandardMaterial
        vertexColors
        emissiveIntensity={0.5}
        emissive={new THREE.Color(0x5b8cff)}
      />
    </instancedMesh>
  );
}

export default function ClusterScene() {
  const [morphed, setMorphed] = useState(false);
  const [hoveredCluster, setHoveredCluster] = useState<number | null>(null);

  return (
    <div className="relative h-full w-full group">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
        <div className="bg-panel/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border text-sm text-textSecondary">
          Click to {morphed ? "scatter" : "cluster"} particles
        </div>
      </div>

      {morphed && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: CLUSTER_COUNT }).map((_, i) => {
            const angle = (i / CLUSTER_COUNT) * Math.PI * 2;
            const x = Math.cos(angle) * 120 + 50;
            const y = Math.sin(angle) * 60 + 50;
            return (
              <div
                key={i}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  opacity: hoveredCluster === i ? 1 : 0.7,
                  scale: hoveredCluster === i ? 1.1 : 1,
                }}
              >
                <div className="bg-panel/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-accent/30 shadow-lg">
                  <span
                    className="text-xs font-medium"
                    style={{ color: COLORS[i % COLORS.length] }}
                  >
                    Cluster {i + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div
        className="h-full w-full cursor-pointer rounded-2xl overflow-hidden border border-border/50"
        onClick={() => setMorphed(!morphed)}
      >
        <Canvas
          camera={{ position: [0, 0, 10], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >
          <color attach="background" args={["#0b0d10"]} />

          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <ClusterPoints
            morphed={morphed}
            hoveredCluster={hoveredCluster}
            setHoveredCluster={setHoveredCluster}
          />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>
    </div>
  );
}
