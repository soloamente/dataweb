/**
 * Marketing Events data for `/info/eventi`.
 *
 * Source of truth for titles/places/dates:
 * - https://www.dataweb-srl.it/eventi/
 *
 * Notes:
 * - We keep this static-first (no CMS) so the marketing site stays fast and simple.
 * - If/when we have per-event detail pages, replace `href` with internal routes.
 */

export interface MarketingEvent {
  /** Stable id for React keys and future deep-linking. */
  id: string;
  /** Event title as shown on the marketing site. */
  title: string;
  /** City (or place) shown alongside the date. */
  city: string;
  /** ISO date (YYYY-MM-DD). */
  startDate: string;
  /** ISO date (YYYY-MM-DD). Optional for multi-day events. */
  endDate?: string;
  /**
   * Link destination for “Scopri di più”.
   * Today it points to the existing DataWeb site; later we can link to internal pages.
   */
  href: string;
}

const EVENTS_HREF_FALLBACK = "https://www.dataweb-srl.it/eventi/";

export const UPCOMING_EVENTS: readonly MarketingEvent[] = [
  {
    id: "novita-fiscali-notarile-milano-2026-01-23",
    title: "NOVITÀ FISCALI (E NON…) DI INTERESSE NOTARILE",
    city: "Milano",
    startDate: "2026-01-23",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "convegno-consiglio-notarile-taranto-2026-01-16-17",
    title: "CONVEGNO DEL CONSIGLIO NOTARILE DI TARANTO",
    city: "Taranto",
    startDate: "2026-01-16",
    endDate: "2026-01-17",
    href: EVENTS_HREF_FALLBACK,
  },
] as const;

export const PAST_EVENTS: readonly MarketingEvent[] = [
  {
    id: "xviii-convegno-comitato-notarile-toscano-2025-09-20",
    title: "XVIII CONVEGNO ANNUALE DEL COMITATO REGIONALE NOTARILE TOSCANO",
    city: "Lido di Camaiore",
    startDate: "2025-09-20",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "deontologia-garanzia-di-futuro-2025-09-26",
    title: "DEONTOLOGIA: GARANZIA DI FUTURO",
    city: "Gallipoli",
    startDate: "2025-09-26",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "lxi-congresso-nazionale-notariato-2025-10-16-18",
    title: "LXI CONGRESSO NAZIONALE DEL NOTARIATO",
    city: "Roma",
    startDate: "2025-10-16",
    endDate: "2025-10-18",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "15-raduno-estivo-notai-italia-capri-2025-06-06-07",
    title:
      "15° RADUNO ESTIVO NOTAI D’ITALIA URBANISTICA, EDILIZIA ED ATTIVITÀ NOTARILE: NOVITÀ NORMATIVE E QUESTIONI APPLICATIVE",
    city: "Capri",
    startDate: "2025-06-06",
    endDate: "2025-06-07",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "conformita-edilizia-vendite-immobiliari-bologna-2025-05-23",
    title:
      "LA CONFORMITA’ EDILIZIA NELLE VENDITE IMMOBILIARI E LO STATUS GIURIDICO DELLE PROPRIETA’",
    city: "Bologna",
    startDate: "2025-05-23",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "novita-fiscali-notarili-milano-2025-01-24",
    title: "Le novità fiscali di interessi notarili",
    city: "Milano",
    startDate: "2025-01-24",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "56-raduno-invernale-notai-italia-2025-02-05-09",
    title: "56° Raduno Invernale Notai D’Italia 2025",
    city: "Ortisei",
    startDate: "2025-02-05",
    endDate: "2025-02-09",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "evoluzione-notariato-professioni-firenze-2024-11-15",
    title: "L’evoluzione del Notariato e delle professioni",
    city: "Firenze",
    startDate: "2024-11-15",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "lx-congresso-nazionale-notariato-roma-2024-10-24-26",
    title: "LX Congresso Nazionale del Notariato",
    city: "Roma",
    startDate: "2024-10-24",
    endDate: "2024-10-26",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "xvii-convegno-notarile-toscano-lido-di-camaiore-2024-09-21",
    title:
      "XVII Convegno annuale del comitato regionale notarile Toscano",
    city: "Lido di Camaiore",
    startDate: "2024-09-21",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "14-raduno-estivo-notai-italia-capri-2024-06-07-08",
    title: "14° Raduno estivo notai d’Italia",
    city: "Capri",
    startDate: "2024-06-07",
    endDate: "2024-06-08",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "professione-e-ricerca-ostuni-2024-05-31-06-01",
    title:
      "Professione e ricerca attualità e problematiche in materia di diritto delle successioni e di diritto societario",
    city: "Ostuni",
    startDate: "2024-05-31",
    endDate: "2024-06-01",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "lix-congresso-nazionale-notariato-torino-2024-05-17-18",
    title: "LIX Congresso Nazionale del Notariato",
    city: "Torino",
    startDate: "2024-05-17",
    endDate: "2024-05-18",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "55-raduno-invernale-notai-italia-2024-02-29-03-03",
    title: "55° Raduno invernale notai d’Italia",
    city: "Dal 29 febbraio al 03 marzo 2024",
    startDate: "2024-02-29",
    endDate: "2024-03-03",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "presidi-antiriciclaggio-cagliari-2024-02-23",
    title:
      "I presìdi antiriciclaggio per lo Studio Notarile procedure e segnalazioni",
    city: "Cagliari",
    startDate: "2024-02-23",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "riforma-fiscale-legge-bilancio-milano-2024-01-19",
    title: "Riforma fiscale e legge di bilancio: novità e prospettive",
    city: "Milano",
    startDate: "2024-01-19",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "lviii-congresso-nazionale-notariato-roma-2023-10-26-28",
    title: "LVIII Congresso Nazionale del Notariato",
    city: "Roma",
    startDate: "2023-10-26",
    endDate: "2023-10-28",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "convegno-tre-venezie-2023-10-14",
    title:
      "Convegno Comitato Interregionale dei Consigli Notarili delle Tre Venezie",
    city: "14 Ottobre 2023",
    startDate: "2023-10-14",
    href: EVENTS_HREF_FALLBACK,
  },
  {
    id: "convegno-notares-2023-09-30",
    title: "Convegno NOTARES",
    city: "30 Settembre 2023",
    startDate: "2023-09-30",
    href: EVENTS_HREF_FALLBACK,
  },
] as const;

