import { useState, useEffect } from 'react'
import MusicPlayer from './components/MusicPlayer'
import LoveRequest from './pages/LoveRequest'
import HappyScreen from './pages/HappyScreen'
import Hub from './pages/Hub'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('love-request')
  // MusicPlayer cuida internamente de tentar autoplay e,
  // se o navegador bloquear, tenta novamente na primeira interação.

  // Stop music when page is closed/unloaded
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Music will stop automatically when page unloads
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const handleAccept = () => {
    setCurrentPage('happy')
  }

  const handleContinue = () => {
    setCurrentPage('hub')
  }

  return (
    <div className="app">
      {currentPage === 'love-request' && <LoveRequest onAccept={handleAccept} />}
      {currentPage === 'happy' && <HappyScreen onContinue={handleContinue} />}
      {currentPage === 'hub' && <Hub />}
      <MusicPlayer canPlay={true} />
    </div>
  )
}

export default App
