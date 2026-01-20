"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const documentSources = [
  "/images/document1.png",
  "/images/document2.png",
  "/images/document3.jpg",
  "/images/document4.jpg",
];

// Generate more messy documents by reusing images - scattered around
const generateMessyDocuments = () => {
  const documents = [];
  for (let i = 0; i < 40; i++) {
    documents.push({
      src: documentSources[i % documentSources.length],
      id: `messy-doc-${i}`,
    });
  }
  return documents;
};

const messyDocuments = generateMessyDocuments();

// Original 4 documents for tidy state
const tidyDocuments = documentSources.map((src, index) => ({
  src,
  id: `tidy-doc-${index}`,
}));

// Messy positions - distributed more widely around the entire perimeter
// Much larger distances to spread documents across the full viewport
// More documents on the left side to balance distribution
// Some documents can overlap the hero section (Y values between -200 and +200)
const messyPositions = [
  // Top edge - left to right (much more spread out)
  { x: -1000, y: -600, rotate: -25, scale: 0.85 },
  { x: -850, y: -620, rotate: 18, scale: 0.88 },
  { x: -700, y: -600, rotate: -22, scale: 0.82 },
  { x: -550, y: -580, rotate: 20, scale: 0.86 },
  { x: -400, y: -560, rotate: -18, scale: 0.84 },
  { x: -200, y: -540, rotate: 22, scale: 0.87 },
  { x: 200, y: -540, rotate: -22, scale: 0.87 },
  { x: 400, y: -560, rotate: 18, scale: 0.84 },
  { x: 550, y: -580, rotate: -20, scale: 0.86 },
  { x: 700, y: -600, rotate: 22, scale: 0.82 },
  { x: 850, y: -620, rotate: -18, scale: 0.88 },
  { x: 1000, y: -600, rotate: 25, scale: 0.85 },
  // Right edge - top to bottom (more spread)
  { x: 1050, y: -450, rotate: 28, scale: 0.86 },
  { x: 1000, y: -300, rotate: -22, scale: 0.84 },
  { x: 1020, y: -100, rotate: 24, scale: 0.88 },
  { x: 1000, y: 100, rotate: -20, scale: 0.85 },
  { x: 1020, y: 300, rotate: 22, scale: 0.87 },
  { x: 1050, y: 450, rotate: -26, scale: 0.86 },
  // Bottom edge - right to left (much more spread out)
  { x: 1000, y: 600, rotate: 25, scale: 0.85 },
  { x: 850, y: 620, rotate: -18, scale: 0.88 },
  { x: 700, y: 600, rotate: 22, scale: 0.82 },
  { x: 550, y: 580, rotate: -20, scale: 0.86 },
  { x: 400, y: 560, rotate: 18, scale: 0.84 },
  { x: 200, y: 540, rotate: -22, scale: 0.87 },
  { x: -200, y: 540, rotate: 22, scale: 0.87 },
  { x: -400, y: 560, rotate: -18, scale: 0.84 },
  { x: -550, y: 580, rotate: 20, scale: 0.86 },
  { x: -700, y: 600, rotate: -22, scale: 0.82 },
  { x: -850, y: 620, rotate: 18, scale: 0.88 },
  { x: -1000, y: 600, rotate: -25, scale: 0.85 },
  // Left edge - bottom to top (more documents added for better balance)
  { x: -1050, y: 450, rotate: -28, scale: 0.86 },
  { x: -1000, y: 300, rotate: 22, scale: 0.84 },
  { x: -1020, y: 100, rotate: -24, scale: 0.88 },
  { x: -1000, y: -100, rotate: 20, scale: 0.85 },
  { x: -1020, y: -300, rotate: -22, scale: 0.87 },
  { x: -1050, y: -450, rotate: 26, scale: 0.86 },
  // Additional left side documents to fill gaps
  { x: -900, y: -400, rotate: 15, scale: 0.83 },
  { x: -800, y: -200, rotate: -20, scale: 0.85 },
  { x: -900, y: 0, rotate: 18, scale: 0.87 },
  { x: -800, y: 200, rotate: -22, scale: 0.84 },
  { x: -900, y: 400, rotate: 20, scale: 0.86 },
  // Documents that can overlap the hero section (center area)
  { x: -300, y: -50, rotate: -15, scale: 0.75 },
  { x: -250, y: 50, rotate: 18, scale: 0.78 },
  { x: 250, y: -50, rotate: -18, scale: 0.75 },
  { x: 300, y: 50, rotate: 15, scale: 0.78 },
];

