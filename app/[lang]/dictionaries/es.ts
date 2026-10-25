// Contenido en español. Solo datos reales: no inventes clientes, métricas ni proyectos.
export const es = {
  meta: {
    title: "dy.ojeda — Desarrollador Backend & Full-Stack",
    description:
      "Portafolio de Daniel Ojeda, desarrollador Backend & Full-Stack en León, Guanajuato.",
  },
  nav: {
    about: "Sobre mí",
    projects: "Proyectos",
    experience: "Experiencia",
    contact: "Contacto",
    otherLang: "EN",
    otherLangLabel: "Ver en inglés",
    themeLabel: "Cambiar tema claro u oscuro",
  },
  hero: {
    prompt: "~/dy.ojeda $ whoami",
    role: "Desarrollador Backend & Full-Stack",
    pitch:
      "Diseño y construyo los sistemas detrás del producto: APIs, datos e infraestructura, y también la interfaz cuando hace falta.",
    primaryCta: "Contáctame",
    secondaryCta: "Ver proyectos",
    portraitLabel: "Retrato de Daniel Ojeda hecho de puntos",
  },
  building: {
    label: "Actualmente construyendo",
    name: "Lattice Systems",
    description: "Consultoría y desarrollo de software a medida.",
    status: "en construcción",
  },
  about: {
    title: "Sobre mí",
    body: [
      "Soy desarrollador de software en León, Guanajuato. Me enfoco en el backend: APIs, integraciones y bases de datos, y también construyo la interfaz cuando el proyecto lo pide.",
      "Trabajo en banca digital y vengo de la consultoría de TI. He liderado la migración y unificación de sistemas críticos y he llevado IA a producción con RAG y modelos de peso abierto. Estudio Ingeniería en Gestión y Desarrollo de Software en la Universidad Tecnológica de León.",
    ],
  },
  projects: {
    title: "Proyectos",
    viewLabel: "Ver proyecto",
    more: "Ver todo en GitHub",
    kinds: { private: "Privado", code: "Código", demo: "Demo en vivo" },
    items: [
      {
        slug: "spaceia-ms-ai",
        name: "SpaceIA · Punto de información",
        description:
          "Punto de información inteligente de la Universidad Tecnológica de León. Como desarrollador principal, construí el microservicio de IA: responde preguntas institucionales con RAG sobre PDFs normalizados con Docling, con LLM y embeddings intercambiables (Groq, OpenAI, Gemini o locales), e incluye un pipeline KDD que segmenta las consultas de los estudiantes.",
        stack: ["Python", "FastAPI", "LangChain", "ChromaDB", "Docling"],
        href: "",
      },
      {
        slug: "spaceia-landing",
        name: "SpaceIA · Plataforma comercial",
        description:
          "Sitio público, portal de clientes y panel de administración en una sola app: cotizaciones, clientes, productos, costeo, proveedores, compras, reseñas y soporte. Desarrollé el frontend y buena parte de la API, con Clean Architecture.",
        stack: ["Angular", "ASP.NET Core", "PostgreSQL", "Docker"],
        href: "https://spaceai-landing-web-frontend.vercel.app",
      },
      {
        slug: "muebles-roble",
        name: "Muebles Roble · ERP",
        description:
          "ERP para el proceso productivo de una mueblería, hecho en equipo. Construí los módulos de proveedores, compras, lista de materiales (BOM), ventas, materiales, costos, auditoría y dashboard.",
        stack: ["Python", "Flask", "SQLAlchemy", "MySQL"],
        href: "https://github.com/lattice-systems/muebles-roble-diseno-app",
      },
      {
        slug: "docs-classifier",
        name: "Clasificador de documentos",
        description:
          "API que recibe PDFs, extrae el texto con OCR basado en IA, clasifica los documentos y separa los expedientes que vienen mezclados en un solo archivo.",
        stack: ["Python", "FastAPI", "OCR"],
        href: "https://github.com/DevOjeda016/docs-classifier",
      },
      {
        slug: "zarape-springboot",
        name: "El Zarape",
        description:
          "Migración de una API JAX-RS con stored procedures de MySQL a Spring Boot 3 con JPA y JWT, con frontend en React y entorno de desarrollo en Docker.",
        stack: ["Java", "Spring Boot", "MySQL", "React", "Docker"],
        href: "https://github.com/DevOjeda016/zarape-springboot",
      },
    ],
  },
  experience: {
    title: "Experiencia",
    items: [
      {
        period: "Mar 2026 — Hoy",
        role: "Desarrollador de Software",
        company: "Banco del Bajío",
        description:
          "Gerencia de Operaciones Digitales. Laravel, .NET, Vue 3, Angular, SQL Server, MySQL y servicios SOAP de SAP.",
        highlights: [
          "Rediseñé el sistema legacy de expedientes de Capital Humano con un módulo de IA (modelo de peso abierto + RAG) que clasifica y estandariza los documentos de candidatos y colaboradores de las regionales de México: ~7,000 expedientes activos y 11,000 inactivos, con SAP como fuente maestra.",
          "Lideré la unificación de los expedientes crediticios y laborales, antes en dos bases de datos separadas, en una sola plataforma, con jobs de limpieza, estandarización y migración de archivos para ~21,000 personas.",
          "Integré el sistema con Teamtailor para que los reclutadores gestionen la documentación de los candidatos directamente en el repositorio interno.",
          "Implementé un asistente RAG interno que resuelve las consultas de Capital Humano sobre procesos y políticas.",
        ],
      },
      {
        period: "Abr 2025 — Jul 2025",
        role: "Desarrollador Backend",
        company: "Quarksoft",
        description: "Consultoría remota. Spring Boot y Scrum.",
        highlights: [
          "Desarrollé en equipo un sistema de cálculo de bonos para agentes de seguros que opera con 8 aseguradoras de México.",
          "Diseñé la lógica de KPIs y métricas, y un motor de recomendaciones que orienta a los agentes hacia el cumplimiento de sus incentivos.",
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
      { name: "IA", items: ["RAG", "LangChain", "ChromaDB", "Docling", "Modelos de peso abierto"] },
      {
        name: "Datos e infraestructura",
        items: ["SQL Server", "MySQL", "PostgreSQL", "MongoDB", "Redis", "Docker", "GitHub Actions", "Azure", "Vercel", "Linux"],
      },
    ],
  },
  lattice: {
    title: "Lattice Systems",
    body: "Además de mi trabajo como desarrollador, estoy construyendo Lattice Systems: consultoría y desarrollo de software para equipos que necesitan sistemas sólidos.",
    tags: ["Consultoría de software", "Desarrollo a medida"],
    cta: "Visitar latticesystems.dev",
  },
  contact: {
    title: "¿Trabajamos juntos?",
    body: "Escríbeme sobre un puesto, un proyecto o una idea. Respondo en español o en inglés.",
    email: "danielojeda.dev@outlook.com",
    emailPlaceholder: "",
    copy: "Copiar correo",
    copied: "Copiado",
    socials: "Redes",
  },
  footer: {
    prompt: "~/dy.ojeda $ exit",
    tagline: "Desarrollador Backend & Full-Stack en León, Guanajuato.",
    site: "Sitio",
    elsewhere: "En otros lados",
    backToTop: "Volver arriba",
  },
};

export type Dictionary = typeof es;
