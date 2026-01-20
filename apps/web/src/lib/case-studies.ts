/**
 * Marketing Case Studies data for `/casi-studio`.
 *
 * Source of truth for project titles/copy:
 * - https://www.dataweb-srl.it/casi-studio/
 *
 * Notes:
 * - Static-first: keep the marketing site fast and easy to maintain.
 * - Images here are placeholders from `/public/images/` until you provide real project media.
 */

export interface CaseStudy {
  /** Stable id for React keys and future deep-linking. */
  id: string;
  /** Project title. */
  title: string;
  /** Short summary used in lists/cards. */
  summary: string;
  /** Longer description used on the page. */
  description: string;
  /** Visual media used in the hero carousel. */
  heroMedia: readonly {
    src: string;
    /** Image alt. Keep concise; if decorative, use empty string. */
    alt: string;
  }[];
}

export const CASE_STUDIES: readonly CaseStudy[] = [
  {
    id: "firma-grafometrica",
    title: "Firma grafometrica contratti assunzione dipendenti",
    summary:
      "Soluzione avanzata per garantire l’autenticità dei documenti digitali tramite biometria.",
    description:
      "DataWeb Group fornisce un sistema di firma grafometrica che cattura e autentica in modo univoco le firme dei firmatari, migliorando sicurezza e conformità, eliminando frodi o alterazioni e semplificando i flussi documentali.",
    // Placeholder media: replace with real project images when available.
    heroMedia: [
      { src: "/images/background_home.png", alt: "Anteprima progetto" },
      { src: "/images/background_home2.png", alt: "Anteprima progetto" },
    ],
  },
  {
    id: "dogane-import",
    title: "Dogane import",
    summary:
      "Digitalizzazione delle dichiarazioni doganali: tracciati XML e bollette doganali elettroniche.",
    description:
      "Dal 9 giugno 2022 il sistema di gestione delle dichiarazioni doganali di importazione è stato reingegnerizzato, sostituendo il formulario DAU con tracciati XML. Questo processo snellisce pratiche di import/export, riduce tempi e costi, e migliora controlli e conservazione dei documenti.",
    heroMedia: [
      { src: "/images/background_home2.png", alt: "Anteprima progetto" },
      { src: "/images/background_home.png", alt: "Anteprima progetto" },
    ],
  },
] as const;

/** The “newest” project that powers the full-height hero carousel. */
export const NEWEST_CASE_STUDY: CaseStudy = CASE_STUDIES[0];

