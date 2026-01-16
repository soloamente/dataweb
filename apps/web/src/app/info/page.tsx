"use client";

import { motion } from "motion/react";
import Image from "next/image";

// Team members data - can be customized with actual team member information
const teamMembers = [
  {
    name: "Fulvio Lovo",
    role: "CEO",
    description:
      "CEO di Dataweb Group con una vasta esperienza nel settore del marketing.",
    image: "/images/team/team.jpg", // Replace with actual team member photos
  },
  {
    name: "Alessandro Maruelli",
    role: "Backend Developer",
    description:
      "Alessandro è un backend developer con una vasta esperienza nel settore del marketing.",
    image: "/images/team/team.jpg", // R
  },
  {
    name: "Nome Cognome",
    role: "Ruolo / Posizione",
    description:
      "Breve descrizione del membro del team e delle sue competenze.",
    image: "/images/team/team.jpg", // R
  },
  {
    name: "Nome Cognome",
    role: "Ruolo / Posizione",
    description:
      "Breve descrizione del membro del team e delle sue competenze.",
    image: "/images/team/team.jpg",
  },
  {
    name: "Nome Cognome",
    role: "Ruolo / Posizione",
    description:
      "Breve descrizione del membro del team e delle sue competenze.",
    image: "/images/team/team.jpg",
  },
  {
    name: "Nome Cognome",
    role: "Ruolo / Posizione",
    description:
      "Breve descrizione del membro del team e delle sue competenze.",
    image: "/images/team/team.jpg",
  },
  {
    name: "Nome Cognome",
    role: "Ruolo / Posizione",
    description:
      "Breve descrizione del membro del team e delle sue competenze.",
    image: "/images/team/team.jpg",
  },
  {
    name: "Nome Cognome",
    role: "Ruolo / Posizione",
    description:
      "Breve descrizione del membro del team e delle sue competenze.",
    image: "/images/team/team.jpg",
  },
] as const;

export default function InfoPage() {
  return (
    <main className="w-full drop-shadow-2xl z-10 overflow-hidden bg-background rounded-b-3xl">
      {/* Hero Section with Background and Text Overlay */}
      <section className="relative min-h-screen bg-[url('/images/background_home.png')] bg-cover bg-center flex items-center justify-center px-4 md:px-8">
        {/* Text Overlay - positioned center-left like the reference */}
        <div className="relative z-10 max-w-5xl w-full gap-4 flex flex-col">
          <h2 className="text-primary-foreground text-4xl md:text-2xl lg:text-3xl xl:text-4xl leading-none font-medium text-center text-balance">
            Nasce nel 2011 a Brescia con l’obiettivo di digitalizzare i
            documenti. Oggi siamo una realtà consolidata e conosciuta a livello
            nazionale.
          </h2>
          <h2 className="text-primary-foreground text-4xl md:text-2xl lg:text-3xl xl:text-4xl leading-none font-medium text-center text-balance">
            Siamo un team specializzato nella gestione dei documenti dei dati
            digitali.{" "}
          </h2>
        </div>
        {/* Optional: Subtle gradient overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none" /> */}
      </section>

      {/* Team Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 md:px-8 py-54">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance text-[#989490]">
              Il team
            </h2>
            <p className="text-base md:text-xl  max-w-xl mx-auto text-balance text-[#989490]">
              Il team di Dataweb Group è determinato, flessibile e giovane.
              Grazie alla capacità di adattarsi rapidamente alle evoluzioni
              tecnologiche, garantiamo soluzioni sempre più all'avanguardia per
              estrarre il massimo valore dai dati e dalle esigenze dei clienti.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                className="relative w-full"
              >
                {/* Card with image */}
                <div className="relative rounded-[50px] overflow-hidden aspect-3/4 w-full group border border-white/20 shadow-lg flex flex-col justify-end">
                  {/* Image with grayscale effect */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 grayscale contrast-100"
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/30 to-black/80" />

                  {/* Text Content - positioned at bottom using flexbox */}
                  <div className="flex flex-col justify-end  items-center p-2 md:px-8 md:py-5 text-primary-foreground z-10">
                    {/* Role */}
                    <p className="text-xs md:text-sm capitalize tracking-wide  text-center text-primary-foreground/60">
                      {member.role}
                    </p>
                    {/* Name */}
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 text-primary-foreground text-center">
                      {member.name}
                    </h3>
                    {/* Description */}
                    <p className="text-sm md:text-base text-center text-primary-foreground/60 leading-tight text-pretty">
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
