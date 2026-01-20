import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  FileText,
  Truck,
  ScanLine,
  Globe,
  Archive,
  Clock,
  Shield,
  Leaf,
  Search,
  Smartphone,
  Building,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Soluzioni per Notai e Studi Professionali | Dataweb Group",
  description:
    "Notar Share Doc: deposito documenti, digitalizzazione archivi e portale web per studi notarili. Scansione on-demand e conservazione sostitutiva.",
};

/**
 * Process steps for the horizontal workflow section.
 * Based on the actual DataWeb digitalization process.
 */
const WORKFLOW_STEPS = [
  {
    icon: Truck,
    title: "Ritiro documenti",
    description: "Ritiriamo i fascicoli presso il tuo Studio con nostri collaboratori e automezzi.",
  },
  {
    icon: FileText,
    title: "Normalizzazione",
    description: "Rimozione punti metallici, inserimento QR code, suddivisione in sotto-fascicoli.",
  },
  {
    icon: ScanLine,
    title: "Digitalizzazione",
    description: "Scansione professionale e inserimento metadati per ricerche future.",
  },
  {
    icon: Globe,
    title: "Portale Web",
    description: "Pubblicazione su piattaforma web accessibile da browser, tablet e smartphone.",
  },
] as const;

/**
 * Features grid data.
 * Based on real DataWeb services and benefits.
 */
const FEATURES = [
  {
    icon: Archive,
    title: "Deposito Documenti",
    description: "Strutture di archiviazione sicure con conformità D.lgs. 81/08 e normativa antincendio.",
  },
  {
    icon: ScanLine,
    title: "Scansione On-Demand",
    description: "Accesso rapido ai fascicoli digitalizzati. Consegna cartacea disponibile su richiesta.",
  },
  {
    icon: Search,
    title: "Ricerca Avanzata",
    description: "Campi di ricerca personalizzabili. Trova qualsiasi documento in pochi click.",
  },
  {
    icon: Shield,
    title: "Sicurezza GDPR",
    description: "Conformità al Regolamento 2016/679. Protezione dati sensibili con accessi autorizzati.",
  },
  {
    icon: Smartphone,
    title: "Accesso Multidevice",
    description: "Consulta i documenti da qualsiasi postazione, smartphone o tablet.",
  },
  {
    icon: Leaf,
    title: "Sostenibilità",
    description: "Riduci l'uso di carta e contribuisci a un futuro più sostenibile per l'ambiente.",
  },
] as const;

/**
 * Pain points for the dark section.
 * Based on real problems DataWeb solves.
 */
