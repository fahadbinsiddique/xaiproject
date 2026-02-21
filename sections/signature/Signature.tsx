"use client";

import Container from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ClusterScene from "./ClusterScene";

export default function Signature() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative py-section bg-bg overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]"
        >
          <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent rounded-full blur-3xl" />
        </motion.div>

        <div className="absolute inset-0 bg-[url('/vercel.svg')] bg-center opacity-5" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full border border-accent/20"
          >
            ✦ Interactive Experience ✦
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-textPrimary to-textPrimary/80 bg-clip-text text-transparent">
              Signature
            </span>
            <br />
            <span className="bg-gradient-to-r from-accent via-blue-400 to-accent bg-clip-text text-transparent bg-[length:200%_100%] animate-gradient">
              Interaction
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-textSecondary text-lg md:text-xl max-w-2xl mx-auto"
          >
            Watch data points organize into intelligent clusters. Click to
            transform.
          </motion.p>
        </motion.div>

        <motion.div style={{ opacity }} className="relative">
          <div className="absolute -top-4 -left-4 w-24 h-24 border-l-2 border-t-2 border-accent/30 rounded-tl-3xl" />
          <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r-2 border-b-2 border-accent/30 rounded-br-3xl" />

          <div className="relative h-[600px] md:h-[700px] rounded-3xl overflow-hidden bg-panel/30 backdrop-blur-sm border border-border/50 shadow-2xl">
            <ClusterScene />

            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4 justify-center">
              {[
                { label: "Real-time clustering", icon: "⚡" },
                { label: "Interactive hover", icon: "👆" },
                { label: "Smooth transitions", icon: "🔄" },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="px-4 py-2 bg-panel/80 backdrop-blur-sm rounded-full border border-border text-sm text-textSecondary"
                >
                  <span className="mr-2">{feature.icon}</span>
                  {feature.label}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { label: "Particles", value: "300+" },
            { label: "Clusters", value: "5" },
            { label: "Transition Speed", value: "0.05s" },
            { label: "Interactive Zones", value: "∞" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-textSecondary">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16"
        >
          <button className="group relative px-8 py-4 bg-gradient-to-r from-accent to-blue-500 text-white font-bold rounded-xl overflow-hidden">
            <span className="relative z-10">Experience the Future</span>
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
              style={{ opacity: 0.2 }}
            />
          </button>
        </motion.div>
      </Container>
    </section>
  );
}
