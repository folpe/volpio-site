import { LucideIcon } from "lucide-react"
import { motion } from "motion/react"
import React from "react"

interface CapabilityCardProps {
  icon: LucideIcon
  title: string
  description: string
  delay?: number
}

export const CapabilityCard = ({ icon: Icon, title, description, delay = 0 }: CapabilityCardProps) => {
  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      {/* Glow effect on hover */}
      <motion.div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

      {/* Card */}
      <div className="relative rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-white/20">
        {/* Icon */}
        <motion.div
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-pink-500"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon className="h-6 w-6 text-white" />
        </motion.div>

        {/* Content */}
        <h3 className="mb-2 text-white">{title}</h3>
        <p className="text-white/60">{description}</p>

        {/* Bottom accent line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"
          initial={{ width: "0%" }}
          whileInView={{ width: "100%" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: delay + 0.3 }}
        />
      </div>
    </motion.div>
  )
}
