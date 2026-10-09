import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { config } from './config'
import HeroSection from './components/HeroSection'
import LoveLetter from './components/LoveLetter'
import LoveStory from './components/LoveStory'
import InteractiveQuestion from './components/InteractiveQuestion'
import SurpriseFinale from './components/SurpriseFinale'
import FloatingHearts from './components/FloatingHearts'
import MusicToggle from './components/MusicToggle'
import CustomCursor from './components/CustomCursor'
import ProgressBar from './components/ProgressBar'

export default function App() {
  const [started, setStarted] = useState(false)
  const [activeSection, setActiveSection] = useState(0)

  // Track scroll progress
  useEffect(() => {
    if (!started) return
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]')
      sections.forEach((sec, i) => {
        const rect = sec.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= 0) {
          setActiveSection(i)
        }
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [started])

  return (
    <>
      <CustomCursor />
      <FloatingHearts active={started} />
      {started && <ProgressBar active={activeSection} total={4} />}
      {config.musicPath && <MusicToggle src={config.musicPath} />}

      <AnimatePresence mode="wait">
        {!started ? (
          <HeroSection key="hero" onStart={() => setStarted(true)} name={config.herName} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div data-section="0"><LoveLetter letter={config.loveLetter} name={config.herName} /></div>
            <div data-section="1"><LoveStory cards={config.storyCards} photos={config.galleryPhotos} name={config.herName} /></div>
            <div data-section="2"><InteractiveQuestion name={config.herName} /></div>
            <div data-section="3"><SurpriseFinale name={config.herName} message={config.finaleMessage} signature={config.finaleSignature} myName={config.myName} /></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
