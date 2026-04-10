'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Shield,
  Target,
  Terminal,
  Globe,
  Lock,
  Wifi,
  Database,
  Code,
  Cpu,
  AlertTriangle,
  Search,
  FileSearch,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface SkillNode {
  id: string
  name: string
  icon: LucideIcon
  level: number
  maxLevel: number
  category: 'offensive' | 'defensive' | 'tools' | 'fundamentals'
  prerequisites: string[]
  description: string
  x: number
  y: number
}

const skillNodes: SkillNode[] = [
  // Root
  {
    id: 'cybersec',
    name: 'Cybersecurity',
    icon: Shield,
    level: 1,
    maxLevel: 1,
    category: 'fundamentals',
    prerequisites: [],
    description: 'Root skill - The foundation of all cybersecurity knowledge',
    x: 400,
    y: 50,
  },
  // Level 1
  {
    id: 'linux',
    name: 'Linux',
    icon: Terminal,
    level: 1,
    maxLevel: 3,
    category: 'fundamentals',
    prerequisites: ['cybersec'],
    description: 'Proficiency in Linux systems and command line',
    x: 200,
    y: 150,
  },
  {
    id: 'networking',
    name: 'Networking',
    icon: Wifi,
    level: 1,
    maxLevel: 3,
    category: 'fundamentals',
    prerequisites: ['cybersec'],
    description: 'TCP/IP, protocols, and network architecture',
    x: 400,
    y: 150,
  },
  {
    id: 'web',
    name: 'Web Security',
    icon: Globe,
    level: 1,
    maxLevel: 3,
    category: 'fundamentals',
    prerequisites: ['cybersec'],
    description: 'Web application security fundamentals',
    x: 600,
    y: 150,
  },
  // Level 2 - Offensive
  {
    id: 'recon',
    name: 'Reconnaissance',
    icon: Search,
    level: 1,
    maxLevel: 3,
    category: 'offensive',
    prerequisites: ['networking'],
    description: 'Information gathering and recon techniques',
    x: 300,
    y: 250,
  },
  {
    id: 'pentesting',
    name: 'Penetration Testing',
    icon: Target,
    level: 1,
    maxLevel: 3,
    category: 'offensive',
    prerequisites: ['linux', 'networking'],
    description: 'Ethical hacking and penetration testing',
    x: 400,
    y: 250,
  },
  {
    id: 'vuln',
    name: 'Vulnerability Analysis',
    icon: AlertTriangle,
    level: 1,
    maxLevel: 3,
    category: 'offensive',
    prerequisites: ['web', 'networking'],
    description: 'Identifying and analyzing security vulnerabilities',
    x: 500,
    y: 250,
  },
  // Level 2 - Tools
  {
    id: 'nmap',
    name: 'Nmap',
    icon: Search,
    level: 1,
    maxLevel: 3,
    category: 'tools',
    prerequisites: ['recon'],
    description: 'Network scanning and discovery',
    x: 150,
    y: 350,
  },
  {
    id: 'metasploit',
    name: 'Metasploit',
    icon: Target,
    level: 0,
    maxLevel: 3,
    category: 'tools',
    prerequisites: ['pentesting'],
    description: 'Exploitation framework',
    x: 350,
    y: 350,
  },
  {
    id: 'burp',
    name: 'Burp Suite',
    icon: Globe,
    level: 1,
    maxLevel: 3,
    category: 'tools',
    prerequisites: ['web'],
    description: 'Web application security testing',
    x: 550,
    y: 350,
  },
  {
    id: 'wireshark',
    name: 'Wireshark',
    icon: FileSearch,
    level: 1,
    maxLevel: 3,
    category: 'tools',
    prerequisites: ['networking'],
    description: 'Network protocol analyzer',
    x: 250,
    y: 350,
  },
  // Level 3 - Advanced
  {
    id: 'privesc',
    name: 'Privilege Escalation',
    icon: Lock,
    level: 0,
    maxLevel: 3,
    category: 'offensive',
    prerequisites: ['pentesting'],
    description: 'Linux and Windows privilege escalation',
    x: 300,
    y: 450,
  },
  {
    id: 'osint',
    name: 'OSINT',
    icon: Search,
    level: 0,
    maxLevel: 3,
    category: 'offensive',
    prerequisites: ['recon'],
    description: 'Open source intelligence gathering',
    x: 500,
    y: 450,
  },
  {
    id: 'exploit',
    name: 'Exploit Development',
    icon: Code,
    level: 0,
    maxLevel: 3,
    category: 'offensive',
    prerequisites: ['metasploit'],
    description: 'Custom exploit development',
    x: 400,
    y: 450,
  },
]

const categoryColors: Record<SkillNode['category'], string> = {
  offensive: 'text-red border-red',
  defensive: 'text-green border-green',
  tools: 'text-gold border-gold',
  fundamentals: 'text-cyan border-cyan',
}