const PAIN_POINTS = [
  "Perdi ore a cercare documenti nell'archivio cartaceo",
  "Lo spazio del tuo studio è invaso da faldoni e scatole",
  "Non hai accesso ai fascicoli quando sei fuori dall'ufficio",
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

export default function ServiziNotaiEStudiPage() {
  return (
    <main className="relative rounded-b-3xl drop-shadow-2xl z-10 overflow-hidden bg-[#F7F7F5]">
      {/* Hero Section */}
      <section className="relative px-4 md:px-8 pt-24 md:pt-44 pb-16 md:pb-24">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-[5%] hidden lg:block">
          <div className="rotate-[-8deg]">
            <div className="rounded-lg bg-white p-3 shadow-lg border border-neutral-200/60">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded bg-blue-100 flex items-center justify-center text-xs">
                  📁
                </div>
                <div className="text-xs">
                  <p className="font-medium text-neutral-900">Fascicolo 2024</p>
                  <p className="text-neutral-500">Digitalizzato</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-28 right-[8%] hidden lg:block">
          <div className="rotate-6">
            <div className="rounded-lg bg-yellow-300 p-3 shadow-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              <p className="text-sm font-medium text-neutral-800">
                Addio carta,<br />benvenuto digitale! 🎉
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 left-[8%] hidden lg:block">
          <div className="rotate-3">
            <div className="rounded-xl bg-white p-4 shadow-lg border border-neutral-200/60">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-emerald-400" />
                <span className="text-xs text-neutral-600">Scansione completata</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 right-[10%] hidden lg:block">
          <div className="rotate-[-5deg]">
            <div className="rounded-full bg-blue-500 size-12 flex items-center justify-center shadow-lg">
              <Archive className="size-5 text-white" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto w-full max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-neutral-900 tracking-tight">
            Il tuo archivio notarile
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">sempre a portata di click</span>
              <span
                className="absolute left-0 bottom-1 md:bottom-2 w-full h-3 md:h-4 bg-yellow-300 z-0 -rotate-1"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="mt-6 md:mt-8 text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Deposito documenti, digitalizzazione archivi e{" "}
            <span className="font-medium text-neutral-900">scansione on-demand</span>.{" "}
            Accedi ai tuoi fascicoli da qualsiasi dispositivo.
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
            Leader in Italia per <span className="font-medium text-neutral-700">deposito e digitalizzazione</span> documenti notarili
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
                  notarsharedoc.dataweb.it
                </div>
              </div>
            </div>
            {/* Screenshot placeholder */}
            <div className="aspect-video bg-neutral-100 flex items-center justify-center">
              <p className="text-neutral-400 text-sm">Interfaccia Notar Share Doc</p>
            </div>
          </div>
        </div>
      </section>

      {/* "Progetto Prometeo" section */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
            Progetto Prometeo:{" "}
            <span className="relative inline-block">
              <span className="relative z-10">digitalizzazione completa</span>
              <span
                className="absolute left-0 bottom-0 md:bottom-1 w-full h-2 md:h-3 bg-yellow-300 z-0 -rotate-1"
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
            Gli Studi Notarili orientati ad un futuro con meno carta affrontano la sfida di digitalizzare 
            i documenti cartacei. Dataweb garantisce un servizio studiato nei minimi dettagli.
          </p>
        </div>
      </section>

      {/* Workflow Steps — Digitalization process */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Il processo di digitalizzazione
              <br />
              in 4 semplici fasi
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
            {/* Quote mark */}
            <div className="absolute -top-4 -left-2 text-6xl text-neutral-200 font-serif">"</div>
            <blockquote className="text-lg md:text-xl text-neutral-700 leading-relaxed pl-8">
              Con Notar Share Doc abbiamo recuperato spazi fisici preziosi e ridotto drasticamente i tempi di ricerca. 
              La scansione on-demand ci permette di accedere ai fascicoli in tempi brevissimi, anche quando siamo 
              fuori dallo studio. Un servizio che ha trasformato il nostro modo di lavorare.
            </blockquote>
            <div className="mt-4 pl-8 text-sm text-neutral-500">
              Studio Notarile, Cliente Dataweb
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
                  <p className="text-neutral-600 text-[10px]">I'M IN<br/>SPREADSHEET<br/>HELL!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-[8%] hidden lg:block">
          <div className="rotate-12">
            <div className="rounded-lg bg-yellow-300 p-3 shadow-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              <p className="text-xs font-medium text-neutral-800">
                Questo deve<br/>essere fatto<br/>SUBITO! 😤
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 right-[15%] hidden lg:block">
          <div className="rotate-6">
            <div className="rounded-lg bg-pink-200 p-3 shadow-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              <p className="text-xs font-medium text-neutral-800">
                Ping cliente<br/>per fattura.<br/>NVM, Pagato!
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl text-center relative z-10">
          <p className="text-sm font-medium text-white/60 mb-4">
            Stanco di soluzioni improvvisate?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Se rispondi sì a una di queste, Notar Share Doc è la{" "}
            <span className="text-yellow-300">soluzione che fa per te.</span>
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
              Prova Notar Share Doc
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-4 md:px-8 py-20 md:py-32 bg-[#F7F7F5]">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 tracking-tight">
              Vantaggi per il tuo studio
            </h2>
            <p className="mt-4 text-base md:text-lg text-neutral-600 max-w-xl mx-auto">
              Digitalizza il tuo archivio e accedi ai documenti da qualsiasi dispositivo.
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
              Pronto a digitalizzare il tuo archivio?
            </h2>
            <p className="mt-4 text-base text-neutral-600 max-w-lg mx-auto">
              Contattaci per un preventivo gratuito e scopri come Notar Share Doc può liberare spazio 
              e tempo nel tuo studio.
            </p>
            <div className="mt-8">
              <Link
                href="https://www.dataweb-srl.it/contatti/"
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3.5 text-sm font-medium text-white",
                  "transition-colors duration-200 hover:bg-neutral-800",
                )}
              >
                Richiedi un preventivo
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
