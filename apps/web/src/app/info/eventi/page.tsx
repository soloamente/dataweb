import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  formatEventDateCompactIt,
  PAST_EVENTS,
  UPCOMING_EVENTS,
  type MarketingEvent,
} from "@/lib/events";

// Events marketing page.
// Note: We intentionally keep this first milestone minimal (route + metadata),
// and will build the full Acctual-like visual system + sections in the next tasks.
export const metadata: Metadata = {
  title: "Eventi | Dataweb Group",
  description:
    "Scopri tutti i prossimi appuntamenti a cui parteciperà DataWeb e le iniziative a cui abbiamo preso parte.",
};

/**
 * Deterministic thumbnail selection so the page looks “designed” immediately,
 * even before we add custom images per event.
 */
function getEventThumbnail(eventId: string): { src: string; alt: string } {
  const thumbnails = [
    { src: "/images/document1.png", alt: "Evento Dataweb" },
    { src: "/images/document2.png", alt: "Evento Dataweb" },
    { src: "/images/document3.jpg", alt: "Evento Dataweb" },
    { src: "/images/document4.jpg", alt: "Evento Dataweb" },
    { src: "/images/background_home2.png", alt: "Evento Dataweb" },
    { src: "/images/image.png", alt: "Evento Dataweb" },
  ] as const;

  // Simple stable hash (fast and good enough for a deterministic index).
  let hash = 0;
  for (let i = 0; i < eventId.length; i += 1) {
    hash = (hash * 31 + eventId.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(hash) % thumbnails.length;
  return thumbnails[idx];
}

/**
 * Returns a pair of thumbnails for a “stacked preview” like Acctual’s blog cards.
 * The pair is deterministic per event id.
 */
function getEventPreviewStack(
  eventId: string,
): readonly [{ src: string; alt: string }, { src: string; alt: string }] {
  const first = getEventThumbnail(eventId);

  // Create a second, different thumbnail by hashing with a suffix.
  const second = getEventThumbnail(`${eventId}__alt`);

  return [first, second] as const;
}

/**
 * A light “poster system” to emulate Acctual’s blog thumbnails:
 * bold on-image typography, corner tag, and a simple illustrative layer.
 *
 * We keep this deterministic so each event always gets the same visual.
 */
function getEventPosterTheme(eventId: string): {
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
      bgClassName: "bg-[#FAFAFA]", // light card like the “Payoneer” tile
      fgClassName: "text-neutral-900",
      decoClassName: "bg-neutral-900/5",
    },
  ] as const;

  let hash = 0;
  for (let i = 0; i < eventId.length; i += 1) {
    hash = (hash * 33 + eventId.charCodeAt(i)) | 0;
  }
  const idx = Math.abs(hash) % themes.length;
  return themes[idx];
}

function EventPoster({ event }: { event: MarketingEvent }) {
  const theme = getEventPosterTheme(event.id);
  const [previewA, previewB] = getEventPreviewStack(event.id);

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-[28px] border border-border/60 shadow-until",
        theme.bgClassName,
      )}
      aria-hidden="true"
    >
      {/* Big on-image typography (this is what makes it “feel” like the screenshot). */}
      <div className={cn("absolute inset-0 p-6 md:p-7", theme.fgClassName)}>
        <div className="max-w-[18rem] md:max-w-88">
          <p className="text-xs font-medium opacity-80">Eventi</p>
          <p className="mt-3 text-2xl md:text-3xl font-semibold leading-none text-balance">
            {event.title}
          </p>
        </div>
      </div>

      {/* Subtle “illustration layer”: a rotated document peeking in, like the blog cards. */}
      {/* <div
        className={cn("absolute -right-10 -bottom-10 size-64 rotate-12", theme.decoClassName)}
      /> */}

      {/* Stacked image previews (closer to Acctual’s thumbnail composition).
          Intentionally pushed outwards so they’re more “cropped” in the corner. */}
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

