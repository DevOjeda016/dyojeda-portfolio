import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Section heading. Its words brighten in on scroll via [data-reveal] (see PageMotion).
export function RevealHeading({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      data-reveal
      className={cn("text-4xl font-bold tracking-[-0.03em] sm:text-6xl", className)}
    >
      {children}
    </h2>
  );
}
