"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="relative z-20 w-full py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-card border-2 border-border shadow-2xl rounded-4xl p-8 md:p-12 lg:p-16"
        >
          <div className="flex flex-col gap-6 md:gap-8 items-center text-center">
            {/* Heading and description */}
            <div className="flex flex-col gap-3 md:gap-4 max-w-2xl">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-balance">
                Pronto a iniziare?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground text-balance">
                Contattaci per una consulenza gratuita e scopri come possiamo
                trasformare la gestione documentale della tua azienda.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center w-full sm:w-auto">
              <Link
                href="#contact"
                className="flex px-6 py-3 md:px-8 md:py-3.5 cursor-pointer leading-none bg-primary text-primary-foreground rounded-full text-base md:text-lg font-medium transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Parla con noi
              </Link>
              <Link
                href="/servizi"
                className="flex px-6 py-3 md:px-8 md:py-3.5 cursor-pointer leading-none bg-primary/15 text-foreground rounded-full text-base md:text-lg font-medium transition-colors hover:bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Scopri i servizi
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
