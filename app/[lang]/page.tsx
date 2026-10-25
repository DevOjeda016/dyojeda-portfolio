import { existsSync } from "node:fs";
import { join } from "node:path";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DotField } from "@/components/site/dot-field";
import { DotPortrait } from "@/components/site/dot-portrait";
import { PageMotion } from "@/components/site/page-motion";
import { RevealHeading } from "@/components/site/reveal-heading";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";
import { getDictionary, hasLocale, links } from "./dictionaries";

const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const pill = "h-12 rounded-full px-6 text-base";

function Wordmark({ animatedDot = false }: { animatedDot?: boolean }) {
  return (
    <>
      dy<span className="text-signature" data-dot={animatedDot || undefined}>.</span>ojeda
    </>
  );
}

// Drop a photo at public/retrato.{jpg,png,webp} and the hero portrait uses it.
const portrait =
  ["retrato.jpg", "retrato.png", "retrato.webp"]
    .filter((file) => existsSync(join(process.cwd(), "public", file)))
    .map((file) => `/${file}`)[0] ?? null;

// Cached so the page can be prerendered; refreshes when the cache is revalidated.
async function CopyrightYear() {
  "use cache";
  return new Date().getFullYear();
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const otherLang = lang === "es" ? "en" : "es";

  const socials = [
    { name: "GitHub", href: links.github },
    { name: "LinkedIn", href: links.linkedin },
    { name: "Instagram", href: links.instagram },
  ].filter((s) => s.href);

  return (
    <PageMotion>
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background">
        <div className={cn(container, "flex h-16 items-center justify-between")}>
          <a href="#top" className="text-lg font-bold tracking-tight">
            <Wordmark />
          </a>
          <nav className="flex items-center gap-1 text-sm font-medium">
            <a href="#sobre-mi" className="hidden rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground md:block">
              {t.nav.about}
            </a>
            <a href="#proyectos" className="hidden rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground md:block">
              {t.nav.projects}
            </a>
            <a href="#experiencia" className="hidden rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground md:block">
              {t.nav.experience}
            </a>
            <a href="#contacto" className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground">
              {t.nav.contact}
            </a>
            <Link
              href={`/${otherLang}`}
              hrefLang={otherLang}
              aria-label={t.nav.otherLangLabel}
              className="rounded-full px-3 py-2 font-mono text-xs tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {t.nav.otherLang}
            </Link>
            <ThemeToggle label={t.nav.themeLabel} />
          </nav>
        </div>
      </header>

      <main id="top" className="flex-1">
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <DotField />
          <div className={cn(container, "grid min-h-[calc(100svh-4rem)] content-center gap-10 py-16 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-center lg:gap-12")}>
            <div className="flex flex-col gap-6">
              <p className="font-mono text-sm text-muted-foreground sm:text-base">
                <span
                  className="type-line"
                  style={{ "--chars": t.hero.prompt.length } as CSSProperties}
                >
                  {t.hero.prompt}
                </span>
                <span aria-hidden className="type-caret" />
              </p>
              <h1
                data-hero-name
                className="pb-[0.12em] text-[clamp(3.75rem,15vw,9rem)] leading-[0.85] font-extrabold tracking-[-0.035em] lg:text-[clamp(5rem,8.5vw,8.5rem)]"
              >
                <Wordmark animatedDot />
              </h1>
              <div data-hero-fade className="flex max-w-2xl flex-col gap-3">
                <p className="text-xl font-semibold sm:text-2xl">{t.hero.role}</p>
                <p className="max-w-[52ch] text-base text-pretty text-muted-foreground sm:text-lg">
                  {t.hero.pitch}
                </p>
              </div>
              <div data-hero-fade className="flex flex-col gap-3 sm:flex-row">
                <a href="#contacto" data-magnetic className={cn(buttonVariants(), pill)}>
                  {t.hero.primaryCta}
                  <ArrowUpRight data-icon="inline-end" />
                </a>
                <a href="#proyectos" data-magnetic className={cn(buttonVariants({ variant: "outline" }), pill, "bg-background/80")}>
                  {t.hero.secondaryCta}
                  <ArrowDown data-icon="inline-end" />
                </a>
              </div>
            </div>

            <div className="mx-auto aspect-[4/5] w-full max-w-[22rem] sm:max-w-sm lg:max-w-md">
              <DotPortrait src={portrait} fallback="dy." label={t.hero.portraitLabel} />
            </div>

          <a
            data-hero-fade
            href={links.lattice}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col gap-1 rounded-2xl border border-border bg-card px-5 py-4 transition-colors hover:border-signature/50 sm:flex-row sm:items-center sm:gap-4 lg:col-span-2"
          >
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              {t.building.label}
            </span>
            <span className="font-semibold">{t.building.name}</span>
            <span className="text-sm text-muted-foreground">{t.building.description}</span>
            <span className="flex items-center gap-2 font-mono text-xs text-signature sm:ml-auto">
              <span aria-hidden className="size-1.5 rounded-full bg-signature motion-safe:animate-pulse" />
              {t.building.status}
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
          </div>
        </section>

        {/* About */}
        <section id="sobre-mi" className={cn(container, "grid gap-8 py-24 sm:py-32 lg:grid-cols-[1fr_1.4fr] lg:gap-16")}>
          <RevealHeading>{t.about.title}</RevealHeading>
          <div className="flex max-w-[62ch] flex-col gap-5 text-lg text-pretty text-muted-foreground">
            {t.about.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="proyectos" className={cn(container, "flex flex-col gap-10 py-24 sm:py-32")}>
          <RevealHeading>{t.projects.title}</RevealHeading>
          <ol className="divide-y divide-border border-y border-border">
            {t.projects.items.map((project, i) => {
              const body = (
                <>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-semibold tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2">{project.name}</h3>
                    <p className="max-w-[60ch] text-muted-foreground">{project.description}</p>
                    <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                      {project.stack.map((tool) => (
                        <li key={tool}>{tool}</li>
                      ))}
                    </ul>
                  </div>
                  {project.href && (
                    <ArrowUpRight
                      aria-label={t.projects.viewLabel}
                      className="size-6 shrink-0 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-signature"
                    />
                  )}
                </>
              );
              const row = "group flex items-start justify-between gap-6 py-8";
              return (
                <li key={i} data-row>
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer" className={row}>
                      {body}
                    </a>
                  ) : (
                    <div className={row}>{body}</div>
                  )}
                </li>
              );
            })}
          </ol>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 self-start font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {t.projects.more}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </section>

        {/* Experience */}
        <section id="experiencia" className={cn(container, "flex flex-col gap-10 py-24 sm:py-32")}>
          <RevealHeading>{t.experience.title}</RevealHeading>
          <ol className="flex flex-col gap-10">
            {t.experience.items.map((job, i) => (
              <li key={i} data-row className="grid gap-2 sm:grid-cols-[12rem_1fr] sm:gap-8">
                <p className="font-mono text-sm text-muted-foreground tabular-nums">{job.period}</p>
                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold">
                    {job.role} <span className="text-muted-foreground">· {job.company}</span>
                  </h3>
                  <p className="max-w-[60ch] text-muted-foreground">{job.description}</p>
                  <ul className="mt-3 flex max-w-[60ch] list-disc flex-col gap-2 pl-5 text-muted-foreground marker:text-border">
                    {job.highlights.map((highlight, j) => (
                      <li key={j}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Stack */}
        <section className={cn(container, "flex flex-col gap-10 py-24 sm:py-32")}>
          <RevealHeading>{t.stack.title}</RevealHeading>
          <div className="grid gap-10 sm:grid-cols-3">
            {t.stack.groups.map((group) => (
              <div key={group.name} data-row className="flex flex-col gap-3">
                <h3 className="font-semibold">{group.name}</h3>
                <ul className="flex flex-col gap-1.5 text-muted-foreground">
                  {group.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Lattice Systems */}
        <section className={cn(container, "py-24 sm:py-32")}>
          <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 sm:p-12">
            <RevealHeading className="text-3xl sm:text-5xl">{t.lattice.title}</RevealHeading>
            <p className="max-w-[60ch] text-lg text-pretty text-muted-foreground">{t.lattice.body}</p>
            <a
              href={links.lattice}
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className={cn(buttonVariants({ variant: "outline" }), pill, "self-start")}
            >
              {t.lattice.cta}
              <ArrowUpRight data-icon="inline-end" />
            </a>
          </div>
        </section>

        {/* Contact */}
        <section id="contacto" className={cn(container, "flex flex-col gap-8 py-24 sm:py-40")}>
          <RevealHeading className="sm:text-7xl">{t.contact.title}</RevealHeading>
          <p className="max-w-[52ch] text-lg text-pretty text-muted-foreground">{t.contact.body}</p>
          {t.contact.email ? (
            <a
              href={`mailto:${t.contact.email}`}
              className="flex items-center gap-3 self-start text-2xl font-semibold underline decoration-border decoration-2 underline-offset-8 transition-colors hover:text-signature hover:decoration-signature sm:text-4xl"
            >
              <Mail className="size-7 text-muted-foreground" />
              {t.contact.email}
            </a>
          ) : (
            <p className="text-2xl font-semibold text-muted-foreground sm:text-4xl">
              {t.contact.emailPlaceholder}
            </p>
          )}
          {socials.length > 0 && (
            <ul aria-label={t.contact.socials} className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    data-magnetic
                    className={cn(buttonVariants({ variant: "outline" }), "h-10 rounded-full px-4")}
                  >
                    {social.name}
                    <ArrowUpRight data-icon="inline-end" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="border-t border-border">
        <div className={cn(container, "flex flex-col gap-2 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between")}>
          <p>
            © <CopyrightYear /> <Wordmark />
          </p>
          <p>{t.footer.built}</p>
        </div>
      </footer>
    </PageMotion>
  );
}
