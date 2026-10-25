import type { CSSProperties } from "react";
import {
  BrainCircuit,
  Cloud,
  Cpu,
  Database,
  FileScan,
  Layers,
  Network,
  ScanText,
  type LucideIcon,
} from "lucide-react";
import {
  siAngular,
  siDocker,
  siDotnet,
  siFastapi,
  siFlask,
  siGithubactions,
  siLangchain,
  siLaravel,
  siLinux,
  siMongodb,
  siMysql,
  siNestjs,
  siNextdotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siRedis,
  siSpringboot,
  siSqlalchemy,
  siTypescript,
  siVercel,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

// Brand logos from simple-icons; concepts and brands it no longer ships
// (Microsoft, Oracle's Java) fall back to a lucide glyph.
const icons: Record<string, SimpleIcon | LucideIcon> = {
  Java: siOpenjdk,
  "Spring Boot": siSpringboot,
  "C# · ASP.NET": siDotnet,
  "ASP.NET Core": siDotnet,
  PHP: siPhp,
  Laravel: siLaravel,
  NestJS: siNestjs,
  Python: siPython,
  FastAPI: siFastapi,
  Flask: siFlask,
  SQLAlchemy: siSqlalchemy,
  SOAP: Network,
  TypeScript: siTypescript,
  "Vue 3": siVuedotjs,
  Angular: siAngular,
  React: siReact,
  "Next.js": siNextdotjs,
  RAG: BrainCircuit,
  LangChain: siLangchain,
  ChromaDB: Layers,
  Docling: FileScan,
  OCR: ScanText,
  "Modelos de peso abierto": Cpu,
  "Open-weight models": Cpu,
  "SQL Server": Database,
  MySQL: siMysql,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  Redis: siRedis,
  Docker: siDocker,
  "GitHub Actions": siGithubactions,
  Azure: Cloud,
  Vercel: siVercel,
  Linux: siLinux,
};

const isSimple = (icon: SimpleIcon | LucideIcon): icon is SimpleIcon => "path" in icon;

/** Relative luminance of a hex colour, to drop brand colours that vanish on a dark ground. */
function luminance(hex: string) {
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.04045) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * The brand colour a logo takes on hover (as `--brand`), or nothing for
 * near-black marks and lucide fallbacks, which hover to the teal signature.
 */
export function brandStyle(name: string): CSSProperties | undefined {
  const icon = icons[name];
  if (!icon || !isSimple(icon) || luminance(icon.hex) < 0.04) return undefined;
  return { "--brand": `#${icon.hex}` } as CSSProperties;
}

export function TechIcon({ name, className }: { name: string; className?: string }) {
  const icon = icons[name];
  if (!icon) return null;
  if (!isSimple(icon)) {
    const Icon = icon;
    return <Icon aria-hidden className={cn("size-5", className)} />;
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={cn("size-5", className)}>
      <path d={icon.path} />
    </svg>
  );
}
