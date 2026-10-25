"use client";

import { useRef } from "react";
import { cssVar, gsap, motionOk, onThemeChange, useGSAP } from "@/lib/gsap";

const GAP = 28;
const SPOTLIGHT = 180;
const DEPTH = 0.25; // the grid scrolls at a quarter of the page speed

/**
 * Page-wide grid of small dots, fixed behind everything. It breathes slowly,
 * drifts slower than the page for depth, and the dots near the pointer grow and
 * turn teal. Static with reduced motion.
 */
export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const animate = window.matchMedia(motionOk).matches;
    const pointer = { x: -9999, y: -9999 };
    const smooth = { x: -9999, y: -9999 };
    let width = 0;
    let height = 0;
    let base = "";
    let accent = "";

    function colors() {
      base = cssVar("--muted-foreground");
      accent = cssVar("--signature");
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(gsap.ticker.time);
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, width, height);
      const shift = animate ? -((window.scrollY * DEPTH) % GAP) : 0;
      const quiet = new Path2D();
      const lit: [number, number, number][] = [];
      for (let y = GAP / 2 + shift; y < height + GAP; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          const wave = animate ? Math.sin(time * 0.8 + x * 0.012 + (y - shift) * 0.018) * 0.35 : 0;
          const near = Math.max(0, 1 - Math.hypot(x - smooth.x, y - smooth.y) / SPOTLIGHT);
          const r = 1 + wave * 0.5 + near * 1.6;
          if (near > 0.15) {
            lit.push([x, y, near]);
          } else {
            quiet.moveTo(x + r, y);
            quiet.arc(x, y, r, 0, Math.PI * 2);
          }
        }
      }
      ctx.globalAlpha = 0.22;
      ctx.fillStyle = base;
      ctx.fill(quiet);
      ctx.fillStyle = accent;
      for (const [x, y, near] of lit) {
        ctx.globalAlpha = 0.22 + near * 0.6;
        ctx.beginPath();
        ctx.arc(x, y, 1 + near * 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function tick(time: number) {
      smooth.x += (pointer.x - smooth.x) * 0.12;
      smooth.y += (pointer.y - smooth.y) * 0.12;
      draw(time);
    }

    colors();
    resize();
    window.addEventListener("resize", resize);
    const stopTheme = onThemeChange(() => {
      colors();
      draw(gsap.ticker.time);
    });

    const move = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      if (smooth.x < -9000) Object.assign(smooth, pointer);
    };
    if (animate) {
      gsap.ticker.add(tick);
      window.addEventListener("pointermove", move);
      gsap.from(canvas, { autoAlpha: 0, duration: 1.6, ease: "power2.out" });
    }

    return () => {
      window.removeEventListener("resize", resize);
      stopTheme();
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", move);
    };
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 size-full [mask-image:radial-gradient(ellipse_120%_100%_at_50%_40%,black_45%,transparent_100%)]"
    />
  );
}
