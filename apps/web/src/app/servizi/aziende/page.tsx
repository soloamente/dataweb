import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Building2,
  FileStack,
  ScanLine,
  Brain,
  LineChart,
  Shield,
  Lock,
  MapPin,
  Users,
  Calendar,
  Blocks,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Soluzioni per Aziende Private e Pubbliche | Dataweb Group",
  description:
    "Gestione documentale con AI, ICARU per reti vendita e reQuesto con blockchain. Digitalizzazione, estrazione dati e software su misura.",
};

/**
 * Process steps for document digitalization workflow.
 * Based on the actual DataWeb service flow.
 */
const WORKFLOW_STEPS = [
  {
    icon: ScanLine,
    title: "Scansione documenti",
    description: "Convertiamo archivi cartacei in digitale con scanner professionali.",
  },
  {
    icon: FileStack,
    title: "Catalogazione",
    description: "Classificazione accurata con metadati: data, tipologia, protocollo.",
  },
  {
    icon: Brain,
    title: "Estrazione dati AI",
    description: "OCR avanzato e intelligenza artificiale per dati strutturati.",
  },
  {
    icon: LineChart,
    title: "Analisi e integrazione",
    description: "Dati pronti per analisi e integrazione nei tuoi sistemi.",
  },
] as const;

/**
 * Features grid data.
 * Based on real DataWeb products: Document Management, ICARU, reQuesto.
 */
const FEATURES = [
  {
    icon: FileStack,
    title: "Gestione Documentale",
    description: "Digitalizzazione, catalogazione intelligente e accesso da qualsiasi dispositivo.",
  },
  {
    icon: Brain,
    title: "Estrazione Dati con AI",
    description: "OCR avanzato per catturare informazioni da fatture, contratti e moduli.",
  },
  {
    icon: Users,
    title: "ICARU - Gestione Vendite",
    description: "CRM per reti vendita: trattative, budget, statistiche e geolocalizzazione.",
  },
  {
    icon: Blocks,
    title: "reQuesto - AI & Blockchain",
    description: "Gestione documentale con data certa blockchain e indicizzazione AI.",
  },
  {
    icon: MapPin,
    title: "Geolocalizzazione",
    description: "Visualizza e analizza le trattative dei tuoi commerciali sul territorio.",
  },
  {
    icon: Lock,
    title: "Sicurezza e Compliance",
    description: "Conformità GDPR, blockchain per integrità e controllo accessi.",
  },
] as const;

/**
 * Pain points for the dark section.
 * Based on real problems DataWeb solves for companies.
 */
const PAIN_POINTS = [
  "Perdi tempo a cercare documenti in archivi cartacei disorganizzati",
  "Non hai visibilità in tempo reale sulle trattative dei tuoi commerciali",
  "L'estrazione manuale dei dati da fatture e contratti rallenta il lavoro",
] as const;

