import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";

const dictionaries = { es, en };

export type Locale = keyof typeof dictionaries;

export const locales = Object.keys(dictionaries) as Locale[];
export const defaultLocale: Locale = "es";

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = (locale: Locale) => dictionaries[locale];

// Links that are the same in every language. Empty strings are not rendered.
export const links = {
  github: "https://github.com/DevOjeda016",
  linkedin: "https://www.linkedin.com/in/daniel-ojeda-luna-215082301",
  instagram: "https://www.instagram.com/dy.ojeda/",
  lattice: "https://latticesystems.dev",
};
