"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle({ label }: { label: string }) {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {}
  }

  // Both icons render; CSS shows the right one so server and client markup match.
  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className="rounded-full"
      onClick={toggle}
      aria-label={label}
      title={label}
    >
      <Sun className="hidden dark:block" />
      <Moon className="dark:hidden" />
    </Button>
  );
}
