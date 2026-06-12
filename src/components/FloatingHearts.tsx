import { useEffect, useRef } from 'react'
import './FloatingHearts.css'

interface Heart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
  color: string
}

const HEART_COLORS = ['#FFB3C6', '#FFCCE5', '#E8B4D8', '#FFD6E0', '#F9C6DD', '#DDB5E9']

export default function FloatingHearts() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const hearts: Heart[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: 14 + Math.random() * 22,
      duration: 7 + Math.random() * 8,
      delay: Math.random() * 10,
      opacity: 0.25 + Math.random() * 0.35,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
    }))

    hearts.forEach(h => {
      const el = document.createElement('div')
      el.className = 'floating-heart'
      el.innerHTML = '♥'
      el.style.cssText = `
        left: ${h.x}%;
        font-size: ${h.size}px;
        animation-duration: ${h.duration}s;
        animation-delay: -${h.delay}s;
        opacity: ${h.opacity};
        color: ${h.color};
      `
      container.appendChild(el)
    })

    return () => {
      container.innerHTML = ''
    }
  }, [])

  return <div ref={containerRef} className="floating-hearts-container" aria-hidden="true" />
}
