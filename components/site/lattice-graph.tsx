"use client";

import { useRef } from "react";
import { cssVar, gsap, motionOk, onThemeChange, useGSAP } from "@/lib/gsap";

type Node = { x: number; y: number; links: number[] };
type Pulse = { from: number; to: number; t: number; speed: number };

const SPACING = 46;
const JITTER = 9;
const REACH = 150; // px around the pointer that pulls and lights nodes
const PULL = 16;
const PULSES = 5;

// Deterministic randomness so the lattice keeps its shape across resizes.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A lattice of nodes and links for the Lattice Systems card. Teal pulses travel
 * the links like signals between services; nodes near the pointer (tracked on
 * the closest [data-lattice] ancestor) lean toward it and light up. Static with
 * reduced motion; paused offscreen.
 */
export function LatticeGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const host = canvas.closest<HTMLElement>("[data-lattice]") ?? canvas;
    const animate = window.matchMedia(motionOk).matches;
    const pointer = { x: 0, y: 0, strength: 0 };
    const smooth = { x: 0, y: 0 };
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];
    let width = 0;
    let height = 0;
    let visible = true;
    let colors = { line: "", node: "", accent: "" };

    function build() {
      const random = seeded(7);
      const cols = Math.ceil(width / SPACING) + 1;
      const rows = Math.ceil(height / SPACING) + 1;
      nodes = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          nodes.push({
            x: c * SPACING + (random() - 0.5) * JITTER * 2,
            y: r * SPACING + (random() - 0.5) * JITTER * 2,
            links: [],
          });
        }
      }
      const link = (a: number, b: number) => {
        nodes[a].links.push(b);
        nodes[b].links.push(a);
      };
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          if (c < cols - 1 && random() > 0.18) link(i, i + 1);
          if (r < rows - 1 && random() > 0.18) link(i, i + cols);
          if (c < cols - 1 && r < rows - 1 && random() > 0.72) link(i, i + cols + 1);
        }
      }
      const connected = nodes.flatMap((n, i) => (n.links.length ? [i] : []));
      pulses = Array.from({ length: PULSES }, () => {
        const from = connected[Math.floor(random() * connected.length)];
        return { from, to: nodes[from].links[0], t: random(), speed: 0.6 + random() * 0.6 };
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      colors = { line: cssVar("--muted-foreground"), node: cssVar("--muted-foreground"), accent: cssVar("--signature") };
      build();
      draw();
    }

    // Where a node sits right now, and how lit it is, given the pointer.
    function place(n: Node): [number, number, number] {
      if (pointer.strength < 0.01) return [n.x, n.y, 0];
      const dx = smooth.x - n.x;
      const dy = smooth.y - n.y;
      const dist = Math.hypot(dx, dy);
      if (dist > REACH || dist === 0) return [n.x, n.y, 0];
      const near = (1 - dist / REACH) ** 2 * pointer.strength;
      return [n.x + (dx / dist) * near * PULL, n.y + (dy / dist) * near * PULL, near];
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      const placed = nodes.map(place);

      // Links: one quiet batch, then the lit ones on top.
      const quiet = new Path2D();
      ctx.lineWidth = 1;
      nodes.forEach((n, i) => {
        for (const j of n.links) {
          if (j < i) continue;
          const lit = Math.min(placed[i][2], placed[j][2]);
          if (lit > 0.05) continue;
          quiet.moveTo(placed[i][0], placed[i][1]);
          quiet.lineTo(placed[j][0], placed[j][1]);
        }
      });
      ctx.strokeStyle = colors.line;
      ctx.globalAlpha = 0.3;
      ctx.stroke(quiet);
      ctx.globalAlpha = 1;
      ctx.strokeStyle = colors.accent;
      nodes.forEach((n, i) => {
        for (const j of n.links) {
          if (j < i) continue;
          const lit = Math.min(placed[i][2], placed[j][2]);
          if (lit <= 0.05) continue;
          ctx.globalAlpha = 0.25 + lit * 0.75;
          ctx.beginPath();
          ctx.moveTo(placed[i][0], placed[i][1]);
          ctx.lineTo(placed[j][0], placed[j][1]);
          ctx.stroke();
        }
      });

      // Nodes.
      for (const [x, y, lit] of placed) {
        ctx.globalAlpha = lit > 0.05 ? 0.5 + lit * 0.5 : 0.45;
        ctx.fillStyle = lit > 0.05 ? colors.accent : colors.node;
        ctx.beginPath();
        ctx.arc(x, y, 1.4 + lit * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Pulses with a short trail along their link.
      ctx.fillStyle = colors.accent;
      ctx.strokeStyle = colors.accent;
      for (const p of pulses) {
        const [ax, ay] = placed[p.from];
        const [bx, by] = placed[p.to];
        const x = ax + (bx - ax) * p.t;
        const y = ay + (by - ay) * p.t;
        const tail = Math.max(0, p.t - 0.7);
        const gradient = ctx.createLinearGradient(ax + (bx - ax) * tail, ay + (by - ay) * tail, x, y);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, colors.accent);
        ctx.globalAlpha = 0.9;
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ax + (bx - ax) * tail, ay + (by - ay) * tail);
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1;
    }

    function tick(...[, delta]: [number, number]) {
      if (!visible) return;
      smooth.x += (pointer.x - smooth.x) * 0.14;
      smooth.y += (pointer.y - smooth.y) * 0.14;
      const step = delta / 1000;
      for (const p of pulses) {
        p.t += p.speed * step;
        if (p.t < 1) continue;
        // Arrived: hop to another link, never straight back.
        const options = nodes[p.to].links.filter((n) => n !== p.from);
        const next = options.length ? options[Math.floor(Math.random() * options.length)] : p.from;
        p.from = p.to;
        p.to = next;
        p.t = 0;
      }
      draw();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const stopTheme = onThemeChange(resize);

    const move = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      if (pointer.strength === 0) Object.assign(smooth, { x: pointer.x, y: pointer.y });
      gsap.to(pointer, { strength: 1, duration: 0.5, overwrite: "auto" });
    };
    const leave = () => gsap.to(pointer, { strength: 0, duration: 1.1, ease: "power2.out", overwrite: "auto" });
    if (animate) {
      gsap.ticker.add(tick);
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerleave", leave);
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      stopTheme();
      gsap.ticker.remove(tick);
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  });

  return <canvas ref={canvasRef} aria-hidden className="size-full" />;
}
