import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Code2,
  Smartphone,
  Globe,
  Database,
  Layers,
  GitBranch,
  Wrench,
  Users,
  Zap,
  Shield,
  MessageSquare,
  Lightbulb,
  Rocket,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sviluppo Software | Dataweb Group",
  description:
    "Sviluppo software su misura per le tue esigenze. Applicazioni web, mobile, integrazioni API e molto altro.",
};

/**
 * Process steps for the horizontal workflow section.
 */
const WORKFLOW_STEPS = [
  {
    icon: Lightbulb,
    title: "Discovery",
    description: "Comprendiamo le tue esigenze e definiamo requisiti e obiettivi.",
  },
  {
    icon: Layers,
    title: "Design",
    description: "Progettiamo architettura e UX con prototipi interattivi.",
  },
  {
    icon: Code2,
    title: "Sviluppo",
    description: "Sviluppiamo in sprint con rilasci frequenti e feedback.",
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "Deployment sicuro e monitorato con supporto continuo.",
  },
] as const;

/**
 * Capabilities grid data.
 */
const CAPABILITIES = [
  {
    icon: Globe,
    title: "Applicazioni Web",
    description: "Web app moderne con React, Next.js e le migliori tecnologie.",
  },
  {
    icon: Smartphone,
    title: "App Mobile",
    description: "App native e cross-platform per iOS e Android.",
  },
  {
    icon: Database,
    title: "Backend & API",
    description: "Architetture scalabili, API RESTful e GraphQL.",
  },
  {
    icon: GitBranch,
    title: "Integrazioni",
    description: "Collegamento con sistemi esistenti e servizi di terze parti.",
  },
  {
    icon: Layers,
    title: "DevOps & CI/CD",
    description: "Pipeline automatizzate e deployment continuo.",
  },
  {
    icon: Wrench,
    title: "Manutenzione",
    description: "Supporto tecnico, aggiornamenti e ottimizzazioni.",
  },
] as const;

/**
 * Tech stack.
 */
const TECH_STACK = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind"] },
  { category: "Backend", items: ["Node.js", "Python", ".NET", "Go"] },
  { category: "Database", items: ["PostgreSQL", "MongoDB", "Redis", "Supabase"] },
  { category: "Cloud", items: ["AWS", "Azure", "GCP", "Vercel"] },
] as const;

/**
 * Pain points for the dark section.
 */
const PAIN_POINTS = [
  "Hai un'idea ma non sai come trasformarla in un prodotto funzionante",
  "Il tuo software attuale è obsoleto e difficile da mantenere",
  "Hai bisogno di integrare sistemi che non comunicano tra loro",
] as const;

