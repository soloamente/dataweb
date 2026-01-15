"use client";

import { motion } from "motion/react";

// Stats data
const stats = [
  { value: "350+", label: "Clienti attivi", suffix: "" },
  { value: "1M+", label: "Documenti gestiti", suffix: "" },
  { value: "99.9%", label: "Uptime garantito", suffix: "" },
  { value: "24/7", label: "Supporto disponibile", suffix: "" },
] as const;

// Counter animation component
function AnimatedCounter({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-foreground">
        {value}
      </div>
      <div className="text-sm md:text-base text-muted-foreground">{label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => (
            <AnimatedCounter key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}
