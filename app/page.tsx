'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import CyberLab from '@/components/CyberLab'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import FallingCodeBackground from '@/components/FallingCodeBackground'

export default function Home() {
  return (
    <div
      className="relative min-h-screen"
      style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)' }}
    >
      {/* Global falling code background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FallingCodeBackground />
      </div>

      {/* Global scan lines */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="scan-lines" />
      </div>

      {/* Global red radial glow */}
      <div
        className="fixed inset-0 pointer-events-none z-[2]"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,23,68,0.08) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <CyberLab />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
