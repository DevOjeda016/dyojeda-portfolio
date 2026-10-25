// Contenido en español. Todo lo marcado con "Reemplazar" es un marcador:
// cámbialo por datos reales antes de publicar (no inventes clientes ni métricas).
export const es = {
  meta: {
    title: "dy.ojeda — Backend & Full-Stack Developer",
    description:
      "Portafolio de Daniel Ojeda, desarrollador Backend & Full-Stack.",
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
    role: "Backend & Full-Stack Developer",
    pitch:
      "Diseño y construyo los sistemas detrás del producto: APIs, datos e infraestructura, y la interfaz cuando hace falta.",
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
      "Vengo de la consultoría de TI y la banca digital, donde he liderado la migración y unificación de sistemas críticos y he llevado IA a producción con RAG y modelos de peso abierto. Estudio Ingeniería en Gestión y Desarrollo de Software en la Universidad Tecnológica de León.",
    ],
  },
  projects: {
    title: "Proyectos",
    viewLabel: "Ver proyecto",
    more: "Ver todo en GitHub",
    items: [
      {
        name: "SpaceAI",
        description:
          "Ecosistema de IA e IoT para resolver dudas sobre horarios universitarios: pipeline KDD para segmentar y modelar consultas estudiantiles, preprocesamiento RAG con Docling para PDFs heterogéneos y un microservicio en FastAPI con NLP que guarda las consultas.",
        stack: ["Python", "FastAPI", "RAG", "Docling", "NLP"],
        href: "",
      },
      {
        name: "ERP para mueblería",
        description:
          "ERP desarrollado en equipo. Construí los módulos de proveedores, compras, lista de materiales (BOM), ventas, materiales, costos, auditoría y dashboard.",
        stack: ["Backend", "ERP"],
        href: "",
      },
      {
        name: "Clasificador de documentos",
        description:
          "API que recibe PDFs, extrae el texto con OCR basado en IA, clasifica los documentos y separa expedientes que vienen mezclados en un solo archivo.",
        stack: ["Python", "FastAPI", "OCR"],
        href: "https://github.com/DevOjeda016/docs-classifier",
      },
      {
        name: "El Zarape",
        description:
          "Migración de una API JAX-RS con stored procedures de MySQL a Spring Boot 3 con JPA y JWT, con un frontend en React y entorno de desarrollo en Docker.",
        stack: ["Java", "Spring Boot", "MySQL", "React", "Docker"],
        href: "https://github.com/DevOjeda016/zarape-springboot",
      },
      {
        name: "Sistema de autenticación",
        description:
          "Web API de registro e inicio de sesión con ASP.NET Core Identity y JWT sobre SQL Server, con un cliente en Angular.",
        stack: ["C#", ".NET 9", "SQL Server", "Angular"],
        href: "https://github.com/DevOjeda016/auth-system-api",
      },
      {
        name: "SmartGreenhouse",
        description:
          "App Android para gestionar invernaderos: lecturas de sensores en tiempo real, gráficas, umbrales para administradores y un asistente con IA.",
        stack: ["Java", "Android", "Material 3"],
        href: "https://github.com/DevOjeda016/SmartGreenhouseApp",
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
          "Rediseñé el sistema legacy de expedientes de capital humano con un módulo de IA (modelo de peso abierto + RAG) que clasifica y estandariza documentos de candidatos y colaboradores de las regionales de México: ~7,000 expedientes activos y 11,000 inactivos, con SAP como fuente maestra.",
          "Lideré la unificación de los expedientes crediticios y laborales, antes en dos bases de datos separadas, en una sola plataforma, con jobs de limpieza, estandarización y migración de archivos para ~21,000 personas.",
          "Integré el sistema con Teamtailor para que los reclutadores gestionen la documentación de candidatos directo en el repositorio interno.",
          "Implementé un asistente RAG interno que resuelve consultas de Capital Humano sobre procesos y políticas.",
        ],
      },
      {
        period: "Abr 2025 — Jul 2025",
        role: "Desarrollador Backend",
        company: "Quarksoft",
        description: "Consultoría remota. Spring Boot, Scrum.",
        highlights: [
          "Desarrollé en equipo un sistema de cálculo de bonos para agentes de seguros que opera con 8 aseguradoras de México.",
          "Diseñé la lógica de KPIs, métricas y un motor de recomendaciones que orienta a los agentes hacia el cumplimiento de sus incentivos.",
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
        name: "Datos e infraestructura",
        items: ["SQL Server · MySQL · PostgreSQL", "MongoDB · Redis", "Docker · GitHub Actions", "Azure · Vercel · Linux"],
      },
    ],
  },
  lattice: {
    title: "Lattice Systems",
    body: "Además de mi trabajo como desarrollador, estoy construyendo Lattice Systems: consultoría y desarrollo de software para equipos que necesitan sistemas sólidos.",
    cta: "Visitar latticesystems.dev",
  },
  contact: {
    title: "¿Trabajamos juntos?",
    body: "Escríbeme sobre un puesto, un proyecto o una idea. Respondo en español o inglés.",
    email: "danielojeda.dev@outlook.com",
    emailPlaceholder: "",
    socials: "Redes",
  },
  footer: {
    built: "Hecho con Next.js y shadcn/ui.",
  },
};

export type Dictionary = typeof es;
