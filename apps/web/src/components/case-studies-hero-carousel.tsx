"use client";

/**
 * IMPORTANT NOTE ABOUT `motion-plus/react`
 * ---------------------------------------
 * The public npm `motion-plus` package does NOT include the Motion+ Carousel.
 * Motion+ Carousel requires installing from Motion's private registry using a token.
 *
 * You asked to use this code as the base:
 *   import { Carousel, useCarousel, useTickerItem } from "motion-plus/react"
 *
 * We keep the *structure and UX* (arrows + thumbnail pill + parallax feel),
 * but implement the carousel using Motion for React (`motion/react`) so your app builds
 * without needing the private registry token.
 *
 * If you provide a Motion+ token + private registry install URL, we can switch back
 * to the real Motion+ Carousel API later.
 */

import * as React from "react";
import type { MotionValue } from "motion/react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";

import { cn } from "@/lib/utils";

export interface HeroCarouselSlide {
  src: string;
  alt: string;
}

function useCarouselController(totalPages: number) {
  const [currentPage, setCurrentPage] = React.useState(0);

  // For the hero carousel we default to looping behavior, like Motion+ `loop={true}`.
  // When `totalPages <= 1` the nav is effectively disabled.
  const isPrevActive = totalPages > 1;
  const isNextActive = totalPages > 1;

  function gotoPage(index: number) {
    setCurrentPage(Math.max(0, Math.min(totalPages - 1, index)));
  }

  function nextPage() {
    if (totalPages <= 1) return;
    gotoPage((currentPage + 1) % totalPages);
  }

  function prevPage() {
    if (totalPages <= 1) return;
    gotoPage((currentPage - 1 + totalPages) % totalPages);
  }

  return {
    currentPage,
    totalPages,
    gotoPage,
    nextPage,
    prevPage,
    isPrevActive,
    isNextActive,
  };
}

function AutoplayProgressOutline({
  progress,
}: {
  /**
   * A MotionValue in the range [0..1].
   * Used to "draw" the outline around the active thumbnail.
   */
  progress: MotionValue<number>;
}) {
  // We draw a rounded-rect stroke using stroke-dashoffset.
  // ViewBox is fixed so the outline always matches the preview chip ratio (w-20 / h-12).
  // NOTE: We use `pathLength` to normalize the stroke length (rounded corners included),
  // so progress always starts at the exact same point and finishes cleanly.
  const rectWidth = 96;
  const rectHeight = 56;
  const dashOffset = useTransform(progress, [0, 1], [1, 0]);

  return (
    <motion.svg
      className="absolute inset-0 pointer-events-none"
      viewBox="0 0 100 60"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.rect
        x="2"
        y="2"
        width={rectWidth}
        height={rectHeight}
        // Matches `rounded-xl` feel once scaled to the chip size.
        rx="12"
        fill="none"
        stroke="rgba(255,255,255,0.95)"
        // Thicker, like the reference: this is the "autoplay loading outline".
        strokeWidth="4"
        // Normalize the full stroke length to 1 for stable progress.
        pathLength={1}
        strokeDasharray="1"
        style={{ strokeDashoffset: dashOffset }}
      />
    </motion.svg>
  );
}

function NavigationPill({
  slides,
  currentPage,
  totalPages,
  gotoPage,
  autoplaySeconds,
  isAutoplayEnabled,
  autoplayProgress,
}: {
  slides: readonly HeroCarouselSlide[];
  currentPage: number;
  totalPages: number;
  gotoPage: (index: number) => void;
  autoplaySeconds: number;
  isAutoplayEnabled: boolean;
  autoplayProgress: MotionValue<number>;
}) {
  // Visual parity with your base snippet:
  // - arrows fade when disabled
  // - thumbnail pill sits near the bottom
  // - selected thumbnail gets a strong outline
  void totalPages;

  return (
    <div className="absolute inset-x-0 bottom-5 md:bottom-5 flex items-center justify-center px-4 pointer-events-none">
      {/* Pointer-events are re-enabled on the pill so the hero surface stays “clean”. */}
      <div
        className={cn(
          "pointer-events-auto flex items-center gap-3 rounded-[1.5rem] border border-border/60 bg-card/70 px-3 py-2 shadow-until",
          "backdrop-blur-md",
        )}
      >
        {/* Thumbnail previews — rectangular, like your reference. */}
        <div className="flex items-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={`${slide.src}-${i}`}
              type="button"
              className={cn(
                // Rectangular preview “chips” inside the pill.
                // Bigger previews, like the screenshot.
                "relative h-15 w-20 md:w-30 overflow-hidden rounded-xl border border-border/30",
                "bg-muted/40",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              )}
              aria-label={`Anteprima immagine ${i + 1}`}
              onClick={() => gotoPage(i)}
            >
              <img
                src={slide.src}
                alt=""
                className="size-full object-cover grayscale opacity-70"
                draggable={false}
              />

              {/* Active state: white outline + autoplay progress around the rectangle. */}
              {currentPage === i ? (
                <>
                  <span
                    className="absolute inset-0 rounded-xl ring-1 ring-white/30"
                    aria-hidden="true"
                  />
                  {isAutoplayEnabled && totalPages > 1 ? (
                    <AutoplayProgressOutline progress={autoplayProgress} />
                  ) : (
                    <span
                      className="absolute inset-0 rounded-xl ring-2 ring-white/90"
                      aria-hidden="true"
                    />
                  )}
                </>
              ) : null}
            </button>
          ))}
        </div>

        {/* Keep autoplaySeconds referenced to avoid unused prop warnings if you
            choose to hide/relayout controls later. */}
        <span className="sr-only">Autoplay: {autoplaySeconds}s</span>

      </div>
    </div>
  );
}

