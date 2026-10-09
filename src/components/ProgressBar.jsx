import { motion } from 'framer-motion'

const LABELS = ['Letter', 'Story', 'Question', 'Finale']

export default function ProgressBar({ active, total }) {
  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2"
      role="progressbar"
      aria-valuenow={active + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label={`Section ${active + 1} of ${total}: ${LABELS[active]}`}
    >
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          className="rounded-full"
          initial={false}
          animate={{
            width: i === active ? 28 : 8,
            height: 8,
            backgroundColor: i <= active ? '#f43f5e' : 'rgba(244,63,94,0.3)',
          }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
