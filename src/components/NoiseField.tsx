"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { createNoise3D } from "simplex-noise";
import * as THREE from "three";

// ===================================================================
// Perlin noise 기반 변위 메쉬
// ===================================================================
function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const noise3D = useMemo(() => createNoise3D(), []);

  // 평면 geometry — 고해상도 서브디비전
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(22, 22, 120, 120);
    return geo;
  }, []);

  // 버텍스 컬러를 위한 색상 배열 초기화
  useMemo(() => {
    const count = geometry.attributes.position.count;
    const colors = new Float32Array(count * 3);
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  }, [geometry]);

  // 머티리얼 — 버텍스 컬러 + 와이어프레임
  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        vertexColors: true,
        wireframe: true,
        transparent: true,
        opacity: 0.38,
      }),
    []
  );

  // 팔레트 — accent(purple), teal, pink 세 색상 사이를 보간
  const palette = useMemo(
    () => [
      new THREE.Color("#7b61ff"),
      new THREE.Color("#00e5c0"),
      new THREE.Color("#ff3e7f"),
      new THREE.Color("#ffe566"),
    ],
    []
  );

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = clock.getElapsedTime() * 0.18; // 이동 속도
    const pos = mesh.geometry.attributes.position;
    const col = mesh.geometry.attributes.color;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);

      // 3D simplex noise — x/y 좌표 + 시간을 z 축으로 사용
      const n = noise3D(x * 0.18, y * 0.18, t);
      const z = n * 2.8; // 변위 강도
      pos.setZ(i, z);

      // 높이에 따라 팔레트 인터폴레이션
      const normalized = (n + 1) * 0.5; // 0~1
      const idx = normalized * (palette.length - 1);
      const lo = Math.floor(idx);
      const hi = Math.min(lo + 1, palette.length - 1);
      const frac = idx - lo;

      const c = palette[lo].clone().lerp(palette[hi], frac);
      col.setXYZ(i, c.r, c.g, c.b);
    }

    pos.needsUpdate = true;
    col.needsUpdate = true;

    // 메쉬 자체를 아주 천천히 회전
    mesh.rotation.z = t * 0.04;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      material={material}
      rotation={[-Math.PI / 2.6, 0, 0]}
      position={[0, -1.5, 0]}
    />
  );
}

// ===================================================================
// 떠다니는 파티클 — noise 위에 추가 레이어
// ===================================================================
function Particles({ count = 320 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const noise3D = useMemo(() => createNoise3D(), []);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#7b61ff"),
      new THREE.Color("#00e5c0"),
      new THREE.Color("#ff3e7f"),
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame(({ clock }) => {
    const pts = meshRef.current;
    if (!pts) return;
    const t = clock.getElapsedTime() * 0.1;
    const pos = pts.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const ox = positions[i * 3];
      const oy = positions[i * 3 + 1];
      pos.setY(i, oy + noise3D(ox * 0.3, oy * 0.3, t + i) * 0.8);
    }
    pos.needsUpdate = true;
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions.slice(), 3));
    g.setAttribute("color",    new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, colors]);

  return (
    <points ref={meshRef} geometry={geo}>
      <pointsMaterial
        vertexColors
        size={0.055}
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  );
}

// ===================================================================
// 캔버스 래퍼 — fixed 포지션으로 배경에 깔림
// ===================================================================
export default function NoiseField() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{ position: [0, 4, 10], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <WaveMesh />
        <Particles />
      </Canvas>
    </div>
  );
}
