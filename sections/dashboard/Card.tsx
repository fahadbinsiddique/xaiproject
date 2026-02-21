"use client"

import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

interface CardProps {
  title: string
  value: string
  trend?: {
    value: number
    isPositive: boolean
  }
  icon?: string
  delay?: number
}

export default function Card({ title, value, trend, icon = "📊", delay = 0 }: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isHovered) return
      
      const rect = cardRef.current.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10
      
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isHovered])

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
      }}
      className="relative bg-gradient-to-br from-panel to-panel/90 p-6 rounded-2xl border border-border/50 hover:border-accent/30 transition-all duration-300 overflow-hidden group"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent"
        animate={{
          opacity: isHovered ? [0.3, 0.6, 0.3] : 0.1
        }}
        transition={{
          duration: 2,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="absolute -inset-0.5 bg-gradient-to-r from-accent/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={isHovered ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="text-2xl">{icon}</span>
          {trend && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`
                flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium
                ${trend.isPositive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}
              `}
            >
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}%</span>
            </motion.div>
          )}
        </div>
        
        <h4 className="text-textSecondary text-sm mb-1">{title}</h4>
        <motion.p 
          className="text-textPrimary text-2xl font-bold"
          animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {value}
        </motion.p>

        <div className="mt-4 flex items-end gap-0.5 h-8">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-accent/30 rounded-t"
              initial={{ height: 0 }}
              animate={{ height: Math.random() * 24 + 4 }}
              transition={{ delay: i * 0.02 }}
              style={{
                background: `linear-gradient(to top, ${i % 3 === 0 ? '#5B8CFF' : '#4ECDC4'}, transparent)`
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
}