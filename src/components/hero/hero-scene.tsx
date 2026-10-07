"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/**
 * An abstract "thing being built".
 *  - core: a soft, breathing blob with a hand-painted olive > pink > lavender gradient
 *  - armillary rings with little satellites, like a sphere being measured
 *  - wireframe cage = the blueprint stage
 *  - orbiting panels drawn as tiny browser windows (UI being assembled)
 *  - a dotted halo and drifting dust
 * Reacts to the pointer (anywhere on the page) and to scroll.
 */

// Deterministic PRNG so the dust field is identical on every load.
const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type Look = { bg: string; bar: string; ink: string; accent: string };
const LOOKS: Record<string, Look> = {
  cream: { bg: "#ece5d5", bar: "#d9cfba", ink: "#1b1a17", accent: "#ff4a1c" },
  pink: { bg: "#dfb0a8", bar: "#cf9d95", ink: "#1b1a17", accent: "#4c5a2b" },
  lav: { bg: "#c3b6dd", bar: "#b0a1d0", ink: "#1b1a17", accent: "#ff4a1c" },
  ink: { bg: "#1b1a17", bar: "#2b2a26", ink: "#ece5d5", accent: "#ff4a1c" },
  signal: { bg: "#ff4a1c", bar: "#e63e12", ink: "#1b1a17", accent: "#ece5d5" },
};

const PLATES = [
  { r: 2.35, a: 0.2, y: 0.55, w: 0.95, h: 0.62, look: "cream" },
  { r: 2.7, a: 1.9, y: -0.6, w: 0.7, h: 0.7, look: "lav" },
  { r: 2.2, a: 3.5, y: 0.95, w: 0.62, h: 0.86, look: "pink" },
  { r: 2.9, a: 4.6, y: -0.2, w: 1.1, h: 0.5, look: "ink" },
  { r: 2.5, a: 5.6, y: -1.0, w: 0.62, h: 0.46, look: "signal" },
] as const;

/** Draws a miniature app window: chrome dots, a heading, text lines and a button. */
function windowTexture(look: Look, seed: number) {
  const c = document.createElement("canvas");
  c.width = 320;
  c.height = 220;
  const g = c.getContext("2d")!;
  const r = rng(seed);
  g.fillStyle = look.bg;
  g.fillRect(0, 0, 320, 220);
  g.fillStyle = look.bar;
  g.fillRect(0, 0, 320, 34);
  [0, 1, 2].forEach((i) => {
    g.fillStyle = look.ink;
    g.globalAlpha = 0.45;
    g.beginPath();
    g.arc(20 + i * 18, 17, 5, 0, Math.PI * 2);
    g.fill();
  });
  g.globalAlpha = 1;
  g.fillStyle = look.ink;
  g.fillRect(24, 62, 120 + r() * 80, 16); // heading
  g.globalAlpha = 0.35;
  for (let i = 0; i < 4; i++) g.fillRect(24, 96 + i * 20, 150 + r() * 130, 8);
  g.globalAlpha = 1;
  g.fillStyle = look.accent;
  g.fillRect(24, 182, 76, 22); // button
  g.globalAlpha = 0.25;
  g.fillStyle = look.ink;
  g.fillRect(236, 120, 60, 84); // image block
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function dotTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 32;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16);
  grad.addColorStop(0, "rgba(255,255,255,1)");
  grad.addColorStop(0.6, "rgba(255,255,255,0.9)");
  grad.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(c);
}

/** Core geometry with a painted vertex-colour gradient. */
function makeCore(detail: number) {
  const geo = new THREE.IcosahedronGeometry(1.25, detail);
  const pos = geo.attributes.position;
  const col = new Float32Array(pos.count * 3);
  const stops = [
    [0, new THREE.Color("#52632d")],
    [0.34, new THREE.Color("#68793a")],
    [0.58, new THREE.Color("#8d9a5e")],
    [0.8, new THREE.Color("#e6bbb2")],
    [1, new THREE.Color("#c3b6dd")],
  ] as const;
  const tmp = new THREE.Color();
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const v = (y * 0.72 + x * 0.34) / 1.25 + 0.07 * Math.sin(z * 4 + x * 2);
    const t = Math.min(1, Math.max(0, (v + 1) / 2));
    let k = 0;
    while (k < stops.length - 2 && t > stops[k + 1][0]) k++;
    const [t0, c0] = stops[k];
    const [t1, c1] = stops[k + 1];
    tmp.copy(c0).lerp(c1, (t - t0) / (t1 - t0));
    col.set([tmp.r, tmp.g, tmp.b], i * 3);
  }
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  return geo;
}

