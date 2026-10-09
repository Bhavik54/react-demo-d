import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const OPTIONS = [
  {
    label: 'A little? 💗',
    response: 'A little? Not even close! ❤️',
    sub: 'My love for you is beyond all measurements.',
    emoji: '❤️',
    color: 'from-pink-200 to-rose-200',
  },
  {
    label: 'A lot? 💖',
    response: 'A lot? More than all the stars in the sky. ✨',
    sub: 'Every star, every galaxy — still not enough.',
    emoji: '🌟',
    color: 'from-rose-200 to-pink-300',
  },
  {
    label: 'More than words can say? 💘',
    response: "Now you're getting it! 🥹❤️",
    sub: 'You understand. Some feelings can only be felt.',
    emoji: '🥹',
    color: 'from-pink-300 to-rose-400',
  },
]

export default function InteractiveQuestion({ name }) {
  const [selected, setSelected] = useState(null)

  return (
    <section className="section-question min-h-screen flex flex-col items-center justify-center px-4 py-20" aria-label="Interactive Love Question">
      <motion.div
        className="text-center max-w-lg mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gradient mb-4">
          {name}, do you know how much I love you?
        </h2>
        <p className="text-rose-600 font-sans mb-10">Pick one ↓</p>

        <div className="flex flex-col gap-4 mb-8">
          {OPTIONS.map((opt, i) => (
            <motion.button
              key={i}
              onClick={() => setSelected(opt)}
              className={`glass rounded-2xl px-6 py-4 font-serif text-lg font-semibold text-rose-800 shadow-md transition-all focus:outline-none focus:ring-4 focus:ring-rose-300 ${
                selected === opt ? 'ring-2 ring-rose-400 bg-rose-50' : ''
              }`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.03, x: 6 }}
              whileTap={{ scale: 0.98 }}
              aria-pressed={selected === opt}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.label}
              className={`glass rounded-3xl p-8 shadow-xl bg-gradient-to-br ${selected.color}`}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -20 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.6, repeat: 2 }}
                aria-hidden="true"
              >
                {selected.emoji}
              </motion.div>
              <p className="font-serif text-2xl font-bold text-rose-800 mb-2">{selected.response}</p>
              <p className="font-sans text-rose-600">{selected.sub}</p>

              <motion.div
                className="mt-4 flex justify-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                aria-hidden="true"
              >
                {['❤️', '💕', '💖', '💗'].map((h, i) => (
                  <motion.span
                    key={i}
                    className="text-xl"
                    animate={{ y: [-6, 6, -6] }}
                    transition={{ duration: 1.4, delay: i * 0.2, repeat: Infinity }}
                  >
                    {h}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {selected && (
          <motion.a
            href="#finale"
            className="mt-10 inline-block btn-primary focus:outline-none focus:ring-4 focus:ring-rose-300"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            aria-label="Continue to the finale"
          >
            One more thing... 🌹
          </motion.a>
        )}
      </motion.div>
    </section>
  )
}
