import type { Dictionary } from "./es";

// English content. Everything marked "Replace" is a placeholder:
// swap it for real data before publishing (never invent clients or metrics).
export const en: Dictionary = {
  meta: {
    title: "dy.ojeda — Backend & Full-Stack Developer",
    description: "Portfolio of Daniel Ojeda, Backend & Full-Stack developer.",
  },
  nav: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact",
    otherLang: "ES",
    otherLangLabel: "View in Spanish",
    themeLabel: "Toggle light or dark theme",
  },
  hero: {
    prompt: "~/dy.ojeda $ whoami",
    role: "Backend & Full-Stack Developer",
    pitch:
      "I design and build the systems behind the product: APIs, data and infrastructure, plus the interface when it's needed.",
    primaryCta: "Contact me",
    secondaryCta: "View projects",
    portraitLabel: "Portrait of Daniel Ojeda made of dots",
  },
  building: {
    label: "Currently building",
    name: "Lattice Systems",
    description: "Software consulting and custom development.",
    status: "in progress",
  },
  about: {
    title: "About",
    body: [
      "I'm a software developer based in León, Mexico. I focus on the backend: APIs, integrations and databases, and I build the interface too when the project calls for it.",
      "I come from IT consulting and digital banking, where I've led the migration and merge of critical systems and shipped AI to production with RAG and open-weight models. I'm studying Software Development and Management Engineering at Universidad Tecnológica de León.",
    ],
  },
  projects: {
    title: "Projects",
    viewLabel: "View project",
    more: "See everything on GitHub",
    items: [
      {
        name: "SpaceAI",
        description:
          "An AI and IoT ecosystem that answers questions about university schedules: a KDD pipeline to segment and model student queries, Docling-based RAG preprocessing for mixed PDFs and a FastAPI NLP microservice that stores the queries.",
        stack: ["Python", "FastAPI", "RAG", "Docling", "NLP"],
        href: "",
      },
      {
        name: "Furniture store ERP",
        description:
          "A team-built ERP. I built the suppliers, purchasing, bill of materials (BOM), sales, materials, costs, audit and dashboard modules.",
        stack: ["Backend", "ERP"],
        href: "",
      },
      {
        name: "Document classifier",
        description:
          "An API that takes PDFs, extracts their text with AI-based OCR, classifies the documents and splits files that bundle several documents into one.",
        stack: ["Python", "FastAPI", "OCR"],
        href: "https://github.com/DevOjeda016/docs-classifier",
      },
      {
        name: "El Zarape",
        description:
          "Migration of a JAX-RS API built on MySQL stored procedures to Spring Boot 3 with JPA and JWT, with a React frontend and a Docker dev environment.",
        stack: ["Java", "Spring Boot", "MySQL", "React", "Docker"],
        href: "https://github.com/DevOjeda016/zarape-springboot",
      },
      {
        name: "Authentication system",
        description:
          "A sign-up and login Web API with ASP.NET Core Identity and JWT on SQL Server, with an Angular client.",
        stack: ["C#", ".NET 9", "SQL Server", "Angular"],
        href: "https://github.com/DevOjeda016/auth-system-api",
      },
      {
        name: "SmartGreenhouse",
        description:
          "An Android app for managing greenhouses: real-time sensor readings, charts, admin-set thresholds and an AI assistant.",
        stack: ["Java", "Android", "Material 3"],
        href: "https://github.com/DevOjeda016/SmartGreenhouseApp",
      },
    ],
  },
  experience: {
    title: "Experience",
    items: [
      {
        period: "Mar 2026 — Now",
        role: "Software Developer",
        company: "Banco del Bajío",
        description:
          "Digital Operations department. Laravel, .NET, Vue 3, Angular, SQL Server, MySQL and SAP SOAP services.",
        highlights: [
          "Redesigned the legacy HR records system with an AI module (open-weight model + RAG) that classifies and standardizes candidate and employee documents across Mexico's regional offices: ~7,000 active and 11,000 inactive records, with SAP as the master data source.",
          "Led the merge of credit and employment records, previously in two separate databases, into a single platform, with cleanup, standardization and file migration jobs for ~21,000 people.",
          "Integrated the system with Teamtailor so recruiters manage candidate documents directly in the internal repository.",
          "Built an internal RAG assistant that answers HR questions about processes and policies.",
        ],
      },
      {
        period: "Apr 2025 — Jul 2025",
        role: "Backend Developer",
        company: "Quarksoft",
        description: "Remote consulting. Spring Boot, Scrum.",
        highlights: [
          "Built, as part of a team, a bonus calculation system for insurance agents that works with 8 Mexican insurers.",
          "Designed the KPI and metrics logic and a recommendation engine that steers agents toward meeting their incentives.",
        ],
      },
    ],
  },
  stack: {
    title: "Stack",
    groups: [
      {
        name: "Backend",
        items: ["Java · Spring Boot", "C# · ASP.NET", "PHP · Laravel", "Node · NestJS", "Python · FastAPI"],
      },
      { name: "Frontend", items: ["Vue 3", "Angular", "React", "Next.js"] },
      {
        name: "Data & infrastructure",
        items: ["SQL Server · MySQL · PostgreSQL", "MongoDB · Redis", "Docker · GitHub Actions", "Azure · Vercel · Linux"],
      },
    ],
  },
  lattice: {
    title: "Lattice Systems",
    body: "Alongside my work as a developer, I'm building Lattice Systems: software consulting and development for teams that need solid systems.",
    cta: "Visit latticesystems.dev",
  },
  contact: {
    title: "Let's work together",
    body: "Write to me about a role, a project or an idea. I reply in Spanish or English.",
    email: "danielojeda.dev@outlook.com",
    emailPlaceholder: "",
    socials: "Elsewhere",
  },
  footer: {
    built: "Built with Next.js and shadcn/ui.",
  },
};
