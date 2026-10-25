import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { InlineScript } from "@/components/site/inline-script";
import { cn } from "@/lib/utils";
import { getDictionary, hasLocale, locales } from "./dictionaries";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Before first paint: applies the saved theme (or the system one), and marks
// `.motion` when animation is allowed so the hero can wait for its GSAP intro.
const themeScript = `(function(){var h=document.documentElement;try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";h.classList.toggle("dark",t==="dark")}catch(e){}if(matchMedia("(prefers-reduced-motion: no-preference)").matches)h.classList.add("motion")})()`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  return {
    metadataBase: new URL("https://dyojeda.tech"),
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/${lang}`, languages: { es: "/es", en: "/en" } },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={cn(
        "dark h-full antialiased font-sans",
        geistMono.variable,
        montserrat.variable
      )}
    >
      <head>
        <InlineScript html={themeScript} />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