function EventTile({ event }: { event: MarketingEvent }) {
  const dateLabel = formatEventDateCompactIt(event.startDate, event.endDate);

  return (
    <a
      href={event.href}
      className={cn(
        "group block rounded-[28px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      )}
      aria-label={`Scopri di più: ${event.title}`}
    >
      <div className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5">
        <EventPoster event={event} />
      </div>

      {/* Date + title underneath, like the Blog grid. */}
      <div className="mt-3 px-1">
        <p className="text-xs md:text-sm text-muted-foreground tabular-nums">
          {dateLabel}
        </p>
        <div className="mt-1 flex items-start justify-between gap-3">
          <h3 className="text-sm md:text-base font-semibold leading-snug text-balance">
            {event.title}
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

export default function EventsPage() {
  return (
    <main className="relative rounded-b-3xl drop-shadow-2xl z-10 overflow-hidden bg-background">
      {/* Hero — match Acctual “Blog” pattern: a big, centered single headline. */}
      <section className="px-4 md:px-8 pt-24 md:pt-54 pb-10 md:pb-14">
        <div className="mx-auto w-full max-w-6xl text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-none text-balance">
            Eventi
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-pretty">
            Scopri tutti i prossimi appuntamenti a cui parteciperà DataWeb e
            sfoglia l’archivio degli eventi passati.
          </p>
        </div>
      </section>

      {/* Section switcher (Acctual-like “simple, obvious segmentation”).
          This avoids heavy JS: it’s just anchor navigation + clear visual grouping. */}
      <section className="px-4 md:px-8 pb-8">
        <div className="mx-auto w-full max-w-5xl">
          <nav
            aria-label="Sezioni eventi"
            className="mx-auto w-full max-w-xl rounded-full border border-border/60 bg-card p-1 shadow-until"
          >
            <div className="grid grid-cols-2 gap-1">
              <a
                href="#in-programma"
                className={cn(
                  "flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium",
                  "transition-colors duration-200 ease-out hover:bg-accent",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "touch-action-manipulation",
                )}
              >
                <span>In programma</span>
                <span className="inline-flex items-center rounded-full bg-background px-2 py-0.5 text-xs tabular-nums text-muted-foreground border border-border/60">
                  {UPCOMING_EVENTS.length}
                </span>
              </a>
              <a
                href="#passati"
                className={cn(
                  "flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium",
                  "transition-colors duration-200 ease-out hover:bg-accent",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  "touch-action-manipulation",
                )}
              >
                <span>Passati</span>
                <span className="inline-flex items-center rounded-full bg-background px-2 py-0.5 text-xs tabular-nums text-muted-foreground border border-border/60">
                  {PAST_EVENTS.length}
                </span>
              </a>
            </div>
          </nav>
        </div>
      </section>

      {/* Grid — closer to the screenshot: center column, 2-up on desktop, with big gaps. */}
      <section className="px-4 md:px-8 pb-18 md:pb-24">
        <div className="mx-auto w-full max-w-5xl">
          {/* Keep section labels subtle so the layout stays “Blog-like”. */}
          <div id="in-programma" className="scroll-mt-24">
            <div className="flex items-baseline justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl md:text-2xl font-semibold text-balance">
                  Eventi in programma
                </h2>
                <p className="text-sm text-muted-foreground text-pretty">
                  I prossimi appuntamenti a cui parteciperà DataWeb.
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium tabular-nums text-muted-foreground">
                {UPCOMING_EVENTS.length} eventi
              </span>
            </div>
            <div className="mt-6 grid gap-x-10 gap-y-14 md:grid-cols-2">
              {UPCOMING_EVENTS.map((event) => (
                <EventTile key={event.id} event={event} />
              ))}
            </div>
          </div>

          {/* Stronger separation for “Past” — clear divider like Acctual’s section breaks. */}
          <div
            className="my-16 md:my-20 h-px bg-border/60"
            aria-hidden="true"
          />

          <div id="passati" className="scroll-mt-24">
            <div className="flex items-baseline justify-between gap-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl md:text-2xl font-semibold text-balance">
                  Eventi passati
                </h2>
                <p className="text-sm text-muted-foreground text-pretty">
                  Gli appuntamenti a cui abbiamo preso parte.
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-border/60 bg-card px-3 py-1 text-xs font-medium tabular-nums text-muted-foreground">
                {PAST_EVENTS.length} eventi
              </span>
            </div>
            <div className="mt-6 grid gap-x-10 gap-y-14 md:grid-cols-2">
              {PAST_EVENTS.map((event) => (
                <EventTile key={event.id} event={event} />
              ))}
            </div>
          </div>

          {/* CTA similar to the “blog grid page footer” vibe: simple and centered. */}
          <div className="mt-20 md:mt-24 text-center">
            <p className="text-base md:text-lg font-semibold text-balance">
              Vuoi ricevere aggiornamenti sui prossimi eventi?
            </p>
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto text-pretty">
              Contattaci e ti aggiorniamo con i prossimi appuntamenti e le
              iniziative Dataweb.
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

