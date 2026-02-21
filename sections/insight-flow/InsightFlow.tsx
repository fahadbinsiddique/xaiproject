"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import StepCard from "./StepCard";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Ingest Data",
    description:
      "Gather raw data from multiple sources and structure it for analysis.",
    icon: "📡",
    metrics: { sources: "50+", speed: "2.5GB/s" },
  },
  {
    title: "Analyze with AI",
    description:
      "Apply intelligent algorithms to uncover patterns and insights.",
    icon: "🧠",
    metrics: { models: "12", accuracy: "99.9%" },
  },
  {
    title: "Generate Insight",
    description:
      "Transform findings into actionable decisions and automation triggers.",
    icon: "⚡",
    metrics: { latency: "50ms", actions: "1k/s" },
  },
];

export default function InsightFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const cards = gsap.utils.toArray(".step-card");
    const totalScrollWidth = (cards.length - 1) * 100;

    const ctx = gsap.context(() => {
      gsap.to(cards, {
        xPercent: -totalScrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: stickyRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${stickyRef.current?.offsetWidth}`,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-bg overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div
        ref={stickyRef}
        className="h-screen flex flex-col justify-center overflow-hidden"
      >
        <Container className="relative z-10 w-full">
          <div className="text-center mb-10 md:mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full border border-accent/20"
            >
              The Process
            </motion.span>

            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              How <span className="text-accent">Xai Works</span>
            </h2>
          </div>

          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              {steps.map((_, idx) => (
                <div key={idx} className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${progress >= idx / (steps.length - 1) ? "bg-accent" : "bg-border"}`}
                  />
                  {idx < steps.length - 1 && (
                    <div className="w-20 md:w-32 h-[2px] bg-border/30 mx-2 overflow-hidden">
                      <motion.div
                        className="h-full bg-accent origin-left"
                        style={{
                          scaleX: Math.max(
                            0,
                            Math.min(
                              1,
                              (progress - idx / (steps.length - 1)) *
                                (steps.length - 1),
                            ),
                          ),
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="flex gap-6 items-stretch">
              {" "}
              {steps.map((step, idx) => (
                <div
                  key={idx}
                  className="step-card flex-shrink-0 w-[85vw] md:w-[480px] flex"
                >
                  <StepCard
                    index={idx}
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    metrics={step.metrics as Record<string, string>}
                    isActive={progress >= idx / (steps.length - 1)}
                  />
                </div>
              ))}
              <div className="step-card flex-shrink-0 w-[85vw] md:w-[480px] flex">
                <div className="flex-1 min-h-[350px] bg-panel/40 rounded-3xl p-10 border border-accent/20 flex flex-col items-center justify-center text-center backdrop-blur-md">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-3xl">🚀</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-textPrimary">
                    Ready to Scale?
                  </h3>
                  <p className="text-textSecondary mb-8 text-sm">
                    Join 500+ companies using Xai today.
                  </p>
                  <button className="w-full py-3 bg-accent text-white font-bold rounded-xl hover:scale-105 transition-transform">
                    Get Started Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
