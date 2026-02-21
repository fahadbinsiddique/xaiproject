"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const menuItems = [
  { name: "Overview", icon: "📊", count: 3 },
  { name: "Analytics", icon: "📈", count: 12 },
  { name: "Reports", icon: "📑", count: 5 },
  { name: "Settings", icon: "⚙️", count: null },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Overview");

  return (
    <motion.nav
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring" }}
      className="relative w-64 bg-gradient-to-b from-panel to-panel/90 rounded-2xl border border-border/50 p-4 overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 mb-8">
        <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center mb-4">
          <span className="text-xl">🎯</span>
        </div>
        <h3 className="text-textPrimary font-semibold">Dashboard</h3>
        <p className="text-textSecondary text-xs">AI Intelligence</p>
      </div>

      <div className="relative z-10 space-y-2">
        {menuItems.map((item, idx) => (
          <motion.button
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setActiveItem(item.name)}
            className={`
              w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300
              ${
                activeItem === item.name
                  ? "bg-accent text-white shadow-lg shadow-accent/25"
                  : "text-textSecondary hover:bg-border/30 hover:text-textPrimary"
              }
            `}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.name}</span>
            </div>
            {item.count && (
              <span
                className={`
                text-xs px-2 py-1 rounded-full
                ${
                  activeItem === item.name
                    ? "bg-white/20 text-white"
                    : "bg-border/50 text-textSecondary"
                }
              `}
              >
                {item.count}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="relative z-10 mt-8 pt-6 border-t border-border/50"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-accent to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm">JD</span>
          </div>
          <div>
            <p className="text-textPrimary text-sm font-medium">John Doe</p>
            <p className="text-textSecondary text-xs">Admin</p>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
