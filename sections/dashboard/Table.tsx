"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const data = [
  {
    id: 1,
    name: "Customer A",
    revenue: "$12,000",
    status: "Active",
    trend: "+12%",
  },
  {
    id: 2,
    name: "Customer B",
    revenue: "$8,500",
    status: "Pending",
    trend: "-3%",
  },
  {
    id: 3,
    name: "Customer C",
    revenue: "$15,200",
    status: "Active",
    trend: "+24%",
  },
  {
    id: 4,
    name: "Customer D",
    revenue: "$6,800",
    status: "Inactive",
    trend: "-8%",
  },
  {
    id: 5,
    name: "Customer E",
    revenue: "$21,300",
    status: "Active",
    trend: "+45%",
  },
];

const statusColors = {
  Active: "bg-green-500/20 text-green-400 border-green-500/30",
  Pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Inactive: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function Table() {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="relative bg-gradient-to-b from-panel to-panel/90 rounded-2xl border border-border/50 overflow-hidden group"
    >
      <div className="relative bg-gradient-to-r from-panel to-panel/90 px-6 py-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h4 className="text-textPrimary font-semibold">Recent Activity</h4>
          <button className="text-xs text-accent hover:text-accent/80 transition-colors">
            View All →
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-6 py-4 text-left">
                <span className="text-textSecondary text-xs font-medium uppercase tracking-wider">
                  Customer
                </span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-textSecondary text-xs font-medium uppercase tracking-wider">
                  Revenue
                </span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-textSecondary text-xs font-medium uppercase tracking-wider">
                  Status
                </span>
              </th>
              <th className="px-6 py-4 text-left">
                <span className="text-textSecondary text-xs font-medium uppercase tracking-wider">
                  Trend
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onHoverStart={() => setHoveredRow(row.id)}
                onHoverEnd={() => setHoveredRow(null)}
                className={`
                  relative border-b border-border/30 transition-all duration-300
                  ${hoveredRow === row.id ? "bg-accent/5" : ""}
                `}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-accent/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-sm">👤</span>
                    </div>
                    <span className="text-textPrimary font-medium">
                      {row.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-textPrimary font-semibold">
                    {row.revenue}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`
                    inline-flex px-3 py-1 text-xs font-medium rounded-full border
                    ${statusColors[row.status as keyof typeof statusColors]}
                  `}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`
                    text-sm font-medium
                    ${row.trend.startsWith("+") ? "text-green-400" : "text-red-400"}
                  `}
                  >
                    {row.trend}
                  </span>
                </td>

                {hoveredRow === row.id && (
                  <motion.div
                    layoutId="hoverLine"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-border/50 flex items-center justify-between">
        <span className="text-textSecondary text-sm">
          Showing 5 of 24 entries
        </span>
        <div className="flex gap-2">
          <button className="px-3 py-1 text-textSecondary hover:text-accent transition-colors">
            ←
          </button>
          <button className="px-3 py-1 bg-accent/20 text-accent rounded-lg">
            1
          </button>
          <button className="px-3 py-1 text-textSecondary hover:text-accent transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-textSecondary hover:text-accent transition-colors">
            3
          </button>
          <button className="px-3 py-1 text-textSecondary hover:text-accent transition-colors">
            →
          </button>
        </div>
      </div>
    </motion.div>
  );
}
