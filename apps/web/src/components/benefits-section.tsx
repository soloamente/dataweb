"use client";

import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

// Benefits list
const benefits = [
  "Riduzione dei costi operativi fino al 60%",
  "Tempi di elaborazione documenti ridotti del 80%",
  "Conformità normativa garantita",
  "Accesso ai documenti da qualsiasi dispositivo",
  "Backup automatico e disaster recovery",
  "Supporto tecnico dedicato 24/7",
] as const;

export default function BenefitsSection() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-primary-foreground/5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-balance">
              Perché scegliere DataWeb
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed">
              Trasformiamo la gestione documentale della tua azienda con soluzioni innovative
              che migliorano l'efficienza, riducono i costi e garantiscono la massima sicurezza.
            </p>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{
                    duration: 0.4,
                    ease: "easeOut",
                    delay: index * 0.1,
                  }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-foreground shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-foreground/90">
                    {benefit}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right side - Visual/Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="bg-primary-foreground/15 backdrop-blur-md border border-white/40 rounded-2xl p-8 md:p-12">
              <div className="space-y-8">
                <div className="text-center">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                    350+
                  </div>
                  <div className="text-base md:text-lg text-muted-foreground">
                    Clienti soddisfatti
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-semibold mb-1">98%</div>
                    <div className="text-sm md:text-base text-muted-foreground">
                      Soddisfazione
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-semibold mb-1">24/7</div>
                    <div className="text-sm md:text-base text-muted-foreground">
                      Supporto
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
