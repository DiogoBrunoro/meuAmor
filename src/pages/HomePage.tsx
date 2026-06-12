import { useState, useEffect } from 'react'
import { Place } from '../types'
import { places, SECRET_PASSWORD, SPOTIFY_LINK } from '../data/places'
import PlaceCard from '../components/PlaceCard'
import FloatingHearts from '../components/FloatingHearts'
import SpotifyReveal from '../components/SpotifyReveal'
import './HomePage.css'

interface Props {
  onOpenPuzzle: (place: Place) => void
}

const STORAGE_KEY = 'love-project-solved'

export default function HomePage({ onOpenPuzzle }: Props) {
  const [inputs, setInputs] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem('love-project-inputs')
    return saved ? JSON.parse(saved) : {}
  })

  const [solvedIds] = useState<Set<string>>(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? new Set(JSON.parse(saved)) : new Set()
  })

  const [allCorrect, setAllCorrect] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleInputChange = (placeId: string, value: string) => {
    const next = { ...inputs, [placeId]: value }
    setInputs(next)
    localStorage.setItem('love-project-inputs', JSON.stringify(next))
  }

  useEffect(() => {
    const typedPassword = places.map(p => inputs[p.id] || '').join('')
    if (typedPassword.toUpperCase() === SECRET_PASSWORD.toUpperCase() && SECRET_PASSWORD.length > 0) {
      setAllCorrect(true)
      setShowConfetti(true)
    } else {
      setAllCorrect(false)
    }
  }, [inputs])

  return (
    <div className="home">
      <FloatingHearts />

      <div className="home__inner">
        <header className="home__header">
          <p className="home__eyebrow">para você 💌</p>
          <h1 className="home__title">Nossa História</h1>
          <p className="home__subtitle">
            Cada lugar guarda um pedaço do nosso caminho juntos.<br />
            Complete os quebra-cabeças e descubra o segredo.
          </p>
        </header>

        <div className="home__hint">
          <span>🔑</span>
          <p>Complete os quebra-cabeças e descubra a letra secreta de cada lugar</p>
        </div>

        <div className="home__grid">
          {places.map(place => (
            <PlaceCard
              key={place.id}
              place={place}
              userInput={inputs[place.id] || ''}
              onInputChange={val => handleInputChange(place.id, val)}
              onOpen={() => onOpenPuzzle(place)}
              isCorrect={
                (inputs[place.id] || '').toUpperCase() === place.secretChar.toUpperCase()
              }
              solved={solvedIds.has(place.id)}
            />
          ))}
        </div>

        {allCorrect && (
          <SpotifyReveal link={SPOTIFY_LINK} />
        )}

        {showConfetti && <Confetti />}
      </div>
    </div>
  )
}

function Confetti() {
  const pieces = Array.from({ length: 30 }, (_, i) => i)
  const colors = ['#FFB3C6', '#E8D5F5', '#FFD6E0', '#FFE8D6', '#B3D4FF', '#D4FFB3']

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map(i => (
        <div
          key={i}
          className="confetti__piece"
          style={{
            left: `${Math.random() * 100}%`,
            background: colors[Math.floor(Math.random() * colors.length)],
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
            width: `${6 + Math.random() * 8}px`,
            height: `${6 + Math.random() * 8}px`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          } as React.CSSProperties}
        />
      ))}
    </div>
  )
}