// Tidy positions - organized in a web portal grid layout (2x2 grid)
// Positioned in a container that looks like a web portal
const tidyPositions = [
  { x: -140, y: 120, rotate: 0, scale: 0.65 },
  { x: 20, y: 120, rotate: 0, scale: 0.65 },
  { x: -140, y: 240, rotate: 0, scale: 0.65 },
  { x: 20, y: 240, rotate: 0, scale: 0.65 },
];

export default function DocumentOrganizer() {
  const [isOrganized, setIsOrganized] = useState(false);

  const handleOrganize = () => {
    setIsOrganized(true);
  };

  return (
    <section className="relative min-h-dvh pt-[96px]! flex flex-col gap-16 items-center justify-center px-4 md:px-8 py-12 md:py-16 overflow-show">
      {/* Messy state - documents scattered around the section */}
      <AnimatePresence mode="wait">
        {!isOrganized &&
          messyDocuments.map((doc, index) => {
            const pos = messyPositions[index];
            return (
              <motion.img
                key={`messy-${doc.id}`}
                src={doc.src}
                alt=""
                initial={{ opacity: 0, scale: 0.3, x: pos.x, y: pos.y, rotate: pos.rotate }}
                animate={{
                  opacity: 1,
                  scale: pos.scale,
                  rotate: pos.rotate,
                  x: pos.x,
                  y: pos.y,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.2,
                  transition: { duration: 0.5, ease: "easeIn" },
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.03,
                }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 pointer-events-none drop-shadow-lg z-[5]"
                aria-hidden="true"
              />
            );
          })}
      </AnimatePresence>

      <div className="items-center justify-center h-fit p-0 flex flex-col gap-8 relative max-w-[740px] w-full mx-auto z-20">
        <div className="flex flex-col gap-6 items-center justify-center text-balance w-full">
          <h2 className="text-center font-semibold leading-none text-5xl">
            Ti aiutiamo a gestire, conservare, organizzare e condividere i tuoi documenti in maniera facile e veloce
          </h2>
          <p className="text-center text-muted-foreground leading-normal mx-12">
            {" "}
            Offri ai tuoi clienti accesso istantaneo ai loro documenti, sicurezza certificata e la semplicità che si aspettano dal digitale.
          </p>
        </div>
        <div className="relative flex items-center justify-center">
          <button
            onClick={handleOrganize}
            disabled={isOrganized}
            className="flex px-5 py-2.75 cursor-pointer leading-none bg-primary text-primary-foreground rounded-full text-lg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 relative z-30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Organizza
          </button>

          {/* Tidy state - documents organized in web portal layout */}
          <AnimatePresence>
            {isOrganized && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-8 w-[600px] md:w-[700px] bg-background/95 backdrop-blur-sm border border-border rounded-2xl p-8 shadow-2xl"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-center mb-2">I tuoi documenti organizzati</h3>
                  <div className="h-px bg-border" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {tidyDocuments.map((doc, index) => {
                    const pos = tidyPositions[index];
                    return (
                      <motion.div
                        key={`tidy-${doc.id}`}
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          duration: 0.5,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.7 + index * 0.1,
                        }}
                        className="flex flex-col items-center justify-center"
                      >
                        <motion.img
                          src={doc.src}
                          alt=""
                          className="w-full max-w-[200px] h-auto object-contain drop-shadow-lg rounded"
                          aria-hidden="true"
                        />
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
