import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  Building2,
  Code2,
  CheckCircle2,
} from "lucide-react";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Servizi | Dataweb Group",
  description:
    "Scopri i servizi DataWeb: software per notai e studi professionali, soluzioni aziendali e sviluppo software personalizzato.",
};

/**
 * Service card data for the main overview.
 */
const SERVICES = [
  {
    id: "notai-e-studi",
    title: "Notai e Studi",
    description:
      "Deposito documenti, digitalizzazione e scansione on-demand. Notar Share Doc è la soluzione leader in Italia.",
    href: "/servizi/notai-e-studi",
    icon: FileText,
    color: "bg-blue-500",
  },
  {
    id: "aziende",
    title: "Aziende",
    description:
      "Gestione documentale con AI, ICARU per vendite e reQuesto con blockchain.",
    href: "/servizi/aziende",
    icon: Building2,
    color: "bg-emerald-500",
  },
  {
    id: "sviluppo",
    title: "Sviluppo",
    description:
      "Software su misura con AI e blockchain. Stack avanzato per soluzioni innovative.",
    href: "/servizi/sviluppo",
    icon: Code2,
    color: "bg-violet-500",
  },
] as const;

function ServiceCard({ service }: { service: (typeof SERVICES)[number] }) {
  const Icon = service.icon;

  return (
    <Link
      href={service.href}
      className={cn(
        "group relative flex flex-col rounded-2xl bg-white p-6 md:p-8",
        "border border-neutral-200/80 shadow-sm",
        "transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "mb-5 flex size-12 items-center justify-center rounded-xl text-white",
          service.color,
        )}
      >
        <Icon className="size-6" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-neutral-900">{service.title}</h3>

      {/* Description */}
      <p className="mt-2 text-sm text-neutral-600 leading-relaxed">
        {service.description}
      </p>

      {/* Arrow */}
      <div className="mt-6 flex items-center gap-2 text-sm font-medium text-neutral-900">
        <span>Scopri di più</span>
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}

export default function ServiziPage() {
  return (
    <main className="relative rounded-b-3xl drop-shadow-2xl z-10 overflow-hidden bg-[#F7F7F5]">
      {/* Hero Section — Acctual-style with floating elements */}
      <section className="relative px-4 md:px-8 pt-24 md:pt-44 pb-20 md:pb-32">
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-[5%] hidden lg:block">
          <div className="relative rotate-[-8deg]">
            <div className="rounded-lg bg-white p-3 shadow-lg border border-neutral-200/60">
              <div className="flex items-center gap-2">
                <div className="size-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <FileText className="size-4 text-white" />
                </div>
                <div className="text-xs">
                  <p className="font-medium text-neutral-900">Notar Share Doc</p>
                  <p className="text-neutral-500">Digitalizzazione Archivi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-32 right-[8%] hidden lg:block">
          <div className="relative rotate-6">
            <div className="rounded-lg bg-yellow-300 p-3 shadow-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              <p className="text-sm font-medium text-neutral-800">
                30+ anni di<br />esperienza! ✨
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-40 left-[10%] hidden lg:block">
          <div className="relative rotate-[4deg]">
            <div className="rounded-xl bg-white p-4 shadow-lg border border-neutral-200/60">
              <div className="text-xs text-neutral-500 mb-1">Clienti attivi</div>
              <div className="text-2xl font-bold text-neutral-900">5.000+</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-32 right-[12%] hidden lg:block">
          <div className="relative rotate-[-4deg]">
            <div className="size-14 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="size-7 text-white" />
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="mx-auto w-full max-w-4xl text-center relative z-10">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-neutral-900 tracking-tight">
            La gestione del lavoro
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">come dovrebbe essere</span>
              {/* Yellow marker highlight effect */}
              <span
                className="absolute left-0 bottom-1 md:bottom-2 w-full h-3 md:h-4 bg-yellow-300 z-0 -rotate-1"
                aria-hidden="true"
              />
            </span>
          </h1>

          <p className="mt-6 md:mt-8 text-base md:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Software e servizi intuitivi che liberano{" "}
            <span className="font-medium text-neutral-900">10-20 ore al mese</span>{" "}
            per concentrarti su ciò che conta davvero.
          </p>

          {/* CTA */}
          <div className="mt-8 md:mt-10">
            <Link
              href="https://www.dataweb-srl.it/contatti/"
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white",
                "transition-colors duration-200 hover:bg-neutral-800",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2",
              )}
            >
              Inizia ora
            </Link>
          </div>

          {/* Social proof */}
          <p className="mt-10 md:mt-14 text-sm text-neutral-500">
            Utilizzato da{" "}
            <span className="font-medium text-neutral-700">5.000+</span>{" "}
            professionisti e aziende in tutta Italia
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 tracking-tight">
              I nostri servizi
            </h2>
            <p className="mt-4 text-base md:text-lg text-neutral-600 max-w-xl mx-auto">
              Soluzioni pensate per le esigenze specifiche di ogni settore.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 md:px-8 pb-20 md:pb-32">
        <div className="mx-auto w-full max-w-5xl">
          <div className="rounded-2xl bg-white border border-neutral-200/80 p-8 md:p-12 shadow-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-neutral-900">30+</div>
                <div className="mt-1 text-sm text-neutral-500">Anni di esperienza</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-neutral-900">5.000+</div>
                <div className="mt-1 text-sm text-neutral-500">Clienti attivi</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-neutral-900">50+</div>
                <div className="mt-1 text-sm text-neutral-500">Professionisti</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-neutral-900">99.9%</div>
                <div className="mt-1 text-sm text-neutral-500">Uptime garantito</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section — Dark blue like Acctual */}
      <section className="relative px-4 md:px-8 py-20 md:py-32 bg-[#0F172A] overflow-hidden">
        {/* Floating decorative elements */}
        <div className="absolute top-10 left-[10%] hidden lg:block">
          <div className="-rotate-12">
            <div className="rounded-lg bg-yellow-300 p-3 shadow-lg" style={{ fontFamily: "Comic Sans MS, cursive" }}>
              <p className="text-sm font-medium text-neutral-800">
                Pronto a<br />iniziare? 🚀
              </p>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-[10%] hidden lg:block">
          <div className="rotate-[8deg]">
            <div className="rounded-xl bg-white/10 backdrop-blur-sm p-4 border border-white/20">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded-full bg-emerald-400" />
                <span className="text-sm text-white/80">Online 24/7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl text-center relative z-10">
          <p className="text-sm font-medium text-white/60 mb-4">
            Pronto a semplificare il tuo lavoro?
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            Contattaci per una consulenza gratuita e scopri come possiamo aiutarti.
          </h2>

          <div className="mt-10">
            <Link
              href="https://www.dataweb-srl.it/contatti/"
              className={cn(
                "inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-neutral-900",
                "transition-colors duration-200 hover:bg-neutral-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]",
              )}
            >
              Contattaci
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
