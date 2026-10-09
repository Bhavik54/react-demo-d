import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const trailRef = useRef(null)
  const [visible, setVisible] = useState(false)
  const pos = useRef({ x: 0, y: 0 })
  const trail = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only show on pointer:fine devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      setVisible(true)
    }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)

    let raf
    const animate = () => {
      trail.current.x += (pos.current.x - trail.current.x) * 0.15
      trail.current.y += (pos.current.y - trail.current.y) * 0.15
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 6}px, ${pos.current.y - 6}px)`
      }
      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${trail.current.x - 16}px, ${trail.current.y - 16}px)`
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
      cancelAnimationFrame(raf)
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Dot */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-3 h-3 rounded-full"
        style={{ background: '#f43f5e', willChange: 'transform' }}
        aria-hidden="true"
      />
      {/* Trail ring */}
      <div
        ref={trailRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-8 h-8 rounded-full border-2"
        style={{ borderColor: 'rgba(244,63,94,0.4)', willChange: 'transform' }}
        aria-hidden="true"
      />
    </>
  )
}
