export const profile = {
  name: "BamgasiJM",
  role: "Creative Developer",
  tagline: "Generative Art · Interactive Experience · Real-time Graphics",
  bio: "코드와 시각 언어 사이의 경계를 탐구합니다. GPU 기반 파티클 시스템부터 인터랙티브 웹 경험까지, 움직임과 알고리즘으로 형태를 만듭니다.",
  location: "Seoul, KR",
  year: "2026",
} as const;

export const roles = [
  { label: "PRIMARY", value: "Generative Artist & Creative Coder" },
  { label: "FOCUS",   value: "Real-time Graphics / Interactive Installation" },
  { label: "STATUS",  value: "Available for Freelance" },
] as const;

export const stacks: { category: string; items: string[] }[] = [
  {
    category: "GRAPHICS",
    items: ["Unity 6", "URP / HDRP", "HLSL / GLSL", "Compute Shader", "WebGL"],
  },
  {
    category: "WEB",
    items: ["Next.js 15", "TypeScript", "Tailwind CSS v4", "Three.js", "Babylon.js"],
  },
  {
    category: "GENERATIVE",
    items: ["p5.js", "After Effects JSX", "Blender Python", "Perlin Noise", "Curl Noise"],
  },
  {
    category: "TOOLING",
    items: ["Vite", "Node.js", "Git", "VSCode", "Figma"],
  },
];

export const works: { year: string; title: string; tag: string }[] = [
  { year: "2026", title: "GPU Instancing Boilerplate — Unity URP",   tag: "TOOL" },
  { year: "2025", title: "MeshVolumeArtwork — Rejection Sampling",    tag: "ART" },
  { year: "2025", title: "FlowField Particle System — Curl Noise",    tag: "ART" },
  { year: "2025", title: "GLB/GLTF Viewer — Babylon.js + Vite",       tag: "DEV" },
  { year: "2025", title: "AttractorArtwork — Lorenz / Clifford",       tag: "ART" },
  { year: "2024", title: "Perlin Noise Flow Field — After Effects JSX", tag: "ART" },
];
