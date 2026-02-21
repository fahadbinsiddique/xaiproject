"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useState } from "react"

export default function ScrollToTop() {
  const { scrollYProgress } = useScroll()
  const [isVisible, setIsVisible] = useState(false)

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setIsVisible(latest > 0.2)
    })
  }, [scrollYProgress])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!isVisible) return null

  return (
    <motion.button
      onClick={scrollToTop}
      style={{ opacity, scale }}
      className="fixed bottom-8 right-8 z-50 p-3 bg-accent rounded-full shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/35 transition-shadow"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </motion.button>
  )
}