import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RefreshCw } from 'lucide-react'

function useConfetti(active) {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    if (!active) return
    const COLORS = ['#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#fff0f3', '#ffd700', '#ff69b4']
    const SHAPES = ['❤️', '💕', '🌸', '✨', '💖', '⭐', '🌺']
    const items = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -10 - Math.random() * 20,
      size: 14 + Math.random() * 18,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      delay: Math.random() * 1.2,
      duration: 2.5 + Math.random() * 2,
      drift: (Math.random() - 0.5) * 80,
      rotate: Math.random() * 360,
    }))
    setParticles(items)
    const timer = setTimeout(() => setParticles([]), 5000)
    return () => clearTimeout(timer)
  }, [active])

  return particles
}

export default function SurpriseFinale({ name, message, signature, myName }) {
  const [revealed, setRevealed] = useState(false)
  const [key, setKey] = useState(0)
  const confetti = useConfetti(revealed && key >= 0)

  const trigger = () => {
    setKey((k) => k + 1)
    setRevealed(true)
  }

  const replay = () => {
    setRevealed(false)
    setTimeout(() => trigger(), 100)
  }

  return (
    <section id="finale" className="section-finale min-h-screen flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden" aria-label="Surprise Finale">
      {/* Confetti */}
      <div className="pointer-events-none fixed inset-0 z-40" aria-hidden="true">
        {confetti.map((p) => (
          <motion.div
            key={`${p.id}-${key}`}
            className="absolute"
            style={{ left: `${p.x}%`, top: `${p.y}%`, fontSize: p.size }}
            animate={{
              y: `${100 + Math.random() * 30}vh`,
              x: p.drift,
              rotate: p.rotate + 360,
              opacity: [1, 1, 0],
            }}
            transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          >
            {p.shape}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <motion.h2
          className="font-serif text-3xl sm:text-4xl font-bold text-gradient mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          One Last Thing, {name}...
        </motion.h2>

        <AnimatePresence mode="wait">
          {!revealed ? (
            <motion.div key="pre" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.button
                onClick={trigger}
                className="btn-primary text-lg glow-pink focus:outline-none focus:ring-4 focus:ring-rose-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                aria-label="Click for the biggest surprise"
              >
                Click for the Biggest Surprise ❤️
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key={`revealed-${key}`}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 16 }}
              className="flex flex-col items-center gap-6"
            >
              {/* Pulsing hearts ring */}
              <div className="relative flex items-center justify-center w-40 h-40" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.span
                    key={i}
                    className="absolute text-2xl"
                    style={{
                      left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 8)}%`,
                      top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 8)}%`,
                      transform: 'translate(-50%,-50%)',
                    }}
                    animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, delay: i * 0.18, repeat: Infinity }}
                  >
                    ❤️
                  </motion.span>
                ))}
                <motion.span
                  className="text-6xl"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  ❤️
                </motion.span>
              </div>

              {/* Main message */}
              <motion.h1
                className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-gradient leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                I LOVE YOU,<br />{name} ❤️
              </motion.h1>

              <motion.p
                className="font-sans text-rose-700 text-lg leading-relaxed max-w-sm mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {message}
              </motion.p>

              <motion.p
                className="font-handwriting text-2xl text-rose-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                {signature}
              </motion.p>

              <motion.p
                className="font-handwriting text-xl text-rose-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                — {myName}
              </motion.p>

              <motion.button
                onClick={replay}
                className="mt-2 flex items-center gap-2 text-rose-500 font-sans font-medium px-5 py-2 rounded-full glass shadow-md hover:shadow-lg transition-shadow focus:outline-none focus:ring-2 focus:ring-rose-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                aria-label="Replay the surprise"
              >
                <RefreshCw size={16} />
                Replay ✨
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