function HeroSlide({
  src,
  alt,
  parallax,
}: {
  src: string;
  alt: string;
  parallax: MotionValue<string>;
}) {
  // Parallax is driven by the carousel's drag/progress motion value.
  // This keeps the “moving image” feel from your base snippet without Motion+ hooks.
  const x = parallax;

  return (
    <div className="relative h-dvh w-full overflow-hidden rounded-none">
      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        className="absolute inset-0 size-full object-cover"
        style={{ x, scale: 1.1 }}
      />
      {/* Light scrim to keep overlaid text readable without gradients. */}
      <div className="absolute inset-0 bg-black/15" aria-hidden="true" />
    </div>
  );
}

export function CaseStudiesHeroCarousel({
  title,
  subtitle,
  slides,
  autoplaySeconds = 6,
}: {
  title: string;
  subtitle: string;
  slides: readonly HeroCarouselSlide[];
  autoplaySeconds?: number;
}) {
  const controller = useCarouselController(slides.length);
  const dragX = useMotionValue(0);
  const prefersReducedMotion = useReducedMotion();
  const autoplayProgress = useMotionValue(0);

  // Convert drag distance into a subtle parallax shift.
  const parallax = useTransform(dragX, [-300, 0, 300], ["6%", "0%", "-6%"]);

  // Each page is 100% width; we animate via transform (GPU-friendly).
  const trackX = `-${controller.currentPage * 100}%`;

  function handleDragEnd(_: unknown, info: { offset: { x: number } }) {
    // Small, forgiving gesture threshold.
    const threshold = 80;
    if (info.offset.x < -threshold) controller.nextPage();
    if (info.offset.x > threshold) controller.prevPage();
  }

  // Autoplay (mirrors your Motion+ example): animate 0→1, then go next page.
  // We honor prefers-reduced-motion by disabling autoplay.
  React.useEffect(() => {
    const isEnabled = !prefersReducedMotion && controller.totalPages > 1;

    if (!isEnabled) {
      autoplayProgress.set(0);
      return;
    }

    autoplayProgress.set(0);

    const animation = animate(autoplayProgress, [0, 1], {
      duration: autoplaySeconds,
      ease: "linear",
      onComplete: controller.nextPage,
    });

    return () => animation.stop();
  }, [
    autoplayProgress,
    autoplaySeconds,
    controller.currentPage,
    controller.nextPage,
    controller.totalPages,
    prefersReducedMotion,
  ]);

  return (
    <section className="relative h-dvh w-full">
      <motion.div
        className="relative h-dvh w-full overflow-hidden"
        // Allow swipe to change slides, like a carousel.
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.08}
        style={{ x: dragX }}
        onDragEnd={handleDragEnd}
      >
        <motion.div
          className="flex h-dvh w-full"
          animate={{ transform: `translateX(${trackX})` }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {slides.map((slide, index) => (
            <div key={`${slide.src}-${index}`} className="h-dvh w-full shrink-0">
              <HeroSlide src={slide.src} alt={slide.alt} parallax={parallax} />
            </div>
          ))}
        </motion.div>
      </motion.div>

      <NavigationPill
        slides={slides}
        currentPage={controller.currentPage}
        totalPages={controller.totalPages}
        gotoPage={controller.gotoPage}
        autoplaySeconds={autoplaySeconds}
        isAutoplayEnabled={!prefersReducedMotion}
        autoplayProgress={autoplayProgress}
      />

      {/* Title block pinned near the bottom-left, like Acctual’s “hero over media” rhythm. */}
      <div className="absolute inset-x-0 bottom-24 md:bottom-28 px-4 md:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs md:text-sm font-medium text-primary-foreground/80">
              Casi studio
            </p>
            <h1 className="mt-3 text-4xl md:text-6xl lg:text-7xl font-semibold leading-none text-balance text-primary-foreground">
              {title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-primary-foreground/80 text-pretty">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

