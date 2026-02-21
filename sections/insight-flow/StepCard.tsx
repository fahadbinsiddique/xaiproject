"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StepCardProps {
  title: string;
  description: string;
  icon: string;
  index: number;
  metrics: Record<string, string>;
  isActive?: boolean;
}

export default function StepCard({
  title,
  description,
  icon,
  index,
  metrics,
  isActive,
}: StepCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isHovered) return;

      const rect = cardRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      }}
      className={`
        relative bg-panel rounded-xl p-8 shadow-lg border transition-all duration-200
        ${
          isActive
            ? "border-accent shadow-[0_0_30px_rgba(91,140,255,0.3)]"
            : "border-border hover:border-accent/50"
        }
      `}
    >
      {isActive && (
        <motion.div
          className="absolute inset-0 -z-10 bg-accent/20 rounded-xl blur-xl"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      <div className="flex justify-between items-start mb-6">
        <div
          className={`
          w-12 h-12 rounded-xl flex items-center justify-center text-2xl
          ${isActive ? "bg-accent text-white" : "bg-accent/10 text-accent"}
        `}
        >
          {icon}
        </div>

        <span
          className={`
          px-3 py-1 text-sm font-medium rounded-full
          ${isActive ? "bg-accent text-white" : "bg-accent/10 text-accent"}
        `}
        >
          Step {index + 1}
        </span>
      </div>

      <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-textPrimary to-textPrimary/80 bg-clip-text text-transparent">
        {title}
      </h3>

      <p className="text-textSecondary mb-6 leading-relaxed">{description}</p>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        {Object.entries(metrics).map(([key, value], idx) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="text-center"
          >
            <div className="text-lg font-bold text-accent">{value}</div>
            <div className="text-xs text-textSecondary capitalize">{key}</div>
          </motion.div>
        ))}
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-accent/5 to-transparent rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-radial from-accent/5 to-transparent rounded-full -ml-16 -mb-16" />
    </motion.div>
  );
}
