"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 ">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-primary-foreground/50 backdrop-blur-md flex gap-10  rounded-4xl p-8 md:p-12"
        >
          <div className="flex flex-col gap-8 w-full flex-1">
            <div className="flex flex-col gap-1 ">
              <h2 className="text-xl md:text-xl leading-none lg:text-3xl font-semibold mb-4 text-balance">
                Pronto a iniziare?
              </h2>
              <p className="text-base md:text-lg text-muted-foreground  max-w-2xl mx-auto">
                Contattaci per una consulenza gratuita e scopri come possiamo
                trasformare la gestione documentale della tua azienda.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-start items-center">
              <Link
                href="#contact"
                className="flex px-6 py-3 md:px-8 md:py-3.5 cursor-pointer leading-none bg-primary text-primary-foreground rounded-full font-lg transition-colors hover:bg-primary-foreground/90"
              >
                Parla con noi
              </Link>
              <Link
                href="/servizi"
                className="flex px-6 py-3 md:px-8 md:py-3.5 cursor-pointer leading-none bg-primary/15 text-foreground rounded-full font-lg transition-colors hover:bg-primary-foreground/10"
              >
                Scopri i servizi
              </Link>
            </div>
          </div>
          <div className="flex gap-4 flex-row justify-end items-end self-end">
            <div className="flex flex-col gap-2.5">
              <h2> Azienda</h2>
              <div className="flex flex-col gap-2.5 leading-none opacity-70">
                <Link href="/"> Chi siamo</Link>
                <Link href="/">Novità</Link>
                <Link href="/"> Eventi</Link>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <h2> Servizi</h2>
              <div className="flex flex-col gap-2.5 leading-none opacity-70">
                <Link href="/"> Soluzioni per notai e studi professionali</Link>
                <Link href="/"> Soluzioni per aziende private e pubbliche</Link>
                <Link href="/"> Sviluppo software, ai e blockchain</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
