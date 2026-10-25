import type { Dictionary } from "./es";

// English content. Real data only: never invent clients, metrics or projects.
export const en: Dictionary = {
  meta: {
    title: "dy.ojeda — Backend & Full-Stack Developer",
    description: "Portfolio of Daniel Ojeda, a Backend & Full-Stack developer based in León, Mexico.",
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
      "I design and build the systems behind the product: APIs, data and infrastructure, and the interface too when it's needed.",
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
      "I work in digital banking and come from IT consulting. I've led the migration and merge of critical systems and shipped AI to production with RAG and open-weight models. I'm studying Software Development and Management Engineering at Universidad Tecnológica de León.",
    ],
  },
  projects: {
    title: "Projects",
    viewLabel: "View project",
    more: "See everything on GitHub",
    kinds: { private: "Private", code: "Code", demo: "Live demo" },
    items: [
      {
        slug: "spaceia-ms-ai",
        name: "SpaceIA · Information point",
        description:
          "The smart information point of Universidad Tecnológica de León. As lead developer, I built its AI microservice: it answers institutional questions with RAG over PDFs normalized with Docling, with swappable LLMs and embeddings (Groq, OpenAI, Gemini or local), plus a KDD pipeline that segments student queries.",
        stack: ["Python", "FastAPI", "LangChain", "ChromaDB", "Docling"],
        href: "",
      },
      {
        slug: "spaceia-landing",
        name: "SpaceIA · Commercial platform",
        description:
          "Public site, client portal and admin panel in one app: quotes, clients, products, costing, suppliers, purchasing, reviews and support. I built the frontend and much of the API, with Clean Architecture.",
        stack: ["Angular", "ASP.NET Core", "PostgreSQL", "Docker"],
        href: "https://spaceai-landing-web-frontend.vercel.app",
      },
      {
        slug: "muebles-roble",
        name: "Muebles Roble · ERP",
        description:
          "A team-built ERP for a furniture maker's production process. I built the suppliers, purchasing, bill of materials (BOM), sales, materials, costs, audit and dashboard modules.",
        stack: ["Python", "Flask", "SQLAlchemy", "MySQL"],
        href: "https://github.com/lattice-systems/muebles-roble-diseno-app",
      },
      {
        slug: "docs-classifier",
        name: "Document classifier",
        description:
          "An API that takes PDFs, extracts their text with AI-based OCR, classifies the documents and splits files that bundle several records into one.",
        stack: ["Python", "FastAPI", "OCR"],
        href: "https://github.com/DevOjeda016/docs-classifier",
      },
      {
        slug: "zarape-springboot",
        name: "El Zarape",
        description:
          "Migration of a JAX-RS API built on MySQL stored procedures to Spring Boot 3 with JPA and JWT, with a React frontend and a Docker dev environment.",
        stack: ["Java", "Spring Boot", "MySQL", "React", "Docker"],
        href: "https://github.com/DevOjeda016/zarape-springboot",
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
        description: "Remote consulting. Spring Boot and Scrum.",
        highlights: [
          "Worked in a team to build a bonus calculation system for insurance agents across 8 Mexican insurers.",
          "Designed the KPI and metrics logic, and a recommendation engine that steers agents toward meeting their incentives.",
        ],
      },
    ],
  },
  stack: {
    title: "Stack",
    groups: [
      {
        name: "Backend",
        items: ["Java", "Spring Boot", "C# · ASP.NET", "PHP", "Laravel", "NestJS", "Python", "FastAPI", "SOAP"],
      },
      { name: "Frontend", items: ["TypeScript", "Vue 3", "Angular", "React", "Next.js"] },
      { name: "AI", items: ["RAG", "LangChain", "ChromaDB", "Docling", "Open-weight models"] },
      {
        name: "Data & infrastructure",
        items: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Docker", "GitHub Actions", "Azure", "Vercel", "Linux"],
      },
    ],
  },
  lattice: {
    title: "Lattice Systems",
    body: "Alongside my work as a developer, I'm building Lattice Systems: software consulting and development for teams that need solid systems.",
    tags: ["Software consulting", "Custom development"],
    cta: "Visit latticesystems.dev",
  },
  contact: {
    title: "Let's work together",
    body: "Write to me about a role, a project or an idea. I reply in Spanish or English.",
    email: "danielojeda.dev@outlook.com",
    emailPlaceholder: "",
    copy: "Copy email",
    copied: "Copied",
    socials: "Elsewhere",
  },
  footer: {
    prompt: "~/dy.ojeda $ exit",
    tagline: "Backend & Full-Stack developer based in León, Mexico.",
    site: "Site",
    elsewhere: "Elsewhere",
    backToTop: "Back to top",
    built: "Built with Next.js, GSAP and a lot of dots.",
  },
};
