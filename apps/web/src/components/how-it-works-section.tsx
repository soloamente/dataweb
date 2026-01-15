"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

// Steps in the process
const steps = [
  {
    number: "01",
    title: "Analisi e Consulenza",
    description:
      "Analizziamo le tue esigenze e progettiamo una soluzione personalizzata per la tua azienda.",
  },
  {
    number: "02",
    title: "Implementazione",
    description:
      "Implementiamo la soluzione con un team dedicato che ti accompagna in ogni fase del progetto.",
  },
  {
    number: "03",
    title: "Formazione e Supporto",
    description:
      "Formiamo il tuo team e forniamo supporto continuo per garantire il successo della trasformazione digitale.",
  },
  {
    number: "04",
    title: "Monitoraggio e Ottimizzazione",
    description:
      "Monitoriamo costantemente le performance e ottimizziamo i processi per massimizzare i risultati.",
  },
] as const;

export default function HowItWorksSection() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-primary-foreground/5">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 text-balance">
            Come funziona
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Un processo semplice e guidato per trasformare la gestione documentale della tua
            azienda
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              className="relative"
            >
              {/* Arrow connector - hidden on mobile and last item */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 z-10">
                  <ArrowRight className="w-8 h-8 text-muted-foreground/30" />
                </div>
              )}

              <div className="bg-primary-foreground/15 backdrop-blur-md border border-white/40 rounded-2xl p-6 md:p-8 h-full hover:bg-primary-foreground/25 transition-colors duration-300">
                <div className="text-5xl md:text-6xl font-bold text-foreground/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3">{step.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
