import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  formatNewsDateCompactIt,
  RECENT_NEWS,
  ARCHIVED_NEWS,
  type MarketingNews,
} from "@/lib/news";

// News marketing page.
// Matches the visual style of the Eventi page with the Acctual-like design system.
export const metadata: Metadata = {
  title: "Novità | Dataweb Group",
  description:
    "Scopri tutte le ultime novità, aggiornamenti e comunicazioni da DataWeb Group.",
};

/**
 * Deterministic thumbnail selection so the page looks "designed" immediately,
 * even before we add custom images per news item.
 */
function getNewsThumbnail(newsId: string): { src: string; alt: string } {
  const thumbnails = [
    { src: "/images/document1.png", alt: "Novità Dataweb" },
    { src: "/images/document2.png", alt: "Novità Dataweb" },
    { src: "/images/document3.jpg", alt: "Novità Dataweb" },
    { src: "/images/document4.jpg", alt: "Novità Dataweb" },
    { src: "/images/background_home2.png", alt: "Novità Dataweb" },
    { src: "/images/image.png", alt: "Novità Dataweb" },
  ] as const;

  // Simple stable hash (fast and good enough for a deterministic index).
  let hash = 0;
  for (let i = 0; i < newsId.length; i += 1) {
    hash = (hash * 31 + newsId.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(hash) % thumbnails.length;
  return thumbnails[idx];
}

/**
 * Returns a pair of thumbnails for a "stacked preview" like Acctual's blog cards.
 * The pair is deterministic per news id.
 */
function getNewsPreviewStack(
  newsId: string,
): readonly [{ src: string; alt: string }, { src: string; alt: string }] {
  const first = getNewsThumbnail(newsId);

  // Create a second, different thumbnail by hashing with a suffix.
  const second = getNewsThumbnail(`${newsId}__alt`);

  return [first, second] as const;
}

/**
 * A light "poster system" to emulate Acctual's blog thumbnails:
 * bold on-image typography, corner tag, and a simple illustrative layer.
 *
 * We keep this deterministic so each news item always gets the same visual.
 */
function getNewsPosterTheme(newsId: string): {
  /** Background color (no gradients to keep this consistent with local UI rules). */
  bgClassName: string;
  /** Text color for the on-image typography. */
  fgClassName: string;
  /** Optional decorative overlay color (subtle). */
  decoClassName: string;
} {
  const themes = [
    {
      bgClassName: "bg-[#0F172A]", // slate-ish
      fgClassName: "text-white",
      decoClassName: "bg-white/10",
    },
    {
      bgClassName: "bg-[#0B2B26]", // deep green-ish
      fgClassName: "text-white",
      decoClassName: "bg-white/10",
    },
    {
      bgClassName: "bg-[#0B1E3A]", // deep blue-ish
      fgClassName: "text-white",
      decoClassName: "bg-white/10",
    },
    {
      bgClassName: "bg-[#111827]", // neutral dark
      fgClassName: "text-white",
      decoClassName: "bg-white/10",
    },
    {
      bgClassName: "bg-[#FAFAFA]", // light card like the "Payoneer" tile
      fgClassName: "text-neutral-900",
      decoClassName: "bg-neutral-900/5",
    },
  ] as const;

  let hash = 0;
  for (let i = 0; i < newsId.length; i += 1) {
    hash = (hash * 33 + newsId.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(hash) % themes.length;
  return themes[idx];
}

function NewsPoster({ news }: { news: MarketingNews }) {
  const theme = getNewsPosterTheme(news.id);
  const [previewA, previewB] = getNewsPreviewStack(news.id);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-[28px] border border-border/60 shadow-until",
        theme.bgClassName,
      )}
      aria-hidden="true"
    >
      {/* Big on-image typography (this is what makes it "feel" like the screenshot). */}
      <div className={cn("absolute inset-0 p-6 md:p-7", theme.fgClassName)}>
        <div className="max-w-[18rem] md:max-w-88">
          <p className="text-xs font-medium opacity-80">Novità</p>
          <p className="mt-3 text-2xl md:text-3xl font-semibold leading-none text-balance">
            {news.title}
          </p>
        </div>
      </div>

      {/* Stacked image previews (closer to Acctual's thumbnail composition).
          Intentionally pushed outwards so they're more "cropped" in the corner. */}
      <div className="absolute -right-12 -bottom-20 md:-right-16 md:-bottom-28 opacity-95">
        {/* Back preview */}
        <div className="relative size-48 md:size-56 rotate-12 opacity-90">
          <div className="absolute inset-0 rounded-[22px] bg-white p-1.5 shadow-until ring-1 ring-black/10">
            <div className="relative size-full overflow-hidden rounded-[18px]">
              <Image
                src={previewB.src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 192px, 224px"
                priority={false}
              />
            </div>
          </div>
        </div>

        {/* Front preview */}
        <div className="relative -mt-40 md:-mt-46 -ml-14 md:-ml-16 size-44 md:size-52 -rotate-6">
          <div className="absolute inset-0 rounded-[22px] bg-white p-1.5 shadow-until ring-1 ring-black/10">
            <div className="relative size-full overflow-hidden rounded-[18px]">
              <Image
                src={previewA.src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 176px, 208px"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewsTile({ news }: { news: MarketingNews }) {
  const dateLabel = formatNewsDateCompactIt(news.publishedDate);

  return (
    <a
      href={news.href}
      className={cn(
        "group block rounded-[28px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      )}
      aria-label={`Scopri di più: ${news.title}`}
    >
      <div className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
        <NewsPoster news={news} />
      </div>

      {/* Date + title underneath, like the Blog grid. */}
      <div className="mt-3 px-1">
        <p className="text-xs md:text-sm text-muted-foreground tabular-nums">
          {dateLabel}
        </p>
        <div className="mt-1 flex items-start justify-between gap-3">
          <h3 className="text-sm md:text-base font-semibold leading-snug text-balance">
            {news.title}
          </h3>
          <ArrowUpRight
            className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </div>
      </div>
    </a>
  );
}

export default function NovitàPage() {
  return (
    <main className="relative rounded-b-3xl drop-shadow-2xl z-10 overflow-hidden bg-background">
      {/* Hero — match Acctual "Blog" pattern: a big, centered single headline. */}
      <section className="px-4 md:px-8 pt-24 md:pt-54 pb-10 md:pb-14">
        <div className="mx-auto w-full max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-none text-balance">
            Novità
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Scopri tutte le ultime novità, aggiornamenti e comunicazioni da
            DataWeb Group.
          </p>
        </div>
      </section>

      {/* Section switcher (Acctual-like "simple, obvious segmentation").
          This avoids heavy JS: it's just anchor navigation + clear visual grouping. */}
      <section className="px-4 md:px-8 pb-8">
        <div className="mx-auto w-full max-w-5xl">
          <nav
            aria-label="Sezioni novità"
            className="mx-auto w-full max-w-xl rounded-full border border-border/60 bg-card p-1 shadow-until"
          >
            <div className="grid grid-cols-2 gap-1">
              <a
                href="#recenti"
                className={cn(
                  "flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium",
                  "transition-colors duration-200 ease-out hover:bg-accent",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "touch-action-manipulation",
                )}
              >
                <span>Recenti</span>
                <span className="inline-flex items-center rounded-full bg-background px-2 py-0.5 text-xs tabular-nums text-muted-foreground border border-border/60">
                  {RECENT_NEWS.length}
                </span>
              </a>
              <a
                href="#archivio"
                className={cn(
                  "flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium",
                  "transition-colors duration-200 ease-out hover:bg-accent",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "touch-action-manipulation",
                )}
              >
                <span>Archivio</span>
                <span className="inline-flex items-center rounded-full bg-background px-2 py-0.5 text-xs tabular-nums text-muted-foreground border border-border/60">
                  {ARCHIVED_NEWS.length}
                </span>
              </a>
            </div>
          </nav>
        </div>
      </section>

      {/* Grid — closer to the screenshot: center column, 2-up on desktop, with big gaps. */}
      <section className="px-4 md:px-8 pb-18 md:pb-24">
        <div className="mx-auto w-full max-w-5xl">
          {/* Keep section labels subtle so the layout stays "Blog-like". */}
          <div id="recenti" className="scroll-mt-24">
            <div className="flex items-baseline justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl md:text-2xl font-semibold text-balance">
                  Novità recenti
                </h2>
                <p className="text-sm text-muted-foreground text-pretty">
                  Gli ultimi aggiornamenti e comunicazioni da DataWeb.
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium tabular-nums text-muted-foreground">
                {RECENT_NEWS.length} novità
              </span>
            </div>
            <div className="mt-6 grid gap-x-10 gap-y-14 md:grid-cols-2">
              {RECENT_NEWS.map((news) => (
                <NewsTile key={news.id} news={news} />
              ))}
            </div>
          </div>

          {/* Stronger separation for "Archive" — clear divider like Acctual's section breaks. */}
          <div
            className="my-16 md:my-20 h-px bg-border/60"
            aria-hidden="true"
          />

          <div id="archivio" className="scroll-mt-24">
            <div className="flex items-baseline justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl md:text-2xl font-semibold text-balance">
                  Archivio novità
                </h2>
                <p className="text-sm text-muted-foreground text-pretty">
                  Le comunicazioni e gli aggiornamenti precedenti.
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium tabular-nums text-muted-foreground">
                {ARCHIVED_NEWS.length} novità
              </span>
            </div>
            <div className="mt-6 grid gap-x-10 gap-y-14 md:grid-cols-2">
              {ARCHIVED_NEWS.map((news) => (
                <NewsTile key={news.id} news={news} />
              ))}
            </div>
          </div>

          {/* CTA similar to the "blog grid page footer" vibe: simple and centered. */}
          <div className="mt-20 md:mt-24 text-center">
            <p className="text-base md:text-lg font-semibold text-balance">
              Vuoi ricevere aggiornamenti sulle novità DataWeb?
            </p>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
              Contattaci e ti terremo informato sulle ultime novità e
              aggiornamenti dei nostri prodotti.
            </p>
            <a
              href="https://www.dataweb-srl.it/contatti/"
              className={cn(
                "mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground",
                "transition-colors duration-200 ease-out hover:bg-primary/90",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                "touch-action-manipulation",
              )}
            >
              Contattaci
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