export function formatEventDateIt(
  startDateIso: string,
  endDateIso?: string,
): string {
  const start = new Date(`${startDateIso}T00:00:00Z`);
  const end = endDateIso ? new Date(`${endDateIso}T00:00:00Z`) : undefined;

  // Defensive: if parsing fails, fall back to the raw ISO (better than crashing).
  if (Number.isNaN(start.getTime())) return startDateIso;
  if (end && Number.isNaN(end.getTime())) return startDateIso;

  const fmtDay = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
  });
  const fmtMonthYear = new Intl.DateTimeFormat("it-IT", {
    month: "long",
    year: "numeric",
  });
  const fmtDayMonthYear = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  if (!end) return fmtDayMonthYear.format(start);

  const sameMonth =
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth();

  if (sameMonth) {
    const dayRange = `${fmtDay.format(start)}–${fmtDay.format(end)}`;
    return `${dayRange} ${fmtMonthYear.format(start)}`;
  }

  return `${fmtDayMonthYear.format(start)} – ${fmtDayMonthYear.format(end)}`;
}

/**
 * Compact date label for “tile grids” (Acctual-like blog cards).
 * Example: "23 gen 2026" or "16–17 gen 2026"
 */
export function formatEventDateCompactIt(
  startDateIso: string,
  endDateIso?: string,
): string {
  const start = new Date(`${startDateIso}T00:00:00Z`);
  const end = endDateIso ? new Date(`${endDateIso}T00:00:00Z`) : undefined;

  // Defensive: if parsing fails, fall back to the raw ISO (better than crashing).
  if (Number.isNaN(start.getTime())) return startDateIso;
  if (end && Number.isNaN(end.getTime())) return startDateIso;

  const fmtDay = new Intl.DateTimeFormat("it-IT", { day: "2-digit" });
  const fmtMonthShortYear = new Intl.DateTimeFormat("it-IT", {
    month: "short",
    year: "numeric",
  });
  const fmtDayMonthShortYear = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  if (!end) return fmtDayMonthShortYear.format(start);

  const sameMonth =
    start.getUTCFullYear() === end.getUTCFullYear() &&
    start.getUTCMonth() === end.getUTCMonth();

  if (sameMonth) {
    const dayRange = `${fmtDay.format(start)}–${fmtDay.format(end)}`;
    return `${dayRange} ${fmtMonthShortYear.format(start)}`;
  }

  return `${fmtDayMonthShortYear.format(start)} – ${fmtDayMonthShortYear.format(end)}`;
}

