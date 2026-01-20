import type { Metadata } from "next";
import Link from "next/link";
import {
  CheckCircle2,
  Building2,
  FileStack,
  Workflow,
  Cloud,
  LineChart,
  Settings,
  Lock,
  Upload,
  GitMerge,
  Rocket,
  Headphones,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Soluzioni per Aziende | Dataweb Group",
  description:
    "Soluzioni enterprise per la digitalizzazione dei processi aziendali. Consulenza, integrazione e supporto dedicato.",
};

/**
 * Process steps for the horizontal workflow section.
 */
const WORKFLOW_STEPS = [
  {
    icon: Upload,
    title: "Analisi processi",
    description: "Studiamo i tuoi flussi di lavoro per identificare opportunità.",
  },
  {
    icon: GitMerge,
    title: "Progettazione",
    description: "Progettiamo una soluzione integrata con i tuoi sistemi.",
  },
  {
    icon: Rocket,
    title: "Implementazione",
    description: "Deploy graduale, minimizzando l'impatto sulle operazioni.",
  },
  {
    icon: Headphones,
    title: "Supporto continuo",
    description: "Formazione e assistenza per massimizzare il valore.",
  },
] as const;

/**
 * Features grid data.
 */
const FEATURES = [
  {
    icon: FileStack,
    title: "Gestione Documentale",
    description: "Digitalizza, organizza e archivia documenti. Ricerca full-text.",
  },
  {
    icon: Workflow,
    title: "Automazione Processi",
    description: "Automatizza workflow ripetitivi. Approvazioni e task gestiti.",
  },
  {
    icon: Cloud,
    title: "Cloud & On-Premise",
    description: "Soluzioni flessibili: cloud per scalabilità o on-premise.",
  },
  {
    icon: LineChart,
    title: "Business Intelligence",
    description: "Dashboard e report per decisioni data-driven.",
  },
  {
    icon: Settings,
    title: "Integrazioni",
    description: "Collegamento con ERP, CRM e sistemi esistenti.",
  },
  {
    icon: Lock,
    title: "Compliance",
    description: "Conformità GDPR, audit trail e sicurezza personalizzabile.",
  },
] as const;

/**
 * Pain points for the dark section.
 */
const PAIN_POINTS = [
  "I tuoi dipendenti perdono ore a cercare documenti in archivi disorganizzati",
  "I processi di approvazione rallentano il business con email e firme manuali",
  "I sistemi aziendali non comunicano tra loro, creando silos di informazione",
] as const;

/**
 * Pricing tiers.
 */
