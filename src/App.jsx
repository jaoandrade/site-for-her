import { useState, useEffect } from 'react'
import MusicPlayer from './components/MusicPlayer'
import LoveRequest from './pages/LoveRequest'
import HappyScreen from './pages/HappyScreen'
import Hub from './pages/Hub'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('love-request')
  const [userInteracted, setUserInteracted] = useState(false) // Music starts only after first interaction

  // Enable music only after the first user interaction (click/touch)
  useEffect(() => {
    const handleFirstInteraction = () => {
      setUserInteracted(true)
      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
    
    // Listen for any user interaction to start music
    document.addEventListener('click', handleFirstInteraction)
    document.addEventListener('touchstart', handleFirstInteraction)
    
    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [])

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
      <MusicPlayer canPlay={userInteracted} />
    </div>
  )
}

export default App