function WorkflowCard({ step }: { step: (typeof WORKFLOW_STEPS)[number] }) {
  const Icon = step.icon;

  return (
    <div className="flex-1 rounded-2xl bg-white border border-neutral-200/80 p-5 shadow-sm">
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
}

export default function ServiziAziendePage() {
  return (
    <main className="relative rounded-b-3xl drop-shadow-2xl z-10 overflow-hidden bg-[#F7F7F5]">
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 pt-24 md:pt-44 pb-16 md:pb-24">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-[5%] hidden lg:block">
          <div className="rotate-[-8deg]">
            <div className="rounded-lg bg-white p-3 shadow-lg border border-neutral-200/60">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded bg-emerald-100 flex items-center justify-center text-xs">
                  📊
                </div>
                <div className="text-xs">
                  <p className="font-medium text-neutral-900">ICARU</p>
                  <p className="text-neutral-500">Vendite in tempo reale</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-28 right-[8%] hidden lg:block">
          <div className="rotate-6">
            <div className="rounded-lg bg-yellow-300 p-3 shadow-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              <p className="text-sm font-medium text-neutral-800">
                Dati estratti<br />in automatico! ⚡
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 left-[8%] hidden lg:block">
          <div className="rotate-3">
            <div className="rounded-xl bg-white p-4 shadow-lg border border-neutral-200/60">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-emerald-400" />
                <span className="text-xs text-neutral-600">Blockchain verificato</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 right-[10%] hidden lg:block">
          <div className="rotate-[-5deg]">
            <div className="rounded-full bg-emerald-500 size-12 flex items-center justify-center shadow-lg">
              <Brain className="size-5 text-white" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto w-full max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-neutral-900 tracking-tight">
            Digitalizza, organizza, estrai.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">Tutto in un unico servizio.</span>
              <span
                className="absolute left-0 bottom-1 md:bottom-2 w-full h-3 md:h-4 bg-yellow-300 z-0 -rotate-1"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="mt-6 md:mt-8 text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Gestione documentale con AI, software vendite{" "}
            <span className="font-medium text-neutral-900">ICARU</span> e{" "}
            <span className="font-medium text-neutral-900">reQuesto</span> con blockchain.
          </p>

          <div className="mt-8 md:mt-10">
            <Link
              href="https://www.dataweb-srl.it/contatti/"
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white",
                "transition-colors duration-200 hover:bg-neutral-800",
              )}
            >
              Richiedi un preventivo
            </Link>
          </div>

          <p className="mt-10 text-sm text-neutral-500">
            Scelto da <span className="font-medium text-neutral-700">aziende private e pubbliche</span> in tutta Italia
          </p>
        </div>
      </section>

      {/* Product Screenshot Section */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative rounded-2xl bg-white border border-neutral-200/80 p-2 shadow-lg overflow-hidden">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-200/60">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-red-400" />
                <div className="size-3 rounded-full bg-yellow-400" />
                <div className="size-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="rounded-full bg-neutral-100 px-4 py-1 text-xs text-neutral-500">
                  icaru.dataweb.it
                </div>
              </div>
            </div>
            {/* Screenshot placeholder */}
            <div className="aspect-video bg-neutral-100 flex items-center justify-center">
              <p className="text-neutral-400 text-sm">Dashboard ICARU - Gestione Vendite</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gestione Documentale section */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
            Trasforma archivi cartacei in{" "}
            <span className="relative inline-block">
              <span className="relative z-10">risorse digitali</span>
              <span
                className="absolute left-0 bottom-0 md:bottom-1 w-full h-2 md:h-3 bg-yellow-300 z-0 -rotate-1"
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
            Ci occupiamo dell'intero processo: dalla scansione alla classificazione automatica, 
            fino all'estrazione dei dati tramite intelligenza artificiale.
          </p>
        </div>
      </section>

      {/* Workflow Steps — Document digitalization process */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Il processo di digitalizzazione
              <br />
              in 4 fasi
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {WORKFLOW_STEPS.map((step) => (
              <WorkflowCard key={step.title} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-4xl">
          <div className="relative">
            <div className="absolute -top-4 -left-2 text-6xl text-neutral-200 font-serif">"</div>
            <blockquote className="text-lg md:text-xl text-neutral-700 leading-relaxed pl-8">
              Con ICARU abbiamo finalmente visibilità in tempo reale sulle trattative dei nostri commerciali. 
              La dashboard ci permette di monitorare budget, fatturati e appuntamenti da un unico posto. 
              Un gestionale semplice e potente che ha trasformato il nostro modo di vendere.
            </blockquote>
            <div className="mt-4 pl-8 text-sm text-neutral-500">
              Direttore Commerciale, Azienda cliente DataWeb
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points — Dark blue section */}
      <section className="relative px-4 md:px-8 py-20 md:py-32 bg-[#0F172A] overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-[5%] hidden lg:block">
          <div className="rotate-[-8deg]">
            <div className="rounded-lg bg-red-100 p-3 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="text-2xl">📋</span>
                <div className="text-xs">
                  <p className="font-medium text-neutral-800">HELLO</p>
                  <p className="text-neutral-600 text-[10px]">SONO IN<br/>EXCEL<br/>HELL!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-[8%] hidden lg:block">
          <div className="rotate-12">
            <div className="rounded-lg bg-yellow-300 p-3 shadow-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              <p className="text-xs font-medium text-neutral-800">
                Perché è così<br/>lento?? 🐢
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 right-[15%] hidden lg:block">
          <div className="rotate-6">
            <div className="rounded-lg bg-pink-200 p-3 shadow-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              <p className="text-xs font-medium text-neutral-800">
                Dove ho messo<br/>quel file?? 📂
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl text-center relative z-10">
          <p className="text-sm font-medium text-white/60 mb-4">
            Stanco di soluzioni improvvisate?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Se rispondi sì a una di queste, le soluzioni DataWeb fanno{" "}
            <span className="text-yellow-300">al caso tuo.</span>
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
            Nessun limite mensile, nessun costo nascosto. Tutto fatto con la conformità in mente, 
            proprio come sei abituato.
          </p>

          <div className="mt-8">
            <Link
              href="https://www.dataweb-srl.it/contatti/"
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900",
                "transition-colors duration-200 hover:bg-neutral-100",
              )}
            >
              Scopri le soluzioni
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 md:px-8 py-20 md:py-32 bg-[#F7F7F5]">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              I nostri prodotti per le aziende
            </h2>
            <p className="mt-4 text-base md:text-lg text-neutral-600 max-w-xl mx-auto">
              Gestione documentale, CRM vendite ICARU e reQuesto con AI e blockchain.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="rounded-2xl bg-white border border-neutral-200/80 p-6 shadow-sm"
                >
                  <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-neutral-100">
                    <Icon className="size-5 text-neutral-600" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900">{feature.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 md:px-8 pb-20 md:pb-32 bg-[#F7F7F5]">
        <div className="mx-auto w-full max-w-4xl">
          <div className="rounded-2xl bg-white border border-neutral-200/80 p-8 md:p-12 shadow-sm text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 tracking-tight">
              Pronto a digitalizzare la tua azienda?
            </h2>
            <p className="mt-4 text-base text-neutral-600 max-w-lg mx-auto">
              Contattaci per un preventivo gratuito. Riduci i costi, aumenta la precisione, valorizza i tuoi documenti.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="https://www.dataweb-srl.it/contatti/"
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3.5 text-sm font-medium text-white",
                  "transition-colors duration-200 hover:bg-neutral-800",
                )}
              >
                Richiedi un preventivo
              </Link>
              <Link
                href="https://www.dataweb-srl.it/contatti/"
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-neutral-100 px-8 py-3.5 text-sm font-medium text-neutral-900",
                  "transition-colors duration-200 hover:bg-neutral-200",
                )}
              >
                Prenota demo ICARU
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
