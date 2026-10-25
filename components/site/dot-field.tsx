"use client";

import { useRef } from "react";
import { cssVar, gsap, motionOk, onThemeChange, useGSAP } from "@/lib/gsap";

const GAP = 28;
const SPOTLIGHT = 180;

/**
 * Background grid of small dots behind the hero. It breathes slowly and the dots
 * near the pointer grow and turn teal. Static with reduced motion; paused offscreen.
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
    let visible = true;

    function colors() {
      base = cssVar("--muted-foreground");
      accent = cssVar("--signature");
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, width, height);
      for (let y = GAP / 2; y < height; y += GAP) {
        for (let x = GAP / 2; x < width; x += GAP) {
          const wave = animate ? Math.sin(time * 0.8 + x * 0.012 + y * 0.018) * 0.35 : 0;
          const dist = Math.hypot(x - smooth.x, y - smooth.y);
          const near = Math.max(0, 1 - dist / SPOTLIGHT);
          ctx.globalAlpha = 0.22 + near * 0.6;
          ctx.fillStyle = near > 0.15 ? accent : base;
          ctx.beginPath();
          ctx.arc(x, y, 1 + wave * 0.5 + near * 1.6, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    function tick(time: number) {
      if (!visible) return;
      smooth.x += (pointer.x - smooth.x) * 0.12;
      smooth.y += (pointer.y - smooth.y) * 0.12;
      draw(time);
    }

    colors();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(canvas);
    const stopTheme = onThemeChange(() => {
      colors();
      draw(gsap.ticker.time);
    });

    const move = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      if (smooth.x < -9000) Object.assign(smooth, pointer);
    };
    if (animate) {
      gsap.ticker.add(tick);
      window.addEventListener("pointermove", move);
      gsap.from(canvas, { autoAlpha: 0, duration: 1.6, ease: "power2.out" });
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      stopTheme();
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", move);
    };
  });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full [mask-image:radial-gradient(ellipse_at_60%_45%,black_30%,transparent_75%)]"
    />
  );
}
