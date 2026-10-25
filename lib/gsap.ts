"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

// Register every plugin once, before any component uses it.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export const motionOk = "(prefers-reduced-motion: no-preference)";

/** Reads a CSS custom property from <html> (theme tokens live there). */
export function cssVar(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

/** Calls `fn` whenever the light/dark class on <html> changes. */
export function onThemeChange(fn: () => void) {
  const observer = new MutationObserver(fn);
  observer.observe(document.documentElement, { attributeFilter: ["class"] });
  return () => observer.disconnect();
}

export { gsap, ScrollTrigger, SplitText, useGSAP };
