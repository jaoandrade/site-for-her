import { useState, useEffect } from 'react'
import MusicPlayer from './components/MusicPlayer'
import LoveRequest from './pages/LoveRequest'
import HappyScreen from './pages/HappyScreen'
import Hub from './pages/Hub'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('love-request')
  const [userInteracted, setUserInteracted] = useState(true) // Start as true to allow auto-play

  // Start music immediately when site opens - no interaction needed
  useEffect(() => {
    // Set to true immediately to allow music to start
    setUserInteracted(true)
    
    // Also trigger a user interaction event to help with browser autoplay policies
    const handleFirstInteraction = () => {
      setUserInteracted(true)
    }
    
    // Listen for any user interaction to ensure autoplay works
    document.addEventListener('click', handleFirstInteraction, { once: true })
    document.addEventListener('touchstart', handleFirstInteraction, { once: true })
    
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
