"use client";

import { useRef } from "react";
import { cssVar, gsap, motionOk, onThemeChange, useGSAP } from "@/lib/gsap";

type Dot = { x: number; y: number; tone: number; sx: number; sy: number; t0: number };

const CELL = 9; // px between dot centres
const REPEL_RADIUS = 90;
const REPEL_FORCE = 22;

/**
 * A halftone of teal dots. Samples `src` (a photo) or, without one, the text
 * `fallback`, then draws one dot per cell sized by tone. Dots fly in on load and
 * drift away from the pointer; with reduced motion it draws once, statically.
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
    const pointer = { x: -9999, y: -9999, active: false };
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let color = "";
    let image: HTMLImageElement | null = null;
    let visible = true;

    // Sample the source into a grid of tones (0 = no dot, 1 = biggest dot).
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
        // object-fit: cover
        const scale = Math.max(cols / image.width, rows / image.height);
        const w = image.width * scale;
        const h = image.height * scale;
        o.drawImage(image, (cols - w) / 2, (rows - h) / 2, w, h);
      } else {
        o.fillStyle = "#fff";
        o.fillRect(0, 0, cols, rows);
        o.fillStyle = "#000";
        o.font = `800 ${rows * 0.62}px ${cssVar("--font-sans") || "sans-serif"}`;
        o.textAlign = "center";
        o.textBaseline = "middle";
        o.fillText(fallback, cols / 2, rows / 2);
      }

      const data = o.getImageData(0, 0, cols, rows).data;
      const previous = dots;
      dots = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          // Light ground: dark areas get dots. Dark ground: light areas glow.
          const raw = image && dark ? lum : 1 - lum;
          const tone = gsap.utils.clamp(0, 1, (raw - 0.12) / 0.78);
          if (tone < 0.06) continue;
          const x = c * CELL + CELL / 2;
          const y = r * CELL + CELL / 2;
          const prev = previous[dots.length];
          dots.push({
            x,
            y,
            tone,
            sx: prev?.sx ?? gsap.utils.random(-width * 0.3, width * 1.3),
            sy: prev?.sy ?? gsap.utils.random(-height * 0.3, height * 1.3),
            t0: gsap.utils.random(0, 0.35),
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
      const maxR = CELL * 0.48;
      for (const d of dots) {
        const local = ease(gsap.utils.clamp(0, 1, (intro.p - d.t0) / (1 - 0.35)));
        let x = d.sx + (d.x - d.sx) * local;
        let y = d.sy + (d.y - d.sy) * local;
        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPEL_RADIUS && dist > 0) {
            const push = (1 - dist / REPEL_RADIUS) ** 2 * REPEL_FORCE;
            x += (dx / dist) * push;
            y += (dy / dist) * push;
          }
        }
        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.6, d.tone * maxR), 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function tick() {
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
      gsap.to(intro, { p: 1, duration: 2.2, delay: 0.4, ease: "none" });
      gsap.ticker.add(tick);
      move = (e) => {
        const rect = canvas.getBoundingClientRect();
        pointer.x = e.clientX - rect.left;
        pointer.y = e.clientY - rect.top;
        pointer.active = true;
      };
      leave = () => (pointer.active = false);
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
