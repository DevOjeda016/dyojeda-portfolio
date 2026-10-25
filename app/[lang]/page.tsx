import { existsSync } from "node:fs";
import { join } from "node:path";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowDown, ArrowUpRight, BrainCircuit, Database, Lock, Mail, PanelsTopLeft, Server } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/site/brand-icons";
import { DotField } from "@/components/site/dot-field";
import { DotPortrait } from "@/components/site/dot-portrait";
import { PageMotion } from "@/components/site/page-motion";
import { RevealHeading } from "@/components/site/reveal-heading";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";
import { getDictionary, hasLocale, links } from "./dictionaries";

const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const section = "py-14 sm:py-20";
const pill = "h-12 rounded-full px-6 text-base";
// Nav link with an underline that grows from the centre on hover.
const navLink =
  "relative rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-signature after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100";
// Stack icons follow the order of the stack groups in the dictionaries.
const stackIcons = [Server, PanelsTopLeft, BrainCircuit, Database];

function Wordmark({ animatedDot = false }: { animatedDot?: boolean }) {
  return (
    <>
      dy
      <span
        className={cn(
          "text-signature",
          !animatedDot && "inline-block transition-transform duration-300 ease-out group-hover:-translate-y-[0.3em]"
        )}
        data-dot={animatedDot || undefined}
      >
        .
      </span>
      ojeda
    </>
  );
}

// Drop a photo at public/retrato.{png,webp,jpg} and the hero portrait uses it.
// A cut-out with transparency gives a figure without a frame.
const portrait =
  ["retrato.png", "retrato.webp", "retrato.jpg"]
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
    { name: "GitHub", href: links.github, Icon: GitHubIcon },
    { name: "LinkedIn", href: links.linkedin, Icon: LinkedInIcon },
    { name: "Instagram", href: links.instagram, Icon: InstagramIcon },
  ].filter((s) => s.href);

  return (
    <PageMotion>
      <header data-header className="sticky top-0 z-40 border-b border-border/60 bg-background">
        <div className={cn(container, "flex h-16 items-center justify-between")}>
          <a href="#top" className="group text-lg font-bold tracking-tight">
            <Wordmark />
          </a>
          <nav className="flex items-center gap-1 text-sm font-medium">
            <a href="#sobre-mi" className={cn(navLink, "hidden md:block")}>
              {t.nav.about}
            </a>
            <a href="#proyectos" className={cn(navLink, "hidden md:block")}>
              {t.nav.projects}
            </a>
            <a href="#experiencia" className={cn(navLink, "hidden md:block")}>
              {t.nav.experience}
            </a>
            <a href="#contacto" className={navLink}>
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
          <div className={cn(container, "grid min-h-[calc(100svh-4rem)] content-center gap-8 pt-12 pb-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-10 lg:pt-8")}>
            <div data-parallax="-12" className="flex flex-col gap-6 lg:self-center">
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
                <a href="#contacto" data-magnetic className={cn(buttonVariants(), pill, "group")}>
                  {t.hero.primaryCta}
                  <ArrowUpRight data-icon="inline-end" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a href="#proyectos" data-magnetic className={cn(buttonVariants({ variant: "outline" }), pill, "group bg-background/80")}>
                  {t.hero.secondaryCta}
                  <ArrowDown data-icon="inline-end" className="transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
              </div>
            </div>

            <div data-parallax="8" className="mx-auto aspect-[7/8] w-full max-w-[20rem] sm:max-w-sm lg:-mb-10 lg:max-w-none">
              <DotPortrait src={portrait} fallback="dy." label={t.hero.portraitLabel} />
            </div>

            <a
              data-hero-fade
              href={links.lattice}
              target="_blank"
              rel="noreferrer"
              className="group relative z-10 flex flex-col gap-1 rounded-2xl border border-border bg-card px-5 py-4 transition-colors duration-300 hover:border-signature/50 sm:flex-row sm:items-center sm:gap-4 lg:col-span-2"
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
        <section id="sobre-mi" className={cn(container, section, "grid gap-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16")}>
          <RevealHeading>{t.about.title}</RevealHeading>
          <div className="flex max-w-[62ch] flex-col gap-5 text-lg text-pretty text-muted-foreground">
            {t.about.body.map((paragraph, i) => (
              <p key={i} data-row>
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section id="proyectos" className={cn(container, section, "flex flex-col gap-8 sm:gap-10")}>
          <RevealHeading>{t.projects.title}</RevealHeading>
          <ol className="relative border-b border-border">
            {t.projects.items.map((project, i) => {
              const body = (
                <>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-2xl font-semibold tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2">
                      {project.name}
                    </h3>
                    <p className="max-w-[60ch] text-muted-foreground">{project.description}</p>
                    <ul className="mt-1 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                      {project.stack.map((tool) => (
                        <li key={tool} className="transition-colors duration-300 group-hover:text-foreground">
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {project.href ? (
                    <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border transition-all duration-500 ease-out group-hover:-rotate-45 group-hover:border-signature group-hover:bg-signature group-hover:text-background">
                      <ArrowUpRight aria-label={t.projects.viewLabel} className="size-5 rotate-45" />
                    </span>
                  ) : (
                    <span className="flex shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground">
                      <Lock aria-hidden className="size-3.5" />
                      <span className="hidden sm:inline">{t.projects.private}</span>
                      <span className="sr-only sm:hidden">{t.projects.private}</span>
                    </span>
                  )}
                </>
              );
              // The muted band wipes in from the left on hover.
              const row =
                "group relative isolate flex items-start justify-between gap-6 px-1 py-7 sm:px-4 before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-muted/70 before:transition-transform before:duration-500 before:ease-out hover:before:scale-x-100";
              return (
                <li key={i} data-row="clip" className="border-t border-border">
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
            <GitHubIcon className="size-4 transition-transform duration-300 group-hover:-rotate-12" />
            {t.projects.more}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </section>

        {/* Experience */}
        <section id="experiencia" className={cn(container, section, "flex flex-col gap-8 sm:gap-10")}>
          <RevealHeading>{t.experience.title}</RevealHeading>
          <ol className="relative flex flex-col gap-12 pl-8">
            {/* Timeline rail; draws itself as the section scrolls by. */}
            <span aria-hidden data-draw className="absolute top-2 bottom-2 left-[5px] w-px bg-border" />
            {t.experience.items.map((job, i) => (
              <li key={i} data-row="slide" className="relative grid gap-2 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1.5 -left-8 grid size-[11px] place-items-center rounded-full border bg-background",
                    i === 0 ? "border-signature" : "border-border"
                  )}
                >
                  {i === 0 && <span className="size-[5px] rounded-full bg-signature motion-safe:animate-pulse" />}
                </span>
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
        <section className={cn(container, section, "flex flex-col gap-8 sm:gap-10")}>
          <RevealHeading>{t.stack.title}</RevealHeading>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {t.stack.groups.map((group, g) => {
              const Icon = stackIcons[g % stackIcons.length];
              return (
                <div key={group.name} className="group/stack flex flex-col gap-4">
                  <h3 className="flex items-center gap-3 font-semibold">
                    <span className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors duration-300 group-hover/stack:border-signature/50 group-hover/stack:text-signature">
                      <Icon aria-hidden className="size-[18px]" />
                    </span>
                    {group.name}
                  </h3>
                  <ul data-pop className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground transition-[color,border-color,translate] duration-300 ease-out hover:-translate-y-0.5 hover:border-signature/50 hover:text-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Lattice Systems */}
        <section className={cn(container, section)}>
          <div data-expand className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-8 sm:p-12">
            <RevealHeading className="text-3xl sm:text-5xl">{t.lattice.title}</RevealHeading>
            <p className="max-w-[60ch] text-lg text-pretty text-muted-foreground">{t.lattice.body}</p>
            <a
              href={links.lattice}
              target="_blank"
              rel="noreferrer"
              data-magnetic
              className={cn(buttonVariants({ variant: "outline" }), pill, "group self-start")}
            >
              {t.lattice.cta}
              <ArrowUpRight data-icon="inline-end" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </section>

        {/* Contact */}
        <section id="contacto" className={cn(container, "flex flex-col gap-8 py-20 sm:py-32")}>
          <RevealHeading className="sm:text-7xl">{t.contact.title}</RevealHeading>
          <p data-row className="max-w-[52ch] text-lg text-pretty text-muted-foreground">{t.contact.body}</p>
          {t.contact.email ? (
            <a
              data-row
              href={`mailto:${t.contact.email}`}
              className="group flex items-center gap-3 self-start text-2xl font-semibold break-all transition-colors hover:text-signature sm:text-4xl"
            >
              <Mail className="size-7 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-rotate-12 group-hover:text-signature" />
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_2px]">
                {t.contact.email}
              </span>
            </a>
          ) : (
            <p className="text-2xl font-semibold text-muted-foreground sm:text-4xl">
              {t.contact.emailPlaceholder}
            </p>
          )}
          {socials.length > 0 && (
            <ul aria-label={t.contact.socials} data-pop className="flex flex-wrap gap-3">
              {socials.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    data-magnetic
                    className={cn(buttonVariants({ variant: "outline" }), "group h-10 rounded-full px-4 transition-colors hover:border-signature/50")}
                  >
                    <Icon className="size-4 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12 group-hover:text-signature" />
                    {name}
                    <ArrowUpRight data-icon="inline-end" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="border-t border-border">
        <div className={cn(container, "flex flex-col gap-2 py-8 text-sm text-muted-foreground sm:flex-row sm:justify-between")}>
          <p className="group">
            © <CopyrightYear /> <Wordmark />
          </p>
          <p>{t.footer.built}</p>
        </div>
      </footer>
    </PageMotion>
  );
}
