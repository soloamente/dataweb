import { CaseStudiesHeroCarousel } from "@/components/case-studies-hero-carousel";
import { CASE_STUDIES, NEWEST_CASE_STUDY } from "@/lib/case-studies";

export default function CasiStudioPage() {
  return (
    <main className="w-full drop-shadow-2xl z-10 overflow-hidden bg-background rounded-b-3xl">
      {/* Full-height carousel hero showing the newest project.
          This replaces the old static background image hero. */}
      <CaseStudiesHeroCarousel
        title={NEWEST_CASE_STUDY.title}
        subtitle={NEWEST_CASE_STUDY.summary}
        slides={NEWEST_CASE_STUDY.heroMedia.map((m) => ({
          src: m.src,
          alt: m.alt,
        }))}
      />

      {/* Scroll section: past projects */}
      <section className="px-4 md:px-8 py-14 md:py-18">
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-balance">
              Progetti passati
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl text-pretty">
              Una selezione dei progetti realizzati su misura per i nostri clienti.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {CASE_STUDIES.slice(1).map((project) => (
              <article
                key={project.id}
                className="rounded-3xl border border-border/60 bg-card p-6 shadow-until"
              >
                <h3 className="text-lg md:text-xl font-semibold text-balance">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm md:text-base text-muted-foreground text-pretty">
                  {project.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}