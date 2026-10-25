"use client";

import { useRef, type ReactNode } from "react";
import { gsap, motionOk, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Owns the page's GSAP choreography, driven by data attributes in the markup:
 * - [data-hero-name]: the name enters letter by letter, then the teal dot drops in.
 * - [data-hero-fade]: hero copy and actions fade up after the name.
 * - [data-reveal]: section headings brighten word by word as they scroll in.
 * - [data-row]: project/experience rows rise in batches.
 * - [data-magnetic]: buttons lean toward a fine pointer.
 * Everything is skipped with reduced motion; the markup is complete without it.
 */
export function PageMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(motionOk, () => {
        // Hero intro
        const name = scope.current!.querySelector<HTMLElement>("[data-hero-name]");
        if (name) {
          const split = SplitText.create(name, { type: "chars", smartWrap: true });
          // The split char inside the dot's span (inline spans ignore transforms).
          const dot = name.querySelector("[data-dot] > *") ?? name.querySelector("[data-dot]");
          const letters = split.chars.filter((c) => !c.closest("[data-dot]"));
          gsap
            .timeline({ delay: 0.15, defaults: { ease: "expo.out" } })
            .set([name, "[data-hero-fade]"], { visibility: "visible" })
            .from(letters, {
              yPercent: 70,
              autoAlpha: 0,
              filter: "blur(10px)",
              stagger: 0.045,
              duration: 1,
            })
            .from(dot, { yPercent: -420, autoAlpha: 0, duration: 0.9, ease: "bounce.out" }, "-=0.55")
            .from(
              "[data-hero-fade]",
              { y: 24, autoAlpha: 0, stagger: 0.08, duration: 0.9 },
              "-=0.7"
            );
        }

        // Headings: words go from faint to solid while they cross the lower viewport.
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((heading) => {
          const split = SplitText.create(heading, { type: "words" });
          gsap.from(split.words, {
            autoAlpha: 0.12,
            yPercent: 25,
            filter: "blur(6px)",
            stagger: 0.12,
            ease: "none",
            scrollTrigger: { trigger: heading, start: "top 88%", end: "top 50%", scrub: 0.6 },
          });
        });

        // Rows rise in groups as they enter.
        gsap.set("[data-row]", { autoAlpha: 0, y: 32 });
        ScrollTrigger.batch("[data-row]", {
          start: "top 88%",
          once: true,
          onEnter: (rows) =>
            gsap.to(rows, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.9, ease: "expo.out" }),
        });
      });

      mm.add(`${motionOk} and (pointer: fine)`, () => {
        const cleanups = gsap.utils.toArray<HTMLElement>("[data-magnetic]").map((el) => {
          const x = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
          const y = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            x((e.clientX - (r.left + r.width / 2)) * 0.3);
            y((e.clientY - (r.top + r.height / 2)) * 0.3);
          };
          const leave = () => {
            gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          };
        });
        return () => cleanups.forEach((fn) => fn());
      });
    },
    { scope }
  );

  return <div ref={scope} className="contents">{children}</div>;
}
