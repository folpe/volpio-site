import { motion } from "motion/react"
import React, { useEffect, useState } from "react"

interface Node {
  id: number
  x: number
  y: number
  label: string
}

export const FlowVisualization = () => {
  const [activeNode, setActiveNode] = useState(0)
  const [particlePosition, setParticlePosition] = useState(0)

  const nodes: Node[] = [
    { id: 0, x: 10, y: 50, label: "Auditer" },
    { id: 1, x: 35, y: 50, label: "Concevoir" },
    { id: 2, x: 60, y: 50, label: "Implémenter" },
    { id: 3, x: 85, y: 50, label: "Automatiser" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % nodes.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [nodes.length])

  useEffect(() => {
    const interval = setInterval(() => {
      setParticlePosition((prev) => (prev + 0.5) % 100)
    }, 20)
    return () => clearInterval(interval)
  }, [])

  // Calculate particle position along the path
  const getParticleCoords = (progress: number) => {
    const totalSegments = nodes.length - 1
    const segmentLength = 100 / totalSegments
    const currentSegment = Math.floor(progress / segmentLength)
    const segmentProgress = (progress % segmentLength) / segmentLength

    if (currentSegment >= totalSegments) {
      return { x: nodes[nodes.length - 1]?.x, y: nodes[nodes.length - 1]?.y }
    }

    const startNode = nodes[currentSegment]
    const endNode = nodes[currentSegment + 1]

    if (!startNode || !endNode) {
      return { x: nodes[0]?.x ?? 0, y: nodes[0]?.y ?? 0 }
    }

    return {
      x: startNode.x + (endNode.x - startNode.x) * segmentProgress,
      y: startNode.y + (endNode.y - startNode.y) * segmentProgress,
    }
  }

  const particleCoords = getParticleCoords(particlePosition)

  return (
    <div className="relative flex h-64 w-full items-center justify-center">
      <svg className="absolute inset-0 h-full w-full" style={{ overflow: "visible" }}>
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35" />
            <stop offset="33%" stopColor="#F7931E" />
            <stop offset="66%" stopColor="#E91E63" />
            <stop offset="100%" stopColor="#9C27B0" />
          </linearGradient>
        </defs>

        {/* Connection line */}
        <motion.line
          x1="10%"
          y1="50%"
          x2="85%"
          y2="50%"
          stroke="url(#flowGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Animated flow particle */}
        <motion.circle
          cx={`${particleCoords.x}%`}
          cy={`${particleCoords.y}%`}
          r="6"
          fill="#ffffff"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </svg>

      {/* Nodes */}
      <div className="relative h-full w-full">
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 transform"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            animate={{
              scale: activeNode === node.id ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative">
              {/* Glow effect */}
              {activeNode === node.id && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "linear-gradient(to right, rgb(249, 115, 22), rgb(236, 72, 153), rgb(168, 85, 247))",
                    filter: "blur(24px)",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.6, scale: 1.5 }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {/* Node circle */}
              <div
                className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  activeNode === node.id ? "border-orange-500 bg-orange-500/20" : "border-white/20 bg-white/5"
                }`}
              >
                <div
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    activeNode === node.id ? "bg-orange-400" : "bg-white/40"
                  }`}
                />
              </div>
            </div>

            {/* Label */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 transform whitespace-nowrap">
              <span
                className={`transition-all duration-300 ${
                  activeNode === node.id ? "text-orange-400" : "text-white/60"
                }`}
              >
                {node.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
