import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

function StoryCard({ card, index, onOpen }) {
  return (
    <motion.button
      onClick={() => onOpen(card)}
      className="glass rounded-2xl p-6 text-left w-full shadow-md hover:shadow-xl transition-shadow focus:outline-none focus:ring-4 focus:ring-rose-300 group"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Open story: ${card.title}`}
    >
      <motion.div
        className="text-4xl mb-4"
        animate={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 3, delay: index * 0.5, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      >
        {card.emoji}
      </motion.div>
      <h3 className="font-serif text-xl font-bold text-rose-800 mb-2 group-hover:text-gradient transition-colors">
        {card.title}
      </h3>
      <p className="font-sans text-rose-600 text-sm leading-relaxed">{card.preview}</p>
      <div className="mt-4 text-xs text-rose-400 font-medium">Tap to read more →</div>
    </motion.button>
  )
}

function Modal({ card, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={card.title}
    >
      <div className="absolute inset-0 bg-rose-900/40 backdrop-blur-sm" />
      <motion.div
        className="relative glass rounded-3xl p-8 max-w-md w-full shadow-2xl"
        initial={{ scale: 0.85, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.85, y: 40 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-rose-400 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400 rounded-full p-1"
          aria-label="Close"
        >
          <X size={20} />
        </button>
        <div className="text-5xl mb-4" aria-hidden="true">{card.emoji}</div>
        <h3 className="font-serif text-2xl font-bold text-gradient mb-4">{card.title}</h3>
        <p className="font-sans text-rose-700 leading-relaxed">{card.detail}</p>
        <div className="mt-6 flex justify-center gap-2" aria-hidden="true">
          {['❤️', '💕', '✨'].map((h, i) => (
            <motion.span
              key={i}
              className="text-xl"
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity }}
            >
              {h}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function GallerySection({ photos }) {
  if (!photos || photos.length === 0) return null
  return (
    <div className="mt-16 w-full max-w-2xl mx-auto">
      <motion.h3
        className="font-serif text-2xl font-bold text-center text-gradient mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Our Memories 📸
      </motion.h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {photos.map((photo, i) => (
          <motion.div
            key={i}
            className="rounded-2xl overflow-hidden shadow-md aspect-square"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.04 }}
          >
            <img
              src={photo.src}
              alt={photo.caption || `Memory ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function LoveStory({ cards, photos, name }) {
  const [activeCard, setActiveCard] = useState(null)

  return (
    <section id="love-story" className="section-story min-h-screen px-4 py-20" aria-label="Our Love Story">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-gradient mb-3">Our Little Universe ✨</h2>
          <p className="text-rose-600 font-sans">Tap a card to explore our story</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cards.map((card, i) => (
            <StoryCard key={card.id} card={card} index={i} onOpen={setActiveCard} />
          ))}
        </div>

        <GallerySection photos={photos} />
      </div>

      <AnimatePresence>
        {activeCard && <Modal card={activeCard} onClose={() => setActiveCard(null)} />}
      </AnimatePresence>
    </section>
  )
}
