import { ReactNode } from "react"
import { motion } from "framer-motion"

interface ContainerProps {
  children: ReactNode
  className?: string
}

export default function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`max-w-container mx-auto px-6 ${className}`}>
      {children}
    </div>
  )
}