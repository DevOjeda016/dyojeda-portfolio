import { existsSync } from "node:fs";
import { join } from "node:path";
import type { CSSProperties } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpRight,
  BrainCircuit,
  Database,
  Globe,
  Lock,
  Mail,
  PanelsTopLeft,
  Server,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { GitHubIcon, InstagramIcon, LinkedInIcon } from "@/components/site/brand-icons";
import { CopyButton } from "@/components/site/copy-button";
import { DotField } from "@/components/site/dot-field";
import { DotPortrait } from "@/components/site/dot-portrait";
import { LatticeGraph } from "@/components/site/lattice-graph";
import { PageMotion } from "@/components/site/page-motion";
import { RevealHeading } from "@/components/site/reveal-heading";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { brandStyle, TechIcon } from "@/components/site/tech-icon";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { cn } from "@/lib/utils";
import { getDictionary, hasLocale, links } from "./dictionaries";

const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";
const section = "py-12 sm:py-16";
const sectionStack = "flex flex-col gap-8 sm:gap-10";
const pill = "h-12 rounded-full px-6 text-base";
// Every hover settles on the same long ease-out.
const settle = "duration-500 ease-out-expo";
// Nav link with an underline that grows from the centre on hover.
const navLink =
  "relative rounded-full px-3 py-2 text-muted-foreground transition-colors hover:text-foreground after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-center after:scale-x-0 after:bg-signature after:transition-transform after:duration-500 after:ease-out-expo hover:after:scale-x-100";
// Arrow that nudges out toward its corner when its group is hovered.
const nudge = cn("transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5", settle);
// Stack icons follow the order of the stack groups in the dictionaries.
const stackIcons = [Server, PanelsTopLeft, BrainCircuit, Database];

function Wordmark({ animatedDot = false }: { animatedDot?: boolean }) {
  return (
    <>
      dy
      <span
        className={cn(
          "text-signature",
          !animatedDot && cn("inline-block transition-transform group-hover:-translate-y-[0.3em]", settle)
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
  const sections = [
    { href: "#sobre-mi", label: t.nav.about },
    { href: "#proyectos", label: t.nav.projects },
    { href: "#experiencia", label: t.nav.experience },
    { href: "#contacto", label: t.nav.contact },
  ];
  const latticeHost = new URL(links.lattice).host;

  return (
    <PageMotion>
      <SmoothScroll />
      <DotField />

      <header data-header className="sticky top-0 z-40 border-b border-border/60 bg-background">
        <div className={cn(container, "flex h-16 items-center justify-between")}>
          <a href="#top" className="group text-lg font-bold tracking-tight">
            <Wordmark />
          </a>
          <nav className="flex items-center gap-1 text-sm font-medium">
            {sections.map((s, i) => (
              <a key={s.href} href={s.href} className={cn(navLink, i < sections.length - 1 && "hidden md:block")}>
                {s.label}
              </a>
            ))}
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
        <section className="relative overflow-hidden">
          <div className={cn(container, "grid min-h-[calc(100svh-4rem)] content-center gap-10 pt-12 pb-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-end lg:gap-x-10 lg:gap-y-12 lg:pt-8")}>
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
              <div data-hero-fade className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a href="#contacto" className={cn(buttonVariants(), pill, "group")}>
                  {t.hero.primaryCta}
                  <ArrowUpRight data-icon="inline-end" className={nudge} />
                </a>
                <a href="#proyectos" className={cn(buttonVariants({ variant: "outline" }), pill, "group bg-background/80")}>
                  {t.hero.secondaryCta}
                  <ArrowDown data-icon="inline-end" className={cn("transition-transform group-hover:translate-y-0.5", settle)} />
                </a>
              </div>
            </div>

            <div data-parallax="8" className="mx-auto aspect-[7/8] w-full max-w-[20rem] sm:max-w-sm lg:max-w-none">
              <DotPortrait src={portrait} fallback="dy." label={t.hero.portraitLabel} />
            </div>

            <a
              data-hero-fade
              data-spotlight
              href={links.lattice}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "spotlight group flex flex-col gap-2 rounded-2xl border border-border bg-card px-6 py-5 transition-[border-color] hover:border-signature/40 sm:flex-row sm:items-center sm:gap-6 lg:col-span-2",
                settle
              )}
            >
              <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
                {t.building.label}
              </span>
              <span className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="font-semibold">{t.building.name}</span>
                <span className="text-sm text-muted-foreground">{t.building.description}</span>
              </span>
              <span className="mt-1 flex items-center gap-3 font-mono text-xs text-signature sm:mt-0 sm:ml-auto">
                <span className="flex items-center gap-2">
                  <span aria-hidden className="size-1.5 rounded-full bg-signature motion-safe:animate-pulse" />
                  {t.building.status}
                </span>
                <span className={cn("grid size-8 place-items-center rounded-full border border-border transition-colors group-hover:border-signature/50", settle)}>
                  <ArrowUpRight className={cn("size-4", nudge)} />
                </span>
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
        <section id="proyectos" className={cn(container, section, sectionStack)}>
          <RevealHeading>{t.projects.title}</RevealHeading>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
            {t.projects.items.map((project, i) => {
              const kind = !project.href ? "private" : project.href.includes("github.com") ? "code" : "demo";
              const KindIcon = kind === "private" ? Lock : kind === "code" ? GitHubIcon : Globe;
              const featured = i === 0;
              const body = (
                <>
                  <div className="flex items-center justify-between gap-4 font-mono text-xs text-muted-foreground">
                    <p className="flex min-w-0 items-center">
                      <span aria-hidden className="mr-[1ch]">$</span>
                      <span data-type className="inline-block overflow-hidden whitespace-nowrap align-bottom">
                        {`cd ~/projects/${project.slug}`}
                      </span>
                      {/* visibility, not opacity: the caret's blink animation owns opacity */}
                      <span aria-hidden className="type-caret invisible group-hover:visible" />
                    </p>
                    <span className="flex shrink-0 items-center gap-1.5">
                      <KindIcon aria-hidden className="size-3.5" />
                      {t.projects.kinds[kind]}
                    </span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h3
                      className={cn(
                        "font-semibold tracking-tight text-balance transition-transform group-hover:translate-x-1",
                        settle,
                        featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
                      )}
                    >
                      {project.name}
                    </h3>
                    <p className={cn("text-pretty text-muted-foreground", featured ? "max-w-[68ch] sm:text-lg" : "max-w-[60ch]")}>
                      {project.description}
                    </p>
                  </div>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-2">
                    <ul className="flex flex-wrap gap-2">
                      {project.stack.map((tool) => (
                        <li
                          key={tool}
                          style={brandStyle(tool)}
                          className="flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 font-mono text-xs text-muted-foreground"
                        >
                          <TechIcon
                            name={tool}
                            className={cn("size-3.5 transition-colors group-hover:text-[var(--brand,var(--signature))]", settle)}
                          />
                          {tool}
                        </li>
                      ))}
                    </ul>
                    {project.href && (
                      <span
                        className={cn(
                          "grid size-11 shrink-0 place-items-center rounded-full border border-border transition-[rotate,background-color,border-color,color] group-hover:-rotate-45 group-hover:border-signature group-hover:bg-signature group-hover:text-background",
                          settle
                        )}
                      >
                        <ArrowUpRight aria-label={t.projects.viewLabel} className="size-5 rotate-45" />
                      </span>
                    )}
                  </div>
                </>
              );
              const card = cn(
                "spotlight group flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-6 transition-[border-color] hover:border-signature/40 sm:p-8",
                settle
              );
              return (
                <div key={project.slug} data-row="clip" className={cn(featured && "md:col-span-2")}>
                  {project.href ? (
                    <a href={project.href} target="_blank" rel="noreferrer" data-spotlight className={card}>
                      {body}
                    </a>
                  ) : (
                    <div data-spotlight className={card}>
                      {body}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <a
            href={links.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 self-start font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitHubIcon className={cn("size-4 transition-transform group-hover:-rotate-12", settle)} />
            {t.projects.more}
            <ArrowUpRight className={cn("size-4", nudge)} />
          </a>
        </section>

        {/* Experience */}
        <section id="experiencia" className={cn(container, section, sectionStack)}>
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
                  <ul className="mt-3 flex max-w-[62ch] list-disc flex-col gap-2 pl-5 text-pretty text-muted-foreground marker:text-border">
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
        <section className={cn(container, section, sectionStack)}>
          <RevealHeading>{t.stack.title}</RevealHeading>
          <div className="flex flex-col divide-y divide-border border-y border-border">
            {t.stack.groups.map((group, g) => {
              const Icon = stackIcons[g % stackIcons.length];
              return (
                <div key={group.name} className="group/stack grid gap-5 py-7 lg:grid-cols-[14rem_1fr] lg:gap-10">
                  <h3 className="flex items-center gap-3 font-semibold lg:self-start lg:pt-2">
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center rounded-full border border-border text-muted-foreground transition-colors group-hover/stack:border-signature/50 group-hover/stack:text-signature",
                        settle
                      )}
                    >
                      <Icon aria-hidden className="size-[18px]" />
                    </span>
                    {group.name}
                  </h3>
                  <ul data-pop className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        style={brandStyle(item)}
                        className={cn(
                          "group/tile flex min-h-14 items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-3 text-sm leading-tight font-medium transition-[border-color,translate] hover:-translate-y-1 hover:border-signature/40",
                          settle
                        )}
                      >
                        <TechIcon
                          name={item}
                          className={cn(
                            "size-5 shrink-0 transition-[color,scale] group-hover/tile:scale-115 group-hover/tile:text-[var(--brand,var(--signature))]",
                            settle
                          )}
                        />
                        <span className="min-w-0">{item}</span>
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
          <div
            data-lattice
            data-expand
            data-spotlight
            className={cn(
              "spotlight group grid overflow-hidden rounded-2xl border border-border bg-card transition-[border-color] hover:border-signature/40 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]",
              settle
            )}
          >
            <div className="flex flex-col gap-6 p-8 sm:p-12">
              <p className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                <span aria-hidden className="size-1.5 rounded-full bg-signature motion-safe:animate-pulse" />
                {latticeHost}
                <span aria-hidden>·</span>
                <span className="text-signature">{t.building.status}</span>
              </p>
              <RevealHeading className="text-3xl sm:text-5xl">{t.lattice.title}</RevealHeading>
              <p className="max-w-[52ch] text-lg text-pretty text-muted-foreground">{t.lattice.body}</p>
              <ul className="flex flex-wrap gap-2">
                {t.lattice.tags.map((tag) => (
                  <li key={tag} className="rounded-full border border-border px-3 py-1.5 font-mono text-xs text-muted-foreground">
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                href={links.lattice}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), pill, "group mt-2 self-start")}
              >
                {t.lattice.cta}
                <ArrowUpRight data-icon="inline-end" className={nudge} />
              </a>
            </div>
            <div
              aria-hidden
              className="relative h-64 border-t border-border [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)] sm:h-80 lg:h-auto lg:border-t-0 lg:border-l"
            >
              <div className="absolute inset-0">
                <LatticeGraph />
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contacto" className={cn(container, "flex flex-col gap-8 pt-16 pb-20 sm:pt-24 sm:pb-28")}>
          <RevealHeading className="sm:text-7xl">{t.contact.title}</RevealHeading>
          <p data-row className="max-w-[52ch] text-lg text-pretty text-muted-foreground">{t.contact.body}</p>
          {t.contact.email ? (
            <div data-row className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
              <a
                href={`mailto:${t.contact.email}`}
                className="group flex min-w-0 items-center gap-3 text-xl font-semibold transition-colors hover:text-signature min-[420px]:text-2xl sm:text-4xl"
              >
                <Mail className={cn("size-6 shrink-0 text-muted-foreground transition-[rotate,color] group-hover:-rotate-12 group-hover:text-signature sm:size-7", settle)} />
                <span
                  className={cn(
                    "min-w-0 bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] group-hover:bg-[length:100%_2px]",
                    settle
                  )}
                >
                  {/* If it must wrap, it wraps before the @, never mid-word. */}
                  {t.contact.email.split("@")[0]}
                  <wbr />@{t.contact.email.split("@")[1]}
                </span>
              </a>
              <CopyButton value={t.contact.email} label={t.contact.copy} done={t.contact.copied} />
            </div>
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
                    className={cn(buttonVariants({ variant: "outline" }), "group h-10 rounded-full px-4 transition-colors hover:border-signature/50")}
                  >
                    <Icon className={cn("size-4 transition-[scale,rotate,color] group-hover:scale-110 group-hover:-rotate-12 group-hover:text-signature", settle)} />
                    {name}
                    <ArrowUpRight data-icon="inline-end" className={nudge} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="relative overflow-hidden border-t border-border bg-background">
        <div className={cn(container, "grid gap-12 pt-16 pb-12 sm:pt-20 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1fr)]")}>
          <div className="flex flex-col gap-4">
            <a href="#top" className="group w-fit text-2xl font-bold tracking-tight">
              <Wordmark />
            </a>
            <p className="max-w-[34ch] text-pretty text-muted-foreground">{t.footer.tagline}</p>
            <p className="font-mono text-sm text-muted-foreground">
              {t.footer.prompt}
              <span aria-hidden className="type-caret" />
            </p>
          </div>
          <nav aria-label={t.footer.site} className="flex flex-col gap-4">
            <p className="text-sm font-semibold">{t.footer.site}</p>
            <ul className="flex flex-col gap-2.5 text-muted-foreground">
              {sections.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className="group inline-flex items-center transition-colors hover:text-foreground">
                    <span aria-hidden className={cn("h-px w-0 bg-signature transition-[width,margin] group-hover:mr-2 group-hover:w-4", settle)} />
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-4">
            <p className="text-sm font-semibold">{t.footer.elsewhere}</p>
            <ul className="flex flex-col gap-2.5 text-muted-foreground">
              {[...socials, { name: "Lattice Systems", href: links.lattice, Icon: Globe }].map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 transition-colors hover:text-foreground"
                  >
                    <Icon className={cn("size-4 transition-[color,rotate] group-hover:-rotate-12 group-hover:text-signature", settle)} />
                    {name}
                    <ArrowUpRight
                      className={cn(
                        "size-3.5 opacity-0 transition-[opacity,translate] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100",
                        settle
                      )}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* leading-[0.8] hangs the descenders (y, j) ~0.2em below the box; the bottom padding keeps them off the bar. */}
        <p
          data-mark
          aria-hidden
          className="pointer-events-none pb-[0.24em] text-center text-[clamp(4.5rem,22vw,20rem)] leading-[0.8] font-extrabold tracking-[-0.04em] text-[color-mix(in_oklch,var(--signature)_13%,var(--background))] select-none dark:text-foreground/[0.06]"
        >
          dy<span className="text-[color-mix(in_oklch,var(--signature)_55%,var(--background))] dark:text-signature/40">.</span>ojeda
        </p>

        <div className="border-t border-border">
          <div className={cn(container, "flex flex-col-reverse gap-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between")}>
            <p>
              © <CopyrightYear /> Daniel Ojeda
            </p>
            <a href="#top" className="group inline-flex items-center gap-3 self-start transition-colors hover:text-foreground sm:self-auto">
              {t.footer.backToTop}
              <span
                className={cn(
                  "grid size-9 place-items-center rounded-full border border-border transition-[border-color,background-color,color] group-hover:border-signature group-hover:bg-signature group-hover:text-background",
                  settle
                )}
              >
                <ArrowUp className={cn("size-4 transition-transform group-hover:-translate-y-0.5", settle)} />
              </span>
            </a>
          </div>
        </div>
      </footer>
    </PageMotion>
  );
}