export default function ServiziSviluppoPage() {
  return (
    <main className="relative rounded-b-3xl drop-shadow-2xl z-10 overflow-hidden bg-[#F7F7F5]">
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 pt-24 md:pt-44 pb-16 md:pb-24">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-[5%] hidden lg:block">
          <div className="rotate-[-8deg]">
            <div className="rounded-lg bg-white p-3 shadow-lg border border-neutral-200/60">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded bg-violet-100 flex items-center justify-center text-xs">
                  💻
                </div>
                <div className="text-xs">
                  <p className="font-medium text-neutral-900">build.success</p>
                  <p className="text-neutral-500">Deployed ✓</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-28 right-[8%] hidden lg:block">
          <div className="rotate-6">
            <div className="rounded-lg bg-yellow-300 p-3 shadow-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              <p className="text-sm font-medium text-neutral-800">
                Dalla idea<br />al prodotto! 🚀
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 left-[8%] hidden lg:block">
          <div className="rotate-3">
            <div className="rounded-xl bg-white p-4 shadow-lg border border-neutral-200/60 font-mono text-xs">
              <span className="text-violet-600">const</span>{" "}
              <span className="text-blue-600">app</span>{" "}
              <span className="text-neutral-400">=</span>{" "}
              <span className="text-green-600">✓</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 right-[10%] hidden lg:block">
          <div className="rotate-[-5deg]">
            <div className="rounded-full bg-violet-500 size-12 flex items-center justify-center shadow-lg">
              <Code2 className="size-5 text-white" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto w-full max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-neutral-900 tracking-tight">
            Hai un'idea ma non sai
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">come realizzarla?</span>
              <span
                className="absolute left-0 bottom-1 md:bottom-2 w-full h-3 md:h-4 bg-yellow-300 z-0 -rotate-1"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="mt-6 md:mt-8 text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Sviluppiamo software su misura che trasforma le tue idee in prodotti reali.{" "}
            <span className="font-medium text-neutral-900">Dal concept al deploy</span>, siamo al tuo fianco.
          </p>

          <div className="mt-8 md:mt-10">
            <Link
              href="https://www.dataweb-srl.it/contatti/"
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white",
                "transition-colors duration-200 hover:bg-neutral-800",
              )}
            >
              Parliamo del tuo progetto
            </Link>
          </div>

          <p className="mt-10 text-sm text-neutral-500">
            <span className="font-medium text-neutral-700">30+ anni</span> di esperienza nello sviluppo software
          </p>
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative rounded-2xl bg-[#1E1E1E] border border-neutral-700 p-2 shadow-lg overflow-hidden">
            {/* Editor chrome */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-700">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-yellow-400" />
                <div className="size-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="rounded bg-neutral-800 px-3 py-1 text-xs text-neutral-400">
                  your-idea.ts
                </div>
              </div>
            </div>
            {/* Code content */}
            <div className="p-4 md:p-6 font-mono text-sm md:text-base">
              <div className="space-y-1 text-neutral-300">
                <p>
                  <span className="text-violet-400">const</span>{" "}
                  <span className="text-blue-400">solution</span>{" "}
                  <span className="text-neutral-500">=</span>{" "}
                  <span className="text-yellow-400">await</span>{" "}
                  <span className="text-green-400">develop</span>
                  <span className="text-neutral-300">(</span>
                  <span className="text-orange-400">yourIdea</span>
                  <span className="text-neutral-300">);</span>
                </p>
                <p className="text-neutral-500">
                  {"// Trasformiamo le tue idee in codice"}
                </p>
                <p>&nbsp;</p>
                <p>
                  <span className="text-violet-400">export</span>{" "}
                  <span className="text-blue-400">solution</span>
                  <span className="text-neutral-300">;</span>{" "}
                  <span className="text-green-400">{"// ✓ Ready to ship"}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Steps — Horizontal cards like Acctual */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Se il tuo processo è il tuo prodotto,
              <br />
              ti sentirai a casa.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {WORKFLOW_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="rounded-2xl bg-white border border-neutral-200/80 p-5 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="size-4 text-neutral-500" aria-hidden="true" />
                    <span className="text-sm font-medium text-neutral-900">{step.title}</span>
                  </div>
                  {/* Mini UI mockup placeholder */}
                  <div className="aspect-4/3 rounded-lg bg-neutral-100 border border-neutral-200/60 flex items-center justify-center">
                    <div className="text-xs text-neutral-400">UI Preview</div>
                  </div>
                  <p className="mt-3 text-xs text-neutral-500 leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="rounded-2xl bg-white border border-neutral-200/80 p-8 md:p-12 shadow-sm">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
                Le tecnologie che utilizziamo
              </h2>
              <p className="mt-3 text-base text-neutral-600 max-w-lg mx-auto">
                Stack moderno e collaudato per soluzioni performanti e scalabili.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {TECH_STACK.map((stack) => (
                <div key={stack.category}>
                  <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">
                    {stack.category}
                  </h3>
                  <ul className="space-y-2">
                    {stack.items.map((tech) => (
                      <li key={tech} className="flex items-center gap-2 text-sm text-neutral-700">
                        <div className="size-1.5 rounded-full bg-violet-500" />
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-4xl">
          <div className="relative">
            <div className="absolute -top-4 -left-2 text-6xl text-neutral-200 font-serif">"</div>
            <blockquote className="text-lg md:text-xl text-neutral-700 leading-relaxed pl-8">
              Il team DataWeb ha trasformato la nostra idea in un prodotto che i nostri utenti adorano. 
              La loro competenza tecnica e la capacità di comprendere il nostro business hanno fatto la differenza.
            </blockquote>
            <div className="mt-4 pl-8 text-sm text-neutral-500">
              CTO, Startup cliente
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points — Dark blue section like Acctual */}
      <section className="relative px-4 md:px-8 py-20 md:py-32 bg-[#0F172A] overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-[5%] hidden lg:block">
          <div className="rotate-[-8deg]">
            <div className="rounded-lg bg-red-100 p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl">💡</span>
                <div className="text-xs">
                  <p className="font-medium text-neutral-800">IDEA</p>
                  <p className="text-neutral-600 text-[10px]">COME LA<br/>REALIZZO?</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-[8%] hidden lg:block">
          <div className="rotate-12">
            <div className="rounded-lg bg-yellow-300 p-3 shadow-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              <p className="text-xs font-medium text-neutral-800">
                Il nostro codice<br/>è spaghetti 🍝
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 right-[15%] hidden lg:block">
          <div className="rotate-6">
            <div className="rounded-lg bg-pink-200 p-3 shadow-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              <p className="text-xs font-medium text-neutral-800">
                Bug in<br/>produzione!! 🐛
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl text-center relative z-10">
          <p className="text-sm font-medium text-white/60 mb-4">
            Hai un progetto in mente?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Se ti riconosci in una di queste, possiamo{" "}
            <span className="text-yellow-300">aiutarti.</span>
          </h2>

          <div className="mt-10 space-y-4 text-left max-w-xl mx-auto">
            {PAIN_POINTS.map((point) => (
              <div key={point} className="flex items-start gap-3">
                <div className="mt-1 size-5 rounded border-2 border-white/40 flex items-center justify-center">
                  <CheckCircle2 className="size-3 text-white/80" />
                </div>
                <p className="text-base md:text-lg text-white/90 leading-relaxed">{point}</p>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-white/60 max-w-lg mx-auto">
            Metodologie agili, code review, testing automatizzato. 
            Tutto fatto con le best practice in mente.
          </p>

          <div className="mt-8">
            <Link
              href="https://www.dataweb-srl.it/contatti/"
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900",
                "transition-colors duration-200 hover:bg-neutral-100",
              )}
            >
              Raccontaci la tua idea
            </Link>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="px-4 md:px-8 py-20 md:py-32 bg-[#F7F7F5]">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Cosa possiamo costruire insieme
            </h2>
            <p className="mt-4 text-base md:text-lg text-neutral-600 max-w-xl mx-auto">
              Competenze full-stack per realizzare qualsiasi tipo di progetto software.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((capability) => {
              const Icon = capability.icon;
              return (
                <div
                  key={capability.title}
                  className="rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-sm"
                >
                  <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-neutral-100">
                    <Icon className="size-5 text-neutral-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900">{capability.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {capability.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why us section */}
      <section className="px-4 md:px-8 pb-20 md:pb-32 bg-[#F7F7F5]">
        <div className="mx-auto w-full max-w-5xl">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-sm text-center">
              <div className="mb-4 mx-auto flex size-12 items-center justify-center rounded-full bg-violet-100">
                <Zap className="size-6 text-violet-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Velocità</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Metodologie agili per rilasci rapidi e feedback continuo.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-sm text-center">
              <div className="mb-4 mx-auto flex size-12 items-center justify-center rounded-full bg-emerald-100">
                <Shield className="size-6 text-emerald-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Qualità</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Code review, testing automatizzato e best practice di settore.
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-sm text-center">
              <div className="mb-4 mx-auto flex size-12 items-center justify-center rounded-full bg-blue-100">
                <Users className="size-6 text-blue-600" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">Partnership</h3>
              <p className="mt-2 text-sm text-neutral-600">
                Collaborazione stretta, comunicazione trasparente e supporto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 md:px-8 pb-20 md:pb-32 bg-[#F7F7F5]">
        <div className="mx-auto w-full max-w-4xl">
          <div className="rounded-2xl bg-white border border-neutral-200/80 p-8 md:p-12 shadow-sm text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
              Pronto a costruire qualcosa di grande?
            </h2>
            <p className="mt-4 text-base text-neutral-600 max-w-lg mx-auto">
              Contattaci per una consulenza gratuita e scopri come possiamo trasformare la tua idea in realtà.
            </p>
            <div className="mt-8">
              <Link
                href="https://www.dataweb-srl.it/contatti/"
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3.5 text-sm font-medium text-white",
                  "transition-colors duration-200 hover:bg-neutral-800",
                )}
              >
                Iniziamo a parlare
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
