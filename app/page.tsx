"use client";

import DashboardPreview from "@/sections/dashboard/DashboardPreview";
import Hero from "@/sections/hero/Hero";
import InsightFlow from "@/sections/insight-flow/InsightFlow";
import Signature from "@/sections/signature/Signature";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const backgroundOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0, 0.5, 0.8],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <motion.main
      ref={containerRef}
      className="relative bg-bg text-text-primary overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: backgroundOpacity }}
      >
        <motion.div className="absolute inset-0" style={{ scale }}>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-20 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
            <div className="absolute bottom-40 right-10 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-2000" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow animation-delay-4000" />
          </div>
        </motion.div>
      </motion.div>

      <div className="fixed inset-0 pointer-events-none z-[1] opacity-20 mix-blend-overlay">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJmIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc0IiBudW1PY3RhdmVzPSIzIiAvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNmKSIgb3BhY2l0eT0iMC4xIiAvPjwvc3ZnPg==')] bg-repeat opacity-20" />
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent via-blue-400 to-accent z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="relative z-10">
        <section className="relative min-h-screen">
          <Hero />

          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-textSecondary"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{
              opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
            }}
          >
            <span className="text-xs uppercase tracking-wider">
              Discover More
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7-7-7m14-6l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </motion.div>
        </section>

        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-bg/50 pointer-events-none" />

          <div className="relative z-20 bg-bg shadow-[0_-50px_100px_rgba(0,0,0,0.9)]">
            <SectionDivider />

            <InsightFlow />

            <SectionDivider />

            <DashboardPreview />

            <SectionDivider />

            <Signature />
          </div>
        </div>
      </div>

      <footer className="relative z-20 bg-bg border-t border-border/30 py-12">
        <div className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
                Xai
              </h3>
              <p className="text-textSecondary text-sm">
                Transforming raw data into structured intelligence.
              </p>
            </div>

            {[
              { title: "Product", links: ["Features", "Pricing", "Demo"] },
              { title: "Company", links: ["About", "Blog", "Careers"] },
              { title: "Legal", links: ["Privacy", "Terms", "Security"] },
            ].map((section) => (
              <div key={section.title}>
                <h4 className="text-textPrimary font-semibold mb-3">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-textSecondary hover:text-accent transition-colors text-sm"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-textSecondary text-sm">
              © 2024 Xai. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["twitter", "linkedin", "github"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="text-textSecondary hover:text-accent transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5 bg-current rounded-sm opacity-50 hover:opacity-100 transition-opacity" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </motion.main>
  );
}

function SectionDivider() {
  return (
    <div className="relative h-24 flex items-center justify-center">
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-b from-transparent via-accent/30 to-transparent"
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-full"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, type: "spring" }}
      />
    </div>
  );
}
