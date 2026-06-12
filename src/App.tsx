import { useState } from 'react'
import HomePage from './pages/HomePage'
import PuzzlePage from './pages/PuzzlePage'
import { Place } from './types'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'puzzle'>('home')
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)

  const handleOpenPuzzle = (place: Place) => {
    setSelectedPlace(place)
    setCurrentPage('puzzle')
  }

  const handleBack = () => {
    setCurrentPage('home')
    setSelectedPlace(null)
  }

  return (
    <div className="app">
      {currentPage === 'home' && (
        <HomePage onOpenPuzzle={handleOpenPuzzle} />
      )}
      {currentPage === 'puzzle' && selectedPlace && (
        <PuzzlePage place={selectedPlace} onBack={handleBack} />
      )}
    </div>
  )
}

export default App
