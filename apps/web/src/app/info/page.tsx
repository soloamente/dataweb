"use client";

import { motion, useReducedMotion } from "motion/react";
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
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="w-full drop-shadow-2xl z-10 overflow-hidden bg-background rounded-b-3xl">
      {/* Hero Section with Background and Text Overlay */}
      <section className="relative min-h-dvh bg-cover bg-center flex items-center justify-center px-4 md:px-8 overflow-show">
        {/* Text Overlay - positioned center-left like the reference */}
        <div className="relative z-10 max-w-5xl w-full gap-4 flex flex-col items-center">
          <h1 className="text-primary text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-none font-bold text-center text-balance">
            Nasce nel 2011 a Brescia con l’obiettivo di digitalizzare i
            documenti. Oggi siamo una realtà consolidata e conosciuta a livello
            nazionale.
          </h1>
          <h2 className="text-primary text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-none font-bold text-center text-balance">
            Siamo un team specializzato nella gestione dei documenti dei dati
            digitali.{" "}
          </h2>
          
          {/* Postcard-style Image */}
          <motion.div
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30, rotate: -2 }
            }
            whileInView={
              prefersReducedMotion ? {} : { opacity: 1, y: 0, rotate: -2 }
            }
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.2 }}
            className="relative w-full max-w-md md:max-w-lg lg:max-w-xl z-5"
          >
            {/* Postcard container with shadow and border */}
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-white/90 bg-white p-1 md:p-1">
              {/* Image with postcard styling */}
              <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden">
                <Image
                  src="/images/image2"
                  alt="Dataweb Group"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
                />
              </div>
            </div>
            {/* Subtle shadow behind postcard for depth */}
            <div className="absolute inset-0 -z-10 bg-black/20 blur-xl rounded-lg transform translate-y-4" />
          </motion.div>

          {/* Decorative clipper images - responsive positioning and visibility */}
          {/* Mobile: Show only a few key images */}
          <img src="/images/clipper1.png" alt="Dataweb Group" className="hidden md:block w-12 md:w-16 lg:w-20 h-auto object-cover absolute bottom-[15rem] md:bottom-60 right-8 md:right-12 lg:right-45 -rotate-140 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper2.png" alt="Dataweb Group" className="hidden lg:block w-12 md:w-14 lg:w-16 h-auto object-cover absolute top-20 md:top-35 right-8 md:right-12 lg:right-20 rotate-45 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper3.png" alt="Dataweb Group" className="hidden lg:block w-16 md:w-20 lg:w-24 h-auto object-cover absolute top-32 md:top-42 left-4 md:left-8 lg:left-10 -rotate-60 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper4.png" alt="Dataweb Group" className="hidden md:block w-16 md:w-24 lg:w-30 h-auto object-cover absolute bottom-20 md:bottom-30 right-8 md:right-20 lg:right-40 rotate-60 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper5.png" alt="Dataweb Group" className="hidden md:block w-16 md:w-24 lg:w-30 h-auto object-cover absolute bottom-[12rem] md:bottom-60 left-8 md:left-20 lg:left-40 rotate-60 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper6.png" alt="Dataweb Group" className="hidden xl:block w-12 md:w-14 lg:w-18 h-auto object-cover absolute top-40 md:top-60 right-12 md:right-40 lg:right-60 rotate-120 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper7.png" alt="Dataweb Group" className="hidden xl:block w-14 md:w-18 lg:w-22 h-auto object-cover absolute -bottom-4 md:-bottom-10 left-[90%] md:left-[85%] lg:left-120 -rotate-45 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper8.png" alt="Dataweb Group" className="hidden xl:block w-10 md:w-12 lg:w-14 h-auto object-cover absolute bottom-[18rem] md:bottom-80 right-[85%] md:right-[80%] lg:right-80 rotate-90 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper9.png" alt="Dataweb Group" className="hidden md:block w-16 md:w-24 lg:w-30 h-auto object-cover absolute bottom-20 md:bottom-30 left-8 md:left-20 lg:left-40 rotate-20 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper10.png" alt="Dataweb Group" className="hidden lg:block w-12 md:w-16 lg:w-20 h-auto object-cover absolute top-48 md:top-80 left-12 md:left-30 lg:left-50 rotate-135 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper11.png" alt="Dataweb Group" className="hidden xl:block w-8 md:w-10 h-auto object-cover absolute -bottom-12 md:-bottom-20 left-[95%] md:left-[90%] lg:left-100 -rotate-80 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper12.png" alt="Dataweb Group" className="hidden xl:block w-12 md:w-14 lg:w-16 h-auto object-cover absolute top-[28rem] md:top-120 right-8 md:right-20 lg:right-30 -rotate-60 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper13.png" alt="Dataweb Group" className="hidden xl:block w-16 md:w-20 lg:w-24 h-auto object-cover absolute bottom-[22rem] md:bottom-91 z-6 left-[85%] md:left-[80%] lg:left-80 rotate-25 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper17.png" alt="Dataweb Group" className="hidden md:block w-10 md:w-12 lg:w-14 h-auto object-cover absolute bottom-8 md:bottom-10 left-8 md:left-20 lg:left-40 -rotate-30 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper19.png" alt="Dataweb Group" className="hidden lg:block w-12 md:w-14 lg:w-16 h-auto object-cover absolute -bottom-4 md:-bottom-10 right-12 md:right-40 lg:right-70 rotate-45 drop-shadow-lg pointer-events-none" />
          <img src="/images/clipper20.png" alt="Dataweb Group" className="hidden lg:block w-12 md:w-14 lg:w-18 h-auto object-cover absolute -top-6 md:-top-12 left-8 md:left-12 lg:left-20 -rotate-70 drop-shadow-lg pointer-events-none" />




        </div>
      </section>

      


      {/* Team Section */}
      <section className="relative min-h-dvh flex items-center justify-center px-4 md:px-8 py-12 md:py-16">
        <div className="max-w-7xl mx-auto w-full">
          {/* Section Header */}
          <motion.div
            initial={
              prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            whileInView={
              prefersReducedMotion ? {} : { opacity: 1, y: 0 }
            }
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-balance text-primary">
              Il team
            </h2>
            <p className="text-base md:text-xl  max-w-3xl mx-auto text-balance text-muted-foreground">
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
                key={`${member.name}-${index}`}
                initial={
                  prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
                }
                whileInView={
                  prefersReducedMotion ? {} : { opacity: 1, y: 0 }
                }
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                  delay: prefersReducedMotion ? 0 : index * 0.1,
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
                    className="object-cover transition-transform duration-200 group-hover:scale-105 grayscale contrast-100"
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-black/30" />

                  {/* Text Content - positioned at bottom using flexbox */}
                  <div className="flex flex-col justify-end  items-center p-2 md:px-8 md:py-5 text-primary-foreground z-10">
                    {/* Role */}
                    <p className="text-xs md:text-sm capitalize text-center text-primary-foreground/60">
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
