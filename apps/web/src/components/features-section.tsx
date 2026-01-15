"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { FileText, Shield, Zap, Users } from "lucide-react";
import { motion } from "motion/react";

// Feature items with icons and descriptions
const features = [
  {
    icon: FileText,
    title: "Digitalizzazione Documenti",
    description:
      "Trasforma i tuoi documenti cartacei in formato digitale con la massima sicurezza e conformità normativa.",
  },
  {
    icon: Shield,
    title: "Sicurezza Avanzata",
    description:
      "Protezione dei dati con crittografia end-to-end e conformità GDPR per garantire la massima sicurezza.",
  },
  {
    icon: Zap,
    title: "Processi Automatizzati",
    description:
      "Automatizza i processi documentali per risparmiare tempo e ridurre gli errori manuali.",
  },
  {
    icon: Users,
    title: "Collaborazione",
    description:
      "Piattaforme collaborative che permettono a team e clienti di lavorare insieme in modo efficiente.",
  },
] as const;

export default function FeaturesSection() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8">
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
            Le nostre soluzioni
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Tecnologie innovative per trasformare la gestione documentale della
            tua azienda
          </p>
        </motion.div>

        {/* Features Grid - Each feature has its own container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
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
                {/* Main Container */}
                <div className="bg-primary-foreground/50 rounded-4xl p-2 md:p-2">
                  <div className="flex flex-col lg:flex-row gap-8 items-center">
                    {/* Left Panel - Feature Content */}
                    <div className="w-full lg:w-2/3 space-y-2">
                      <h3 className="text-xl md:text-2xl leading-none font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Right Panel - Square with Background and Element */}
                    <div className="w-full lg:w-1/3 flex justify-center lg:justify-end">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                          delay: 0.2,
                        }}
                        className="relative rounded-3xl bg-[url('/images/image.png')] bg-cover bg-center w-full max-w-[240px] aspect-square"
                      >
                        {/* Square Container with Background */}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
