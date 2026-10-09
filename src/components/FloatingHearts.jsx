import { useEffect, useState } from 'react'

const HEARTS = ['❤️', '💕', '💗', '💖', '🌸', '✨']

function Heart({ x, y, size, emoji, delay }) {
  return (
    <div
      className="pointer-events-none fixed z-10 select-none"
      style={{
        left: x,
        top: y,
        fontSize: size,
        animation: `floatUp ${2 + Math.random()}s ease-out ${delay}s forwards`,
        opacity: 0,
      }}
      aria-hidden="true"
    >
      {emoji}
    </div>
  )
}

let idCounter = 0

export default function FloatingHearts({ active }) {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    if (!active) return

    const spawn = () => {
      const id = ++idCounter
      const heart = {
        id,
        x: `${Math.random() * 95}vw`,
        y: `${70 + Math.random() * 20}vh`,
        size: `${12 + Math.random() * 16}px`,
        emoji: HEARTS[Math.floor(Math.random() * HEARTS.length)],
        delay: 0,
      }
      setHearts((h) => [...h.slice(-25), heart])
      setTimeout(() => setHearts((h) => h.filter((x) => x.id !== id)), 3500)
    }

    const interval = setInterval(spawn, 800)
    return () => clearInterval(interval)
  }, [active])

  return (
    <>
      {hearts.map((h) => (
        <Heart key={h.id} {...h} />
      ))}
    </>
  )
}
