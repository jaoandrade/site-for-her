import { useState } from 'react'
import Album from '../components/Album'
import LoveWars from '../games/LoveWars'
import LoveNotes from './LoveNotes'
import './Hub.css'

const Hub = () => {
  const [activeView, setActiveView] = useState(null)
  
  // Decorative NubCat images spread throughout the Hub
  // Using images that complement the theme well and are not being used intensively
  const decorativeCatImages = [
    '/resources/images/nubnubcat/Love/ustogetherhappy.png',
    '/resources/images/nubnubcat/Love/ushugging.png',
    '/resources/images/nubnubcat/Love/shehuggingme.png',
    '/resources/images/nubnubcat/Love/sheRefilsMeWithLove.png',
    '/resources/images/nubnubcat/Love/Ilovehereyes.png',
    '/resources/images/nubnubcat/Love/HerMakeMyDihBlush.png',
    '/resources/images/nubnubcat/Love/MeTeasingHer.png',
    '/resources/images/nubnubcat/Love/samefreakquency.png'
  ]
  
  // Random decorative positions for the cats
  const decorativePositions = [
    { top: '10%', left: '5%', delay: '0s' },
    { top: '20%', right: '8%', delay: '0.5s' },
    { top: '60%', left: '3%', delay: '1s' },
    { top: '40%', right: '5%', delay: '1.5s' },
    { bottom: '15%', left: '10%', delay: '2s' },
    { bottom: '25%', right: '12%', delay: '2.5s' }
  ]

  if (activeView === 'album') {
    return <Album onBack={() => setActiveView(null)} />
  }

  if (activeView === 'love-wars') {
    return <LoveWars onBack={() => setActiveView(null)} />
  }

  if (activeView === 'love-notes') {
    return <LoveNotes onBack={() => setActiveView(null)} />
  }

  return (
    <div className="hub">
      {/* Decorative NubCats spread around */}
      {decorativeCatImages.slice(0, 6).map((catImg, index) => (
        <div
          key={index}
          className="decorative-cat"
          style={{
            ...decorativePositions[index],
            animationDelay: decorativePositions[index]?.delay || '0s'
          }}
        >
          <img 
            src={catImg} 
            alt={`Decorative cat ${index + 1}`}
            className="decorative-cat-image"
            onError={(e) => {
              e.target.style.display = 'none'
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'block'
              }
            }}
          />
          <div 
            className="decorative-cat-emoji float" 
            style={{ display: 'none' }}
          >
            🐱
          </div>
        </div>
      ))}
      
      <div className="hub-content fade-in">
        <h1 className="hub-title">💕 Our Special Place 💕</h1>
        
        <div className="hub-buttons">
          <button 
            className="hub-button album-button"
            onClick={() => setActiveView('album')}
          >
            <span className="button-emoji">📸</span>
            <span className="button-text">Album</span>
            <span className="button-subtitle">Our memories together</span>
          </button>

          <button 
            className="hub-button wars-button"
            onClick={() => setActiveView('love-wars')}
          >
            <span className="button-emoji">🎮</span>
            <span className="button-text">Love Wars</span>
            <span className="button-subtitle">Play together</span>
          </button>

          <button 
            className="hub-button notes-button"
            onClick={() => setActiveView('love-notes')}
          >
            <span className="button-emoji">💕</span>
            <span className="button-text">Me And Her</span>
            <span className="button-subtitle">Our special moments</span>
          </button>
        </div>

        <div className="hub-footer">
          <p className="footer-text">❤️ For my sweet Sumayyia 🤭</p>
        </div>
      </div>
    </div>
  )
}

export default Hub
