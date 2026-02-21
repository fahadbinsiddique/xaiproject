"use client";

import Container from "@/components/ui/Container";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import DataScene from "./DataScene";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const sceneScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  return (
    <section
      ref={containerRef}
      className="relative h-[100vh] bg-bg overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-1/4 w-1/2 h-1/2 bg-gradient-radial from-accent/20 via-transparent to-transparent blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 -right-1/4 w-1/2 h-1/2 bg-gradient-radial from-accent/10 via-transparent to-transparent blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <Container className="w-full">
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[600px]">
            <motion.div
              style={{ opacity: textOpacity, y: textY }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block"
              >
                <span className="px-3 py-1 text-xs font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                  Introducing Xai 2.0
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-textPrimary to-textPrimary/80 bg-clip-text">
                  From Raw Data
                </span>
                <br />
                <span className="bg-gradient-to-r from-accent to-accent/80 bg-clip-text text-transparent">
                  to Structured Intelligence
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-textSecondary text-lg md:text-xl max-w-md leading-relaxed"
              >
                Xai transforms fragmented data into clear, actionable insight
                through intelligent structuring and adaptive analysis.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <button className="px-6 py-3 bg-accent text-white font-medium rounded-lg hover:bg-accent/90 transition-colors duration-fast">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-panel border border-border text-textPrimary font-medium rounded-lg hover:bg-border/20 transition-colors duration-fast">
                  Watch Demo
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex gap-8 pt-8"
              >
                <div>
                  <div className="text-2xl font-bold text-textPrimary">
                    10B+
                  </div>
                  <div className="text-sm text-textSecondary">Data Points</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-textPrimary">
                    99.9%
                  </div>
                  <div className="text-sm text-textSecondary">Accuracy</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-textPrimary">
                    50ms
                  </div>
                  <div className="text-sm text-textSecondary">Latency</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              style={{ scale: sceneScale }}
              className="relative h-[500px] md:h-[600px] w-full"
            >
              <div className="absolute inset-0 bg-panel/5 rounded-2xl border border-border/30 backdrop-blur-[2px] overflow-hidden">
                <DataScene />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -bottom-4 -right-4 px-4 py-2 bg-panel/80 backdrop-blur-sm border border-border rounded-lg text-sm text-textSecondary"
              >
                <span className="text-accent font-medium">Live</span> processing
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-textSecondary"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2], [1, 0]) }}
      >
        <span className="text-xs uppercase tracking-wider">
          Scroll to transform
        </span>
        <div className="w-5 h-10 border-2 border-border rounded-full p-1">
          <motion.div
            className="w-1 h-2 bg-accent rounded-full mx-auto"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