function Sculpture({ still, lowPower }: { still: boolean; lowPower: boolean }) {
  const group = useRef<THREE.Group>(null);
  const orbit = useRef<THREE.Group>(null);
  const cage = useRef<THREE.Mesh>(null);
  const rings = useRef<THREE.Group>(null);
  const dust = useRef<THREE.Points>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const viewport = useThree((s) => s.viewport);

  // Whole sculpture (orbit ring included) is ~6.3 units wide. Scale it from the
  // viewport so it never dominates: ~half the width on desktop, smaller on phones.
  const wide = viewport.aspect >= 1;
  const base = Math.min(0.58, (viewport.width * 0.7) / 6.3);
  const baseX = wide ? viewport.width * 0.22 : viewport.width * 0.1;
  const baseY = wide ? viewport.height * 0.04 : viewport.height * 0.26;

  const core = useMemo(() => makeCore(lowPower ? 12 : 18), [lowPower]);
  const textures = useMemo(() => PLATES.map((p, i) => windowTexture(LOOKS[p.look], 11 + i * 7)), []);
  const dot = useMemo(() => dotTexture(), []);

  // Dotted halo (a flat, slightly thick ring) + sparse dust cloud, one Points each.
  const halo = useMemo(() => {
    const r = rng(7);
    const n = lowPower ? 90 : 170;
    const p = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const rad = 2.75 + (r() - 0.5) * 0.14;
      p.set([Math.cos(a) * rad, (r() - 0.5) * 0.09, Math.sin(a) * rad], i * 3);
    }
    return p;
  }, [lowPower]);
  const cloud = useMemo(() => {
    const r = rng(21);
    const n = lowPower ? 40 : 90;
    const p = new Float32Array(n * 3);
    const c = new Float32Array(n * 3);
    const palette = ["#dfb0a8", "#c3b6dd", "#1b1a17", "#ff4a1c"].map((h) => new THREE.Color(h));
    for (let i = 0; i < n; i++) {
      const rad = 2.6 + r() * 1.6;
      const th = r() * Math.PI * 2;
      const ph = Math.acos(2 * r() - 1);
      p.set([rad * Math.sin(ph) * Math.cos(th), rad * Math.cos(ph) * 0.8, rad * Math.sin(ph) * Math.sin(th)], i * 3);
      const col = palette[Math.floor(r() * palette.length)];
      c.set([col.r, col.g, col.b], i * 3);
    }
    return { p, c };
  }, [lowPower]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);

  useFrame((state, dt) => {
    const g = group.current;
    if (!g) return;
    const scroll = Math.min(1.5, window.scrollY / window.innerHeight);
    const k = 1 - Math.pow(0.001, dt); // frame-rate independent smoothing
    g.rotation.y += (pointer.current.x * 0.6 + scroll * 1.4 - g.rotation.y) * k;
    g.rotation.x += (pointer.current.y * 0.35 - g.rotation.x) * k;
    g.position.x += (baseX - g.position.x) * k;
    g.position.y += (baseY + scroll * 1.1 - g.position.y) * k;
    const s = base * (1 - scroll * 0.16);
    g.scale.setScalar(g.scale.x + (s - g.scale.x) * k);
    if (!still) {
      const t = state.clock.elapsedTime;
      if (orbit.current) orbit.current.rotation.y = t * 0.22;
      if (rings.current) {
        rings.current.rotation.y = -t * 0.16;
        rings.current.rotation.z = t * 0.05;
      }
      if (cage.current) {
        cage.current.rotation.x = t * 0.07;
        cage.current.rotation.z = t * 0.05;
      }
      if (dust.current) dust.current.rotation.y = t * 0.03;
    }
  });

  return (
    <group ref={group} position={[baseX, baseY, 0]} scale={base}>
      {/* core */}
      <mesh geometry={core}>
        <MeshDistortMaterial
          vertexColors
          color="#ffffff"
          roughness={0.3}
          metalness={0.05}
          clearcoat={0.7}
          clearcoatRoughness={0.25}
          distort={still ? 0.26 : 0.36}
          speed={still ? 0 : 1.3}
        />
      </mesh>

      {/* blueprint cage */}
      <mesh ref={cage} scale={1.55}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#1b1a17" wireframe transparent opacity={0.26} />
      </mesh>

      {/* armillary rings with satellites */}
      <group ref={rings}>
        {[
          { rot: [1.15, 0, 0.2], r: 1.95, c: "#1b1a17", sat: "#ff4a1c", at: 0.4 },
          { rot: [0.35, 0, 1.2], r: 2.15, c: "#4c5a2b", sat: "#dfb0a8", at: 2.4 },
          { rot: [1.9, 0.6, 0.4], r: 2.4, c: "#1b1a17", sat: "#c3b6dd", at: 4.4 },
        ].map((ring, i) => (
          <group key={i} rotation={ring.rot as [number, number, number]}>
            <mesh>
              <torusGeometry args={[ring.r, 0.006, 6, 140]} />
              <meshBasicMaterial color={ring.c} transparent opacity={0.45} />
            </mesh>
            <mesh position={[Math.cos(ring.at) * ring.r, Math.sin(ring.at) * ring.r, 0]}>
              <sphereGeometry args={[0.09, 16, 16]} />
              <meshStandardMaterial color={ring.sat} roughness={0.35} />
            </mesh>
          </group>
        ))}
      </group>

      {/* orbiting panels (tiny windows), the orange ring and the dotted halo */}
      <group ref={orbit}>
        {PLATES.map((p, i) => (
          <group key={i} rotation={[0, p.a, 0]}>
            <group position={[p.r, p.y, 0]} rotation={[0.3 * (i + 1), 0.8, 0.15 * i]}>
              <RoundedBox args={[p.w, p.h, 0.05]} radius={0.03} smoothness={3}>
                <meshStandardMaterial color={LOOKS[p.look].bg} roughness={0.5} metalness={0.05} />
              </RoundedBox>
              <mesh position={[0, 0, 0.027]}>
                <planeGeometry args={[p.w - 0.04, p.h - 0.04]} />
                <meshBasicMaterial map={textures[i]} />
              </mesh>
              <mesh position={[0, 0, -0.027]} rotation={[0, Math.PI, 0]}>
                <planeGeometry args={[p.w - 0.04, p.h - 0.04]} />
                <meshBasicMaterial map={textures[i]} />
              </mesh>
            </group>
          </group>
        ))}
        <mesh rotation={[1.2, 0.2, 0]}>
          <torusGeometry args={[3.15, 0.012, 8, 160]} />
          <meshBasicMaterial color="#ff4a1c" />
        </mesh>
        <points rotation={[0.12, 0, 0.06]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[halo, 3]} />
          </bufferGeometry>
          <pointsMaterial color="#1b1a17" size={0.06} alphaMap={dot} transparent opacity={0.7} depthWrite={false} sizeAttenuation />
        </points>
      </group>

      {/* drifting dust */}
      <points ref={dust}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cloud.p, 3]} />
          <bufferAttribute attach="attributes-color" args={[cloud.c, 3]} />
        </bufferGeometry>
        <pointsMaterial vertexColors size={0.07} alphaMap={dot} transparent depthWrite={false} sizeAttenuation />
      </points>
    </group>
  );
}

export default function HeroScene({ still, lowPower }: { still: boolean; lowPower: boolean }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Stop rendering entirely once the hero is scrolled out of view.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0">
      <Canvas
        dpr={lowPower ? 1 : [1, 1.75]}
        frameloop={still ? "demand" : visible ? "always" : "never"}
        camera={{ position: [0, 0, 7.2], fov: 38 }}
        gl={{ antialias: !lowPower, alpha: true, powerPreference: "high-performance" }}
        aria-hidden
      >
        <hemisphereLight args={["#e8dcf5", "#8d9a5e", 0.9]} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 5, 4]} intensity={2.6} color="#fff1dc" />
        <directionalLight position={[-5, -2, -3]} intensity={1.1} color="#c3b6dd" />
        <pointLight position={[0, -3, 3]} intensity={12} color="#dfb0a8" />
        <Sculpture still={still} lowPower={lowPower} />
      </Canvas>
    </div>
  );
}
