import { useState } from 'react'
import './LoveNotes.css'

const LoveNotes = ({ onBack }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  // Favorite photos
  const favoritePhotos = [
    { id: 1, url: '/resources/images/album/Fotos Juntos (7).jpeg', comment: 'Beautiful moments together 💕' },
    { id: 2, url: '/resources/images/album/Fotos Juntos (6).jpeg', comment: 'Perfect memories ✨' },
    { id: 3, url: '/resources/images/album/MeWithHer.jpeg', comment: 'Us together 🥰' }
  ]

  // Músicas favoritas
  const favoriteSongs = [
    { title: 'Thanks For The Venom', artist: 'My Chemical Romance' },
    { title: 'Back to the Old House', artist: 'The Smiths' },
    { title: 'Riptide', artist: 'Vance Joy' }
  ]

  // Special moments
  const specialMoments = [
    { title: 'We Meet', date: '2025-10-20', emoji: '💕', location: 'Croatia' },
    { title: 'First Kiss', date: '2025-11-17', emoji: '💋' },
    { title: 'Living happily as a couple in Croatia', date: '2025-12-10', emoji: '🏖️' }
  ]

  // Special events (important dates)
  const specialEvents = [
    { 
      name: 'Our Anniversary', 
      date: '2025-11-17', 
      emoji: '💕',
      description: 'Our first kiss'
    },
    {
      name: 'Last Trip',
      date: '2025-12-20',
      emoji: '✈️',
      description: 'Last flight together'
    },
    {
      name: 'Our Wedding',
      date: '20--10-20',
      emoji: '💍',
      description: '20 de Outubro de 20--'
    }
  ]

  const calculateDaysUntil = (targetDate) => {
    // If date contains "--", don't calculate (enigmatic wedding)
    if (targetDate && targetDate.includes('--')) {
      return null
    }
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target - today
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo)
  }

  const closePhotoModal = () => {
    setSelectedPhoto(null)
  }

  const formatDate = (dateString) => {
    // If date contains "--", return as is (enigmatic)
    if (dateString && dateString.includes('--')) {
      return 'October 20, 20--'
    }
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <div className="love-notes">
      <div className="love-notes-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <h1 className="love-notes-title">💌 Me And Her 💌</h1>
      </div>

      <div className="love-notes-content">
        {/* Me And Her Section - Favorites */}
        <section className="favorites-section">
          <h2 className="section-title">💕 Me And Her</h2>
          
          {/* Favorite Photos */}
          <div className="favorites-subsection">
            <h3 className="subsection-title">📸 Favorite Photos</h3>
            <div className="favorite-photos-grid">
              {favoritePhotos.map(photo => (
                <div 
                  key={photo.id} 
                  className="favorite-photo-card"
                  onClick={() => openPhotoModal(photo)}
                >
                  <img 
                    src={photo.url} 
                    alt="Favorite memory" 
                    className="favorite-photo"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200x200/ffb3d9/ffffff?text=Memory'
                    }}
                  />
                  <p className="favorite-photo-comment">{photo.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Favorite Songs */}
          <div className="favorites-subsection">
            <h3 className="subsection-title">🎵 Favorite Songs</h3>
            <div className="favorite-songs-list">
              {favoriteSongs.map((song, index) => (
                <div key={index} className="favorite-song-item">
                  <span className="song-emoji">🎶</span>
                  <div className="song-info">
                    <span className="song-title">{song.title}</span>
                    <span className="song-artist">{song.artist}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Special Moments */}
          <div className="favorites-subsection">
            <h3 className="subsection-title">✨ Special Moments</h3>
            <div className="special-moments-list">
              {specialMoments.map((moment, index) => (
                <div key={index} className="special-moment-item">
                  <span className="moment-emoji">{moment.emoji}</span>
                  <div className="moment-info">
                    <span className="moment-title">{moment.title}</span>
                    <span className="moment-date">
                      {formatDate(moment.date)}
                      {moment.location && <span className="moment-location"> • {moment.location}</span>}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Special Events Calendar */}
        <section className="events-section">
          <h2 className="section-title">📅 Special Events</h2>
          <div className="events-container">
            {specialEvents.map((event, index) => {
              const daysUntil = calculateDaysUntil(event.date)
              const isEnigmatic = event.date.includes('--')
              const isPast = daysUntil !== null && daysUntil < 0
              
              return (
                <div key={index} className="event-card">
                  <div className="event-header">
                    <span className="event-emoji">{event.emoji}</span>
                    <h3 className="event-name">{event.name}</h3>
                  </div>
                  <p className="event-description">{event.description}</p>
                  <div className="event-date-info">
                    <span className="event-date">
                      {isEnigmatic ? 'October 20, 20--' : formatDate(event.date)}
                    </span>
                    {!isEnigmatic && (
                      !isPast ? (
                        <span className="countdown">
                          {daysUntil === 0 
                            ? 'Today! 🎉' 
                            : daysUntil === 1 
                            ? 'Tomorrow! ⏰' 
                            : `${daysUntil} days to go ⏳`
                          }
                        </span>
                      ) : (
                        <span className="countdown past">
                          {Math.abs(daysUntil)} days ago 💕
                        </span>
                      )
                    )}
                    {isEnigmatic && (
                      <span className="countdown enigmatic">✨ In Future (Soom) ✨</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Freaky Mode Button */}
        <div className="freaky-mode-section">
          <button className="freaky-mode-button">
            <span className="freaky-emoji">😈</span>
            <span className="freaky-text">Freaky Mode</span>
            <span className="freaky-subtitle">Coming Soon...</span>
          </button>
        </div>
      </div>

      {/* Modal for enlarged photo */}
      {selectedPhoto && (
        <div className="photo-modal" onClick={closePhotoModal}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="photo-modal-close" onClick={closePhotoModal}>
              ✕
            </button>
            <img 
              src={selectedPhoto.url} 
              alt={selectedPhoto.comment}
              className="photo-modal-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600/ffb3d9/ffffff?text=Memory'
              }}
            />
            {selectedPhoto.comment && (
              <p className="photo-modal-comment">{selectedPhoto.comment}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default LoveNotes
