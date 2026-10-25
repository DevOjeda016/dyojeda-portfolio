"use client";

import { useRef } from "react";
import { cssVar, gsap, motionOk, onThemeChange, useGSAP } from "@/lib/gsap";

type Dot = { x: number; y: number; tone: number; edge: number; sx: number; sy: number; t0: number };

const CELL = 5; // px between dot centres
const REPEL_RADIUS = 110;
const REPEL_FORCE = 26;
const SCAN_EVERY = 7; // seconds between scan sweeps
const SCAN_BAND = 46; // px half-height of the sweep
const ALPHA_STEPS = 4; // dot opacity is bucketed to keep fills batched

/**
 * A halftone of teal dots. Samples `src` (a cut-out photo with alpha; only the
 * figure gets dots) or, without one, the text `fallback`, then draws one dot per
 * cell sized by tone. The dots assemble upward on load, a scan sweeps the figure
 * now and then, and dots near the pointer grow and drift away. With reduced
 * motion it draws once, statically.
 */
export function DotPortrait({
  src,
  fallback,
  label,
}: {
  src: string | null;
  fallback: string;
  label: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const animate = window.matchMedia(motionOk).matches;
    const ease = gsap.parseEase("expo.out");
    const intro = { p: animate ? 0 : 1 };
    const pointer = { x: 0, y: 0, strength: 0 };
    const smooth = { x: 0, y: 0 };
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let color = "";
    let image: HTMLImageElement | null = null;
    let visible = true;
    let time = 0;

    // Sample the source into a grid of tones (0 = smallest dot, 1 = biggest).
    function sample() {
      const cols = Math.floor(width / CELL);
      const rows = Math.floor(height / CELL);
      if (!cols || !rows) return;
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const o = off.getContext("2d", { willReadFrequently: true })!;
      const dark = document.documentElement.classList.contains("dark");

      if (image) {
        // object-fit: contain, anchored to the bottom so the figure stands on the hero's floor.
        const scale = Math.min(cols / image.width, rows / image.height);
        const w = image.width * scale;
        const h = image.height * scale;
        o.drawImage(image, (cols - w) / 2, rows - h, w, h);
      } else {
        o.font = `800 ${rows * 0.62}px ${cssVar("--font-sans") || "sans-serif"}`;
        o.textAlign = "center";
        o.textBaseline = "middle";
        o.fillText(fallback, cols / 2, rows / 2);
      }

      const data = o.getImageData(0, 0, cols, rows).data;
      const count = cols * rows;
      const lum = new Float32Array(count);
      for (let p = 0; p < count; p++) {
        const i = p * 4;
        lum[p] = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
      }

      // Local contrast: push each cell away from its neighbourhood average so
      // features (eyes, glasses, smile) survive the coarse grid.
      const blur = new Float32Array(count);
      const R = 3;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          let sum = 0;
          let n = 0;
          for (let dr = -R; dr <= R; dr++) {
            for (let dc = -R; dc <= R; dc++) {
              const rr = r + dr;
              const cc = c + dc;
              if (rr < 0 || cc < 0 || rr >= rows || cc >= cols || data[(rr * cols + cc) * 4 + 3] < 90) continue;
              sum += lum[rr * cols + cc];
              n++;
            }
          }
          blur[r * cols + c] = n ? sum / n : lum[r * cols + c];
        }
      }
      for (let p = 0; p < count; p++) lum[p] = gsap.utils.clamp(0, 1, lum[p] + 1.4 * (lum[p] - blur[p]));

      // Then equalize over the figure only, so no single region (a light hat,
      // a dark shirt) claims the whole tone range.
      const histogram = new Float32Array(256);
      let figure = 0;
      for (let p = 0; p < count; p++) {
        if (data[p * 4 + 3] < 90) continue;
        histogram[Math.round(lum[p] * 255)]++;
        figure++;
      }
      for (let b = 1; b < 256; b++) histogram[b] += histogram[b - 1];
      const equalize = (value: number) => (figure ? histogram[Math.round(value * 255)] / figure : value);

      // The photo's own crop edges (bottom, sides) dissolve into the page's dot
      // field: dots shrink and thin out with a stable per-cell dither.
      const smoothstep = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
      const fade = (x: number, y: number) =>
        smoothstep((height - y) / (height * 0.32)) *
        smoothstep(x / (width * 0.18)) *
        smoothstep((width - x) / (width * 0.18));
      const dither = (c: number, r: number) => {
        const n = Math.sin(c * 12.9898 + r * 78.233) * 43758.5453;
        return n - Math.floor(n);
      };

      const previous = dots;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          const alpha = data[i + 3] / 255;
          if (alpha < 0.35) continue;
          const x = c * CELL + CELL / 2;
          const y = r * CELL + CELL / 2;
          let tone = 1;
          let edge = Math.min(1, (alpha - 0.35) / 0.5);
          if (image) {
            const value = equalize(lum[r * cols + c]);
            // Light ground: shadows get the big dots. Dark ground: highlights glow.
            // On light ground mid-tones are lifted so light skin still shades.
            const raw = dark ? value : (1 - value) ** 0.6;
            // A floor keeps the whole silhouette legible.
            tone = 0.16 + 0.84 * raw;
            const f = fade(x, y);
            if (dither(c, r) > f * 1.3) continue;
            edge *= 0.3 + 0.7 * f;
          }
          const prev = previous[dots.length];
          dots.push({
            x,
            y,
            tone,
            edge,
            sx: prev?.sx ?? x + gsap.utils.random(-40, 40),
            sy: prev?.sy ?? height + gsap.utils.random(20, height * 0.5),
            // Rows lower down arrive first, so the figure builds upward.
            t0: (1 - y / height) * 0.45 + gsap.utils.random(0, 0.12),
          });
        }
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      color = cssVar("--signature");
      sample();
      draw();
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      const maxR = CELL * 0.5;
      const span = 1 - 0.57;
      // The scan band travels from above the figure to below it, then rests.
      const phase = (time % SCAN_EVERY) / 2.2;
      const scanY = phase <= 1 ? -SCAN_BAND + phase * (height + SCAN_BAND * 2) : -9999;
      const paths = Array.from({ length: ALPHA_STEPS }, () => new Path2D());

      for (const d of dots) {
        const local = ease(gsap.utils.clamp(0, 1, (intro.p - d.t0) / span));
        if (local <= 0) continue;
        let x = d.sx + (d.x - d.sx) * local;
        let y = d.sy + (d.y - d.sy) * local;
        let grow = 0;
        if (pointer.strength > 0.01) {
          const dx = x - smooth.x;
          const dy = y - smooth.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_RADIUS && dist > 0) {
            const near = (1 - dist / REPEL_RADIUS) ** 2 * pointer.strength;
            x += (dx / dist) * near * REPEL_FORCE;
            y += (dy / dist) * near * REPEL_FORCE;
            grow += near * 0.5;
          }
        }
        const scan = Math.max(0, 1 - Math.abs(y - scanY) / SCAN_BAND);
        grow += scan * scan * 0.45;
        const r = Math.min(maxR, Math.max(0.55, (d.tone + grow) * maxR * d.edge * local));
        const bucket = Math.min(ALPHA_STEPS - 1, Math.floor((0.35 + d.tone * 0.65 + scan * 0.3) * ALPHA_STEPS));
        paths[bucket].moveTo(x + r, y);
        paths[bucket].arc(x, y, r, 0, Math.PI * 2);
      }
      paths.forEach((path, i) => {
        ctx.globalAlpha = (i + 1) / ALPHA_STEPS;
        ctx.fill(path);
      });
      ctx.globalAlpha = 1;
    }

    function tick(t: number) {
      time = t;
      smooth.x += (pointer.x - smooth.x) * 0.18;
      smooth.y += (pointer.y - smooth.y) * 0.18;
      if (visible) draw();
    }

    function load() {
      if (!src) return resize();
      const img = new Image();
      img.onload = () => {
        image = img;
        resize();
      };
      img.onerror = () => resize();
      img.src = src;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const stopTheme = onThemeChange(resize);
    document.fonts.ready.then(() => !src && resize());
    load();

    let move: ((e: PointerEvent) => void) | undefined;
    let leave: (() => void) | undefined;
    if (animate) {
      gsap.to(intro, { p: 1, duration: 2.4, delay: 0.5, ease: "none" });
      gsap.ticker.add(tick);
      move = (e) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
        if (pointer.strength === 0) Object.assign(smooth, { x: pointer.x, y: pointer.y });
        gsap.to(pointer, { strength: 1, duration: 0.4, overwrite: "auto" });
      };
      leave = () => gsap.to(pointer, { strength: 0, duration: 0.9, ease: "power2.out", overwrite: "auto" });
      canvas.addEventListener("pointermove", move);
      canvas.addEventListener("pointerleave", leave);
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      stopTheme();
      gsap.ticker.remove(tick);
      if (move) canvas.removeEventListener("pointermove", move);
      if (leave) canvas.removeEventListener("pointerleave", leave);
    };
  }, [src, fallback]);

  return <canvas ref={canvasRef} role="img" aria-label={label} className="size-full" />;
}