const PRICING_TIERS = [
  {
    name: "Starter",
    price: "Su richiesta",
    cta: "Contattaci",
    usageLabel: "Utilizzo",
    usage: ["5 utenti inclusi", "10 GB storage"],
    featuresLabel: "Include",
    features: ["Gestione documentale base", "Supporto email"],
    highlighted: false,
  },
  {
    name: "Business",
    price: "Su richiesta",
    cta: "Prova gratis 30 giorni",
    usageLabel: "Utilizzo",
    usage: ["25 utenti inclusi", "100 GB storage"],
    featuresLabel: "Tutto in Starter, più",
    features: ["Workflow automatizzati", "Sync ERP", "Supporto prioritario"],
    highlighted: true,
  },
  {
    name: "Company",
    price: "Su richiesta",
    cta: "Prova gratis 30 giorni",
    usageLabel: "Utilizzo",
    usage: ["100 utenti inclusi", "1 TB storage"],
    featuresLabel: "Tutto in Business, più",
    features: ["Multi-livello approvazioni", "BI avanzata"],
    highlighted: false,
  },
  {
    name: "Enterprise",
    price: "Parliamone",
    cta: "Contattaci",
    usageLabel: "Utilizzo",
    usage: ["Utenti illimitati", "Storage illimitato"],
    featuresLabel: "Tutto in Company, più",
    features: ["Integrazioni custom", "Account manager dedicato"],
    highlighted: false,
  },
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

function PricingCard({ tier }: { tier: (typeof PRICING_TIERS)[number] }) {
  return (
    <div
      className={cn(
        "rounded-2xl p-6",
        tier.highlighted
          ? "bg-white border-2 border-neutral-900 shadow-md"
          : "bg-white border border-neutral-200/80 shadow-sm",
      )}
    >
      <div className="mb-4">
        <h3 className="text-sm font-medium text-neutral-500">{tier.name}</h3>
        <div className="mt-1 flex items-baseline gap-1">
          <span className="text-2xl font-bold text-neutral-900">{tier.price}</span>
        </div>
      </div>

      <Link
        href="https://www.dataweb-srl.it/contatti/"
        className={cn(
          "w-full flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium",
          "transition-colors duration-200",
          tier.highlighted
            ? "bg-neutral-900 text-white hover:bg-neutral-800"
            : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200",
        )}
      >
        {tier.cta}
      </Link>

      <div className="mt-5">
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
          {tier.usageLabel}
        </p>
        <ul className="space-y-1.5">
          {tier.usage.map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm text-neutral-700">
              <CheckCircle2 className="size-3.5 text-neutral-400" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
          {tier.featuresLabel}
        </p>
        <ul className="space-y-1.5">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-neutral-700">
              <CheckCircle2 className="size-3.5 text-neutral-400" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ServiziAziendePage() {
  return (
    <main className="relative z-10 overflow-hidden bg-[#F7F7F5]">
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
                  <p className="font-medium text-neutral-900">Dashboard</p>
                  <p className="text-neutral-500">In tempo reale</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-28 right-[8%] hidden lg:block">
          <div className="rotate-6">
            <div className="rounded-lg bg-yellow-300 p-3 shadow-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              <p className="text-sm font-medium text-neutral-800">
                Processi<br />automatizzati! ⚡
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-20 left-[8%] hidden lg:block">
          <div className="rotate-3">
            <div className="rounded-xl bg-white p-4 shadow-lg border border-neutral-200/60">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-emerald-400" />
                <span className="text-xs text-neutral-600">Sincronizzato</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 right-[10%] hidden lg:block">
          <div className="rotate-[-5deg]">
            <div className="rounded-full bg-emerald-500 size-12 flex items-center justify-center shadow-lg">
              <Building2 className="size-5 text-white" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto w-full max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-neutral-900 tracking-tight">
            Gestire i processi aziendali
            <br />
            ti fa venire voglia di{" "}
            <span className="relative inline-block">
              <span className="relative z-10">strapparti i capelli?</span>
              <span
                className="absolute left-0 bottom-1 md:bottom-2 w-full h-3 md:h-4 bg-yellow-300 z-0 -rotate-1"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="mt-6 md:mt-8 text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Software operativo intuitivo che libera{" "}
            <span className="font-medium text-neutral-900">10-20 ore al mese</span>{" "}
            per il lavoro strategico.
          </p>

          <div className="mt-8 md:mt-10">
            <Link
              href="https://www.dataweb-srl.it/contatti/"
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white",
                "transition-colors duration-200 hover:bg-neutral-800",
              )}
            >
              Inizia ora
            </Link>
          </div>

          <p className="mt-10 text-sm text-neutral-500">
            Scelto da <span className="font-medium text-neutral-700">centinaia</span> di aziende in Italia
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
                  enterprise.dataweb.it
                </div>
              </div>
            </div>
            {/* Screenshot placeholder */}
            <div className="aspect-video bg-neutral-100 flex items-center justify-center">
              <p className="text-neutral-400 text-sm">Dashboard Enterprise</p>
            </div>
          </div>
        </div>
      </section>

      {/* "The way you want it to work" section */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
            La gestione aziendale{" "}
            <span className="relative inline-block">
              <span className="relative z-10">come la vuoi tu</span>
              <span
                className="absolute left-0 bottom-0 md:bottom-1 w-full h-2 md:h-3 bg-yellow-300 z-0 -rotate-1"
                aria-hidden="true"
              />
            </span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
            Se non ami il cambiamento, ti piaceremo. Rendiamo la gestione familiare, 
            in un settore che cerca di reinventare tutto il resto.
          </p>
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
              DataWeb ci ha aiutato a digitalizzare processi che pensavamo impossibili da automatizzare. 
              Il tempo risparmiato ci permette di concentrarci sulla crescita del business invece che sulla burocrazia.
            </blockquote>
            <div className="mt-4 pl-8 text-sm text-neutral-500">
              Direttore Operativo, Azienda cliente dal 2020
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              Nessun limite mensile,
              <br />
              nessun costo nascosto.
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRICING_TIERS.map((tier) => (
              <PricingCard key={tier.name} tier={tier} />
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-neutral-500">
            Scelto da <span className="font-medium">centinaia</span> di aziende in Italia
          </p>
        </div>
      </section>

      {/* Pain Points — Dark blue section like Acctual */}
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
            Se rispondi sì a una di queste, è scientificamente provato che DataWeb renderà la tua vita{" "}
            <span className="text-yellow-300">153% più semplice.</span>
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
              Soluzioni complete per ogni esigenza
            </h2>
            <p className="mt-4 text-base md:text-lg text-neutral-600 max-w-xl mx-auto">
              Strumenti integrati per gestire documenti, processi e dati aziendali.
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
              Pronto a trasformare la tua azienda?
            </h2>
            <p className="mt-4 text-base text-neutral-600 max-w-lg mx-auto">
              Contattaci per una consulenza gratuita e scopri come DataWeb può accelerare la tua trasformazione digitale.
            </p>
            <div className="mt-8">
              <Link
                href="https://www.dataweb-srl.it/contatti/"
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-neutral-900 px-8 py-3.5 text-sm font-medium text-white",
                  "transition-colors duration-200 hover:bg-neutral-800",
                )}
              >
                Richiedi una consulenza
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
