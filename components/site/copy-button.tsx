"use client";

import { useEffect, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Copies `value` to the clipboard and confirms in place for two seconds. */
export function CopyButton({
  value,
  label,
  done,
  className,
}: {
  value: string;
  label: string;
  done: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={() => navigator.clipboard.writeText(value).then(() => setCopied(true), () => {})}
      className={cn(
        "inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 font-mono text-xs text-muted-foreground transition-colors duration-300 hover:border-signature/50 hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-none",
        className
      )}
    >
      {copied ? <Check aria-hidden className="size-3.5 text-signature" /> : <Copy aria-hidden className="size-3.5" />}
      <span aria-live="polite">{copied ? done : label}</span>
    </button>
  );
}
