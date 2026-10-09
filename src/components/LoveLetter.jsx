import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Heart } from 'lucide-react'

function EnvelopeSVG({ open }) {
  return (
    <svg viewBox="0 0 200 140" className="w-full h-full" aria-hidden="true">
      {/* Envelope body */}
      <rect x="10" y="40" width="180" height="100" rx="8" fill="#fecdd3" stroke="#fda4af" strokeWidth="2" />
      {/* Bottom fold */}
      <path d="M10,140 L100,90 L190,140 Z" fill="#fda4af" opacity="0.6" />
      {/* Side folds */}
      <path d="M10,40 L100,90 L190,40" fill="#ffb3c1" stroke="#fda4af" strokeWidth="1.5" />
      {/* Flap */}
      <motion.path
        d={open ? "M10,40 C10,40 100,-5 190,40" : "M10,40 L100,90 L190,40 Z"}
        fill="#ff8fab"
        stroke="#fda4af"
        strokeWidth="1.5"
        animate={{ d: open ? "M10,40 C10,40 100,-5 190,40" : "M10,40 L100,90 L190,40 Z" }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      {/* Heart seal */}
      <motion.text
        x="100" y="75" textAnchor="middle" fontSize="18" fill="#f43f5e"
        animate={{ y: open ? -20 : 75, opacity: open ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        ❤
      </motion.text>
    </svg>
  )
}

export default function LoveLetter({ letter, name }) {
  const [opened, setOpened] = useState(false)
  const [showContinue, setShowContinue] = useState(false)

  const handleOpen = () => {
    if (opened) return
    setOpened(true)
    setTimeout(() => setShowContinue(true), 2500)
  }

  const lines = letter.split('\n')

  return (
    <section className="section-letter min-h-screen flex flex-col items-center justify-center px-4 py-20" aria-label="Love Letter">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gradient mb-3">A Letter for You 💌</h2>
        <p className="text-rose-600 font-sans">Click the envelope to open it</p>
      </motion.div>

      <motion.div
        className="relative w-full max-w-sm mx-auto"
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {/* Envelope */}
        <motion.button
          onClick={handleOpen}
          className="w-full focus:outline-none focus:ring-4 focus:ring-rose-300 rounded-xl"
          aria-label="Open the love letter envelope"
          whileHover={!opened ? { scale: 1.03, y: -4 } : {}}
          whileTap={!opened ? { scale: 0.98 } : {}}
        >
          <div className="h-40 w-full">
            <EnvelopeSVG open={opened} />
          </div>
        </motion.button>

        {/* Floating hearts around envelope */}
        {opened && (
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {['❤️', '💕', '💗'].map((h, i) => (
              <motion.span
                key={i}
                className="absolute text-xl"
                style={{ left: `${20 + i * 30}%`, top: '10%' }}
                animate={{ y: [-10, -40, -10], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                {h}
              </motion.span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Letter content */}
      <AnimatePresence>
        {opened && (
          <motion.div
            className="mt-8 w-full max-w-lg mx-auto glass rounded-2xl p-8 shadow-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Paper texture lines */}
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-full border-b border-rose-100"
                style={{ top: `${60 + i * 32}px`, left: 0 }}
                aria-hidden="true"
              />
            ))}

            <div className="relative z-10">
              {lines.map((line, i) => (
                <motion.p
                  key={i}
                  className={`font-handwriting leading-relaxed ${
                    line.includes('I LOVE YOU') || line.includes('LOVE YOU')
                      ? 'text-2xl font-bold text-gradient my-3'
                      : line === ''
                      ? 'h-4'
                      : 'text-rose-800 text-lg'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                >
                  {line || ' '}
                </motion.p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue button */}
      <AnimatePresence>
        {showContinue && (
          <motion.a
            href="#love-story"
            className="mt-10 flex flex-col items-center gap-2 text-rose-500 font-sans font-medium focus:outline-none focus:ring-2 focus:ring-rose-400 rounded-full px-4 py-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            aria-label="Continue to next section"
          >
            <span>Continue the Journey</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.a>
        )}
      </AnimatePresence>
    </section>
  )
}
