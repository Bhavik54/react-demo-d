import { useEffect, useRef, useState } from 'react'
import { Music, VolumeX } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MusicToggle({ src }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!src) return
    audioRef.current = new Audio(src)
    audioRef.current.loop = true
    audioRef.current.volume = 0.4
    return () => {
      audioRef.current?.pause()
    }
  }, [src])

  const toggle = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  if (!src) return null

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center shadow-lg"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={playing ? 'Pause music' : 'Play music'}
      title={playing ? 'Pause music' : 'Play music'}
    >
      {playing ? (
        <Music size={20} className="text-rose-500 animate-pulse" />
      ) : (
        <VolumeX size={20} className="text-rose-400" />
      )}
    </motion.button>
  )
}
