"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import Card from "./Card";
import Sidebar from "./Sidebar";
import Table from "./Table";

const cardData = [
  {
    title: "Total Revenue",
    value: "$36,000",
    icon: "💰",
    trend: { value: 12, isPositive: true },
  },
  {
    title: "Active Users",
    value: "1,245",
    icon: "👥",
    trend: { value: 8, isPositive: true },
  },
  {
    title: "Insights Generated",
    value: "752",
    icon: "💡",
    trend: { value: 23, isPositive: true },
  },
];

export default function DashboardPreview() {
  return (
    <section className="relative py-section bg-bg overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[url('/vercel.svg')] bg-center opacity-5" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold uppercase tracking-wider text-accent bg-accent/10 rounded-full border border-accent/20"
          >
            ✦ Live Preview ✦
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Intelligence{" "}
            <span className="bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">
              Dashboard
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-textSecondary text-lg max-w-2xl mx-auto"
          >
            Real-time insights and analytics at your fingertips
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-64 flex-shrink-0">
            <Sidebar />
          </div>

          <div className="flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {cardData.map((card, idx) => (
                <Card
                  key={card.title}
                  title={card.title}
                  value={card.value}
                  icon={card.icon}
                  trend={card.trend}
                  delay={0.4 + idx * 0.1}
                />
              ))}
            </div>

            <Table />

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { label: "Avg. Response Time", value: "1.2s", change: "-15%" },
                { label: "Data Processed", value: "2.4TB", change: "+23%" },
                { label: "Active Models", value: "8", change: "+2" },
                { label: "Accuracy Rate", value: "99.2%", change: "+0.8%" },
              ].map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-panel/30 rounded-lg p-4 border border-border/30"
                >
                  <p className="text-textSecondary text-xs mb-1">
                    {metric.label}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-textPrimary font-semibold">
                      {metric.value}
                    </span>
                    <span className="text-xs text-green-400">
                      {metric.change}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