export default function SkillTree() {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNode, setSelectedNode] = useState<SkillNode | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const isUnlocked = (node: SkillNode) => {
    if (node.prerequisites.length === 0) return true
    return node.prerequisites.every((prereq) => {
      const prereqNode = skillNodes.find((n) => n.id === prereq)
      return prereqNode && prereqNode.level > 0
    })
  }

  const getConnectionPath = (from: SkillNode, to: SkillNode) => {
    const startX = from.x + 40
    const startY = from.y + 40
    const endX = to.x + 40
    const endY = to.y

    // Create a curved path
    const midY = (startY + endY) / 2
    return `M ${startX} ${startY} C ${startX} ${midY}, ${endX} ${midY}, ${endX} ${endY}`
  }

  return (
    <section id="skilltree" ref={ref} className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="text-center mb-10">
            <h2 className="font-grotesk text-3xl sm:text-4xl font-bold text-snow mb-2">
              Skill Tree
            </h2>
            <p className="text-muted">Unlock your potential - RPG style</p>
          </div>

          {/* SVG Skill Tree */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={visible ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="relative bg-surface/50 border border-wire rounded-xl p-4 overflow-x-auto"
          >
            <svg
              viewBox="0 0 800 520"
              className="w-full min-w-[800px]"
              style={{ minHeight: 520 }}
            >
              {/* Connection Lines */}
              {skillNodes.map((node) =>
                node.prerequisites.map((prereqId) => {
                  const prereqNode = skillNodes.find((n) => n.id === prereqId)
                  if (!prereqNode) return null

                  const isActive = isUnlocked(node)

                  return (
                    <motion.path
                      key={`${prereqId}-${node.id}`}
                      d={getConnectionPath(prereqNode, node)}
                      fill="none"
                      stroke={isActive ? 'var(--c-red)' : 'var(--c-wire)'}
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={visible ? { pathLength: 1 } : {}}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  )
                })
              )}

              {/* Nodes */}
              {skillNodes.map((node, index) => {
                const Icon = node.icon
                const unlocked = isUnlocked(node)
                const isHovered = hoveredNode === node.id

                return (
                  <motion.g
                    key={node.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={visible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => unlocked && setSelectedNode(node)}
                    style={{ cursor: unlocked ? 'pointer' : 'not-allowed' }}
                  >
                    {/* Node Circle */}
                    <circle
                      cx={node.x + 40}
                      cy={node.y + 40}
                      r={unlocked ? 35 : 30}
                      fill="var(--c-dark)"
                      stroke={
                        unlocked
                          ? 'var(--c-red)'
                          : 'var(--c-wire)'
                      }
                      strokeWidth={unlocked ? 2 : 1}
                      className={isHovered && unlocked ? 'drop-shadow-[0_0_10px_rgba(192,57,43,0.5)]' : ''}
                    />

                    {/* Icon */}
                    <foreignObject
                      x={node.x + 22}
                      y={node.y + 22}
                      width={36}
                      height={36}
                    >
                      <div className={`flex items-center justify-center w-full h-full ${unlocked ? 'text-red' : 'text-muted'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </foreignObject>

                    {/* Level Dots */}
                    {unlocked && (
                      <g transform={`translate(${node.x + 25}, ${node.y + 80})`}>
                        {[...Array(node.maxLevel)].map((_, i) => (
                          <circle
                            key={i}
                            cx={i * 10}
                            cy={0}
                            r={3}
                            fill={i < node.level ? 'var(--c-red)' : 'var(--c-wire)'}
                          />
                        ))}
                      </g>
                    )}

                    {/* Label */}
                    <text
                      x={node.x + 40}
                      y={node.y + 100}
                      textAnchor="middle"
                      fill={unlocked ? 'var(--c-snow)' : 'var(--c-muted)'}
                      fontSize="11"
                      fontFamily="var(--font-jetbrains-mono)"
                    >
                      {node.name}
                    </text>
                  </motion.g>
                )
              })}
            </svg>
          </motion.div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {Object.entries(categoryColors).map(([cat, color]) => (
              <div key={cat} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${color.split(' ')[0].replace('text', 'bg')}/50`} />
                <span className="text-sm text-muted capitalize">{cat}</span>
              </div>
            ))}
          </div>

          {/* Selected Node Details */}
          {selectedNode && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 bg-surface border border-wire rounded-xl p-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red/10 flex items-center justify-center">
                  <selectedNode.icon className="w-6 h-6 text-red" />
                </div>
                <div className="flex-1">
                  <h3 className="font-grotesk font-bold text-snow mb-1">{selectedNode.name}</h3>
                  <p className="text-muted text-sm mb-2">{selectedNode.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-red">Level {selectedNode.level}/{selectedNode.maxLevel}</span>
                    <span className="text-muted capitalize">{selectedNode.category}</span>
                    {selectedNode.prerequisites.length > 0 && (
                      <span className="text-muted">
                        Requires: {selectedNode.prerequisites.join(', ')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
