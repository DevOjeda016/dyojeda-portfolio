"use client";

import { useRef, type ReactNode } from "react";
import { gsap, motionOk, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

/**
 * Owns the page's GSAP choreography, driven by data attributes in the markup:
 * - [data-header]: the header slides down as the page opens.
 * - [data-hero-name]: the name enters letter by letter, then the teal dot drops in.
 * - [data-hero-fade]: hero copy and actions rise out of a blur after the name.
 * - [data-parallax="n"]: drifts n% of its height while its section scrolls away.
 * - [data-reveal]: section headings brighten word by word as they scroll in.
 * - [data-row]: rows rise in batches; ="clip" wipes up from a mask (projects),
 *   ="slide" slides in from the timeline rail (experience).
 * - [data-draw]: a line that draws itself top to bottom with scroll.
 * - [data-pop]: children pop in with a stagger (chips, socials).
 * - [data-expand]: a card that opens from an inset clip as it scrolls in.
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
        gsap.from("[data-header]", { yPercent: -100, duration: 1, ease: "expo.out", delay: 0.05 });
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
              yPercent: 90,
              rotate: 6,
              autoAlpha: 0,
              filter: "blur(12px)",
              stagger: 0.05,
              duration: 1.1,
            })
            .from(dot, { yPercent: -420, autoAlpha: 0, duration: 0.9, ease: "bounce.out" }, "-=0.6")
            .from(
              "[data-hero-fade]",
              { y: 32, autoAlpha: 0, filter: "blur(8px)", stagger: 0.12, duration: 1.1 },
              "-=0.75"
            );
        }

        // Hero layers drift apart as the hero scrolls away.
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          gsap.to(el, {
            yPercent: Number(el.dataset.parallax) || 0,
            ease: "none",
            scrollTrigger: { trigger: el.closest("section"), start: "top top", end: "bottom top", scrub: true },
          });
        });

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

        // Rows enter in groups, each kind with its own gesture.
        const rows = [
          {
            selector: '[data-row]:not([data-row="clip"]):not([data-row="slide"])',
            from: { autoAlpha: 0, y: 32, filter: "blur(6px)" },
            to: { autoAlpha: 1, y: 0, filter: "blur(0px)" },
          },
          {
            selector: '[data-row="clip"]',
            from: { clipPath: "inset(0% 0% 100% 0%)", y: 40 },
            to: { clipPath: "inset(0% 0% 0% 0%)", y: 0 },
          },
          {
            selector: '[data-row="slide"]',
            from: { autoAlpha: 0, x: -28 },
            to: { autoAlpha: 1, x: 0 },
          },
        ];
        for (const { selector, from, to } of rows) {
          gsap.set(selector, from);
          ScrollTrigger.batch(selector, {
            start: "top 88%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, { ...to, stagger: 0.12, duration: 1.1, ease: "expo.out", clearProps: "clipPath,filter" }),
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-draw]").forEach((line) => {
          gsap.from(line, {
            scaleY: 0,
            transformOrigin: "top",
            ease: "none",
            scrollTrigger: { trigger: line.parentElement, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
          });
        });

        // Explicit end values: `from` would read a mid-transition state when the
        // effect re-runs (StrictMode, HMR) on items that carry CSS transitions.
        gsap.utils.toArray<HTMLElement>("[data-pop]").forEach((list) => {
          gsap.fromTo(
            list.children,
            { autoAlpha: 0, scale: 0.7, y: 12 },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              stagger: 0.035,
              duration: 0.7,
              ease: "back.out(2)",
              clearProps: "transform,scale",
              scrollTrigger: { trigger: list, start: "top 90%", once: true },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-expand]").forEach((card) => {
          gsap.from(card, {
            clipPath: "inset(12% 8% 12% 8% round 18px)",
            ease: "none",
            scrollTrigger: { trigger: card, start: "top 95%", end: "top 45%", scrub: 0.6 },
          });
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
