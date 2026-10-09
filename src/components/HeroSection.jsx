import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'
import { useState } from 'react'

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: `${5 + Math.random() * 90}%`,
  y: `${5 + Math.random() * 90}%`,
  size: 6 + Math.random() * 12,
  delay: Math.random() * 4,
  duration: 4 + Math.random() * 4,
}))

function Particle({ x, y, size, delay, duration }) {
  return (
    <motion.div
      className="absolute pointer-events-none select-none text-rose-300"
      style={{ left: x, top: y, fontSize: size }}
      animate={{ y: [-8, 8, -8], opacity: [0.4, 0.9, 0.4], scale: [0.9, 1.1, 0.9] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      {Math.random() > 0.5 ? '✦' : '❤'}
    </motion.div>
  )
}

export default function HeroSection({ onStart, name }) {
  const [clicked, setClicked] = useState(false)

  const handleStart = () => {
    setClicked(true)
    setTimeout(onStart, 900)
  }

  return (
    <motion.section
      className="section-hero min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-12"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient particles */}
      {PARTICLES.map((p) => (
        <Particle key={p.id} {...p} />
      ))}

      {/* Big ambient heart */}
      <motion.div
        className="absolute opacity-5 pointer-events-none select-none"
        style={{ fontSize: '40vw', color: '#f43f5e', top: '50%', left: '50%', x: '-50%', y: '-50%' }}
        animate={{ scale: [1, 1.04, 1], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        ❤
      </motion.div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Top sparkle */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-6"
        >
          <Sparkles className="text-rose-400 w-8 h-8" aria-hidden="true" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          className="font-serif text-5xl sm:text-6xl md:text-7xl font-bold leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <span className="text-gradient">Hey {name}...</span>
          <motion.span
            className="inline-block ml-2"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ❤️
          </motion.span>
        </motion.h1>

        {/* Sub heading */}
        <motion.p
          className="font-sans text-lg sm:text-xl text-rose-700 mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          I made something special just for you.
        </motion.p>

        {/* CTA button */}
        <motion.button
          onClick={handleStart}
          disabled={clicked}
          className="btn-primary text-lg glow-pink focus:outline-none focus:ring-4 focus:ring-rose-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, type: 'spring', stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          aria-label="Open your surprise"
        >
          {clicked ? (
            <span className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-current animate-pulse" /> Opening...
            </span>
          ) : (
            'Open Your Surprise 💌'
          )}
        </motion.button>

        {/* Floating hearts burst on click */}
        {clicked && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-2xl"
                style={{
                  left: '50%',
                  top: '60%',
                  x: '-50%',
                  y: '-50%',
                }}
                animate={{
                  x: `${(Math.random() - 0.5) * 300}px`,
                  y: `${-80 - Math.random() * 120}px`,
                  opacity: [1, 0],
                  scale: [1, 0.4],
                }}
                transition={{ duration: 1.2, delay: i * 0.05, ease: 'easeOut' }}
              >
                {['❤️', '💕', '✨', '🌸'][i % 4]}
              </motion.span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 h-16 opacity-30" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#fda4af" />
        </svg>
      </div>
    </motion.section>
  )
}
