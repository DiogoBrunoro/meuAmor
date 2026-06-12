import { useState, useEffect, useRef } from 'react'
import { Place } from '../types'
import './PuzzlePage.css'

interface Props {
  place: Place
  onBack: () => void
}

// O grid é um array de 9 posições.
// Cada célula contém o ID da peça (0-7) ou -1 (espaço vazio).
// A peça ID=N pertence à posição N quando resolvido.

const GRID_SIZE = 3

function getNeighbors(pos: number): number[] {
  const row = Math.floor(pos / GRID_SIZE)
  const col = pos % GRID_SIZE
  const n: number[] = []
  if (row > 0)             n.push(pos - GRID_SIZE)
  if (row < GRID_SIZE - 1) n.push(pos + GRID_SIZE)
  if (col > 0)             n.push(pos - 1)
  if (col < GRID_SIZE - 1) n.push(pos + 1)
  return n
}

// Gera um grid embaralhado por movimentos aleatórios (sempre solucionável)
function buildShuffled(): number[] {
  // Estado inicial resolvido: [0,1,2,3,4,5,6,7,-1]
  const grid: number[] = [0, 1, 2, 3, 4, 5, 6, 7, -1]
  let blank = 8

  for (let i = 0; i < 400; i++) {
    const neighbors = getNeighbors(blank)
    const target = neighbors[Math.floor(Math.random() * neighbors.length)]
    ;[grid[blank], grid[target]] = [grid[target], grid[blank]]
    blank = target
  }

  return grid
}

function isSolved(grid: number[]): boolean {
  for (let i = 0; i < 8; i++) {
    if (grid[i] !== i) return false
  }
  return true // grid[8] pode ser -1 ou qualquer coisa
}

export default function PuzzlePage({ place, onBack }: Props) {
  const [grid, setGrid] = useState<number[]>(() => buildShuffled())
  const [solved, setSolved] = useState(false)
  const [moves, setMoves] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [revealSecret, setRevealSecret] = useState(false)
  const [imgError, setImgError] = useState(false)
  const previewTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (moves > 0 && isSolved(grid)) {
      setSolved(true)
      setTimeout(() => setRevealSecret(true), 800)
    }
  }, [grid, moves])

  const handlePieceClick = (clickedPos: number) => {
    if (solved) return
    const blankPos = grid.indexOf(-1)
    if (!getNeighbors(blankPos).includes(clickedPos)) return

    setGrid(prev => {
      const next = [...prev]
      ;[next[blankPos], next[clickedPos]] = [next[clickedPos], next[blankPos]]
      return next
    })
    setMoves(m => m + 1)
  }

  const handleReset = () => {
    setGrid(buildShuffled())
    setSolved(false)
    setRevealSecret(false)
    setMoves(0)
  }

  const handlePreviewHold = () => {
    previewTimer.current = setTimeout(() => setShowPreview(true), 200)
  }
  const handlePreviewRelease = () => {
    if (previewTimer.current) clearTimeout(previewTimer.current)
    setShowPreview(false)
  }

  const PIECE_PERCENT = 100 / GRID_SIZE

  return (
    <div className="puzzle-page">
      <div className="puzzle-page__inner">
        {/* Header */}
        <div className="puzzle-page__header">
          <button className="puzzle-page__back" onClick={onBack}>
            ← Voltar
          </button>
          <div className="puzzle-page__place-info">
            <span className="puzzle-page__emoji">{place.emoji}</span>
            <div>
              <h2 className="puzzle-page__name">{place.name}</h2>
              <p className="puzzle-page__desc">{place.description}</p>
            </div>
          </div>
        </div>

        {/* Puzzle area */}
        <div className="puzzle-page__content">
          <div className="puzzle-page__controls">
            <span className="puzzle-page__moves">🎯 {moves} movimentos</span>
            <button className="puzzle-page__reset" onClick={handleReset}>Embaralhar</button>
            <button
              className="puzzle-page__preview"
              onMouseDown={handlePreviewHold}
              onMouseUp={handlePreviewRelease}
              onTouchStart={handlePreviewHold}
              onTouchEnd={handlePreviewRelease}
            >
              👁 Ver foto
            </button>
          </div>

          <div className="puzzle-container">
            {/* Preview overlay */}
            {showPreview && (
              <div className="puzzle-preview">
                {imgError
                  ? <div className="puzzle-preview__placeholder">
                      📷 Adicione sua foto em<br />
                      <code>/public{place.imagePath}</code>
                    </div>
                  : <img src={place.imagePath} alt="Preview" onError={() => setImgError(true)} />
                }
              </div>
            )}

            {/* Puzzle grid */}
            <div
              className={`puzzle-grid ${solved ? 'puzzle-grid--solved' : ''}`}
              style={{ '--grid-size': GRID_SIZE } as React.CSSProperties}
            >
              {grid.map((pieceId, pos) => {
                // Célula vazia
                if (pieceId === -1) {
                  return <div key="blank" className="puzzle-cell puzzle-cell--blank" />
                }

                const row = Math.floor(pieceId / GRID_SIZE)
                const col = pieceId % GRID_SIZE
                const isCorrect = pieceId === pos

                return (
                  <div
                    key={pieceId}
                    className={`puzzle-cell ${isCorrect ? 'puzzle-cell--correct' : ''}`}
                    onClick={() => handlePieceClick(pos)}
                    style={
                      imgError
                        ? {}
                        : {
                            backgroundImage: `url(${place.imagePath})`,
                            backgroundSize: `${GRID_SIZE * 100}%`,
                            backgroundPosition: `${col * PIECE_PERCENT * (GRID_SIZE / (GRID_SIZE - 1))}% ${row * PIECE_PERCENT * (GRID_SIZE / (GRID_SIZE - 1))}%`,
                          }
                    }
                  >
                    {imgError && (
                      <span className="puzzle-cell__number">{pieceId + 1}</span>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Secret reveal */}
          {revealSecret && (
            <div className="puzzle-page__secret">
              <div className="puzzle-page__secret-content">
                <p className="puzzle-page__secret-memory">{place.memory}</p>
                <div className="puzzle-page__secret-char">
                  <span className="puzzle-page__secret-label">Letra secreta revelada:</span>
                  <span className="puzzle-page__secret-value">{place.secretChar}</span>
                </div>
                <p className="puzzle-page__secret-hint">
                  Anote esta letra na tela principal! ✨
                </p>
                <button className="puzzle-page__done" onClick={onBack}>
                  ← Voltar à página principal
                </button>
              </div>
            </div>
          )}

          {!revealSecret && (
            <p className="puzzle-page__instructions">
              Clique nas peças ao lado do espaço vazio para movê-las.<br />
              Monte a foto para revelar a letra secreta!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
