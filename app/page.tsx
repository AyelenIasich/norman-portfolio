import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Timeline from '@/components/Timeline'
import SkillTree from '@/components/SkillTree'
import CyberLab from '@/components/CyberLab'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import { getCyberlabItems } from '@/lib/getCyberlabItems'

export default function Home() {
  const cyberlabItems = getCyberlabItems()
  return (
    <div
      className="relative min-h-screen"
      style={{ background: 'var(--c-dark)' }}
    >
      {/* Grid de fondo sutil */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--c-wire) 1px, transparent 1px),
            linear-gradient(90deg, var(--c-wire) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
          opacity: 0.25,
        }}
      />

      {/* Glow rojo central muy sutil */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 30%, rgba(255,23,68,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Timeline />
          <CyberLab items={cyberlabItems} />
          {/* <Writeups /> */}
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
