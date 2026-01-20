/**
 * Marketing News data for `/info/novità`.
 *
 * Notes:
 * - We keep this static-first (no CMS) so the marketing site stays fast and simple.
 * - If/when we have per-news detail pages, replace `href` with internal routes.
 */

export interface MarketingNews {
  /** Stable id for React keys and future deep-linking. */
  id: string;
  /** News title as shown on the marketing site. */
  title: string;
  /** Short description/excerpt for the news item. */
  excerpt?: string;
  /** ISO date (YYYY-MM-DD) of publication. */
  publishedDate: string;
  /**
   * Link destination for "Scopri di più".
   * Today it points to the existing DataWeb site; later we can link to internal pages.
   */
  href: string;
}

const NEWS_HREF_FALLBACK = "https://www.dataweb-srl.it/novita/";

/**
 * Recent news items (newest first).
 */
export const RECENT_NEWS: readonly MarketingNews[] = [
  {
    id: "aggiornamento-clipper-2026-01",
    title: "Nuovo aggiornamento Clipper: funzionalità avanzate per gli studi notarili",
    excerpt:
      "Scopri le ultime novità del software Clipper con miglioramenti alle performance e nuove funzioni dedicate.",
    publishedDate: "2026-01-15",
    href: NEWS_HREF_FALLBACK,
  },
  {
    id: "partnership-notariato-2026",
    title: "DataWeb rinnova la partnership con il Consiglio Nazionale del Notariato",
    excerpt:
      "Un accordo che rafforza la collaborazione per l'innovazione digitale nel settore notarile.",
    publishedDate: "2026-01-10",
    href: NEWS_HREF_FALLBACK,
  },
  {
    id: "webinar-digitalizzazione-2025-12",
    title: "Webinar gratuito: La digitalizzazione dello studio notarile",
    excerpt:
      "Un incontro online per scoprire come ottimizzare i processi di studio con gli strumenti digitali.",
    publishedDate: "2025-12-20",
    href: NEWS_HREF_FALLBACK,
  },
] as const;

/**
 * Archived news items (older news, newest first within the archive).
 */
export const ARCHIVED_NEWS: readonly MarketingNews[] = [
  {
    id: "rilascio-clipper-v5-2025-11",
    title: "Rilascio Clipper v5: una nuova era per la gestione notarile",
    excerpt:
      "La quinta generazione del nostro software di punta porta con sé un'interfaccia completamente rinnovata.",
    publishedDate: "2025-11-15",
    href: NEWS_HREF_FALLBACK,
  },
  {
    id: "premio-innovazione-2025",
    title: "DataWeb riceve il Premio Innovazione Digitale 2025",
    excerpt:
      "Un riconoscimento per l'impegno nell'innovazione tecnologica al servizio delle professioni legali.",
    publishedDate: "2025-10-28",
    href: NEWS_HREF_FALLBACK,
  },
  {
    id: "nuova-sede-milano-2025",
    title: "Apertura della nuova sede DataWeb a Milano",
    excerpt:
      "Espandiamo la nostra presenza sul territorio per essere ancora più vicini ai nostri clienti.",
    publishedDate: "2025-09-10",
    href: NEWS_HREF_FALLBACK,
  },
  {
    id: "integrazione-pec-2025",
    title: "Nuova integrazione PEC in Clipper",
    excerpt:
      "Gestisci la posta elettronica certificata direttamente dal tuo software gestionale.",
    publishedDate: "2025-08-05",
    href: NEWS_HREF_FALLBACK,
  },
  {
    id: "aggiornamento-normativo-2025-07",
    title: "Aggiornamento normativo: le novità fiscali per i notai",
    excerpt:
      "Un riepilogo delle principali novità normative e come Clipper si adegua automaticamente.",
    publishedDate: "2025-07-20",
    href: NEWS_HREF_FALLBACK,
  },
  {
    id: "formazione-online-2025",
    title: "Nuovo programma di formazione online DataWeb Academy",
    excerpt:
      "Corsi e tutorial per sfruttare al massimo tutte le funzionalità dei nostri software.",
    publishedDate: "2025-06-15",
    href: NEWS_HREF_FALLBACK,
  },
] as const;

/**
 * Format a publication date in Italian (compact format).
 * Example: "15 gen 2026"
 */
export function formatNewsDateCompactIt(dateIso: string): string {
  const date = new Date(`${dateIso}T00:00:00Z`);

  // Defensive: if parsing fails, fall back to the raw ISO (better than crashing).
  if (Number.isNaN(date.getTime())) return dateIso;

  const fmtDayMonthShortYear = new Intl.DateTimeFormat("it-IT", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return fmtDayMonthShortYear.format(date);
}
