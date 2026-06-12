import { Place } from '../types'
import './PlaceCard.css'

interface Props {
  place: Place
  userInput: string
  onInputChange: (value: string) => void
  onOpen: () => void
  isCorrect: boolean
  solved: boolean
}

export default function PlaceCard({ place, userInput, onInputChange, onOpen, isCorrect, solved }: Props) {
  return (
    <div className={`place-card ${solved ? 'place-card--solved' : ''}`}>
      <button className="place-card__btn" onClick={onOpen}>
        <span className="place-card__emoji">{place.emoji}</span>
        <span className="place-card__name">{place.name}</span>
        {solved && <span className="place-card__check">✓</span>}
      </button>

      <div className="place-card__secret">
        <label className="place-card__label" htmlFor={`input-${place.id}`}>
          {solved ? 'Letra revelada:' : 'Qual é a letra secreta?'}
        </label>
        <input
          id={`input-${place.id}`}
          className={`place-card__input ${isCorrect ? 'place-card__input--correct' : userInput ? 'place-card__input--wrong' : ''}`}
          type="text"
          maxLength={1}
          value={userInput}
          onChange={e => onInputChange(e.target.value.toUpperCase())}
          placeholder="?"
          readOnly={solved}
        />
        {isCorrect && <span className="place-card__hint">✨</span>}
      </div>
    </div>
  )
}
