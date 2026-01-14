import { useState, useRef, useEffect } from 'react'
import './MusicPlayer.css'

const MusicPlayer = ({ canPlay }) => {
  const [isPlaying, setIsPlaying] = useState(true) // Start playing automatically
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showPlayer, setShowPlayer] = useState(false)
  const audioRef = useRef(null)
  
  // Lista completa das 21 músicas
  const allSongs = [
    { name: "I Wanna Be Yours", artist: "Arctic Monkeys", url: "/resources/sounds/musica/Artic Monkeys - I Wanna Be Yours.mp3" },
    { name: "Attention", artist: "Charlie Puth", url: "/resources/sounds/musica/Charlie Puth - Attention.mp3" },
    { name: "LET THE WORLD BURN", artist: "Chris Grey", url: "/resources/sounds/musica/Chris Grey - LET THE WORLD BURN.mp3" },
    { name: "I Think They Call This Love", artist: "Elliot James Reay", url: "/resources/sounds/musica/Elliot James Reay - I Think They Call This Love.mp3" },
    { name: "Can't Help Falling in Love", artist: "Elvis Presley", url: "/resources/sounds/musica/Elvis Presley - Can't Help Falling in Love.mp3" },
    { name: "Sailor Song", artist: "Gigi Perez", url: "/resources/sounds/musica/Gigi Perez - Sailor Song.mp3" },
    { name: "we fell in love in october", artist: "girl in red", url: "/resources/sounds/musica/girl in red - we fell in love in october.mp3" },
    { name: "From The Start", artist: "Laufey", url: "/resources/sounds/musica/Laufey - From The Start.mp3" },
    { name: "The Night We Met", artist: "Lord Huron", url: "/resources/sounds/musica/Lord Huron - The Night We Met.mp3" },
    { name: "Sway", artist: "Michael Bublé", url: "/resources/sounds/musica/Michael Bublé - Sway.mp3" },
    { name: "My Love Mine All Mine", artist: "Mitski", url: "/resources/sounds/musica/Mitski - My Love Mine All Mine.mp3" },
    { name: "Those Eyes", artist: "New West", url: "/resources/sounds/musica/New West - Those Eyes.mp3" },
    { name: "Nem de Graça", artist: "Pixote", url: "/resources/sounds/musica/Pixote - Nem de Graça.mp3" },
    { name: "Dandelions", artist: "Ruth B.", url: "/resources/sounds/musica/Ruth B. - Dandelions.mp3" },
    { name: "Until I Found You", artist: "Stephen Sanchez", url: "/resources/sounds/musica/Stephen Sanchez - Until I Found You.mp3" },
    { name: "Compass", artist: "The Neighbourhood", url: "/resources/sounds/musica/The Neighbourhood - Compass.mp3" },
    { name: "Reflections", artist: "The Neighbourhood", url: "/resources/sounds/musica/The Neighbourhood - Reflections.mp3" },
    { name: "Every Breath You Take", artist: "The Police", url: "/resources/sounds/musica/The Police - Every Breath You Take (Lyrics).mp3" },
    { name: "Riptide", artist: "Vance Joy", url: "/resources/sounds/musica/Vance Joy - Riptide.mp3" },
    { name: "Blue", artist: "Yung Kai", url: "/resources/sounds/musica/Yung Kai - Blue.mp3" }
  ]

  // Imagens fofas da pasta Love para usar como capa da música
  // (aparecem na notificação/lockscreen do telemóvel quando a música toca)
  const loveArtworkImages = [
    '/resources/images/nubnubcat/Love/ustogetherhappy.png',
    '/resources/images/nubnubcat/Love/ushugging.png',
    '/resources/images/nubnubcat/Love/shehuggingme.png',
    '/resources/images/nubnubcat/Love/sheRefilsMeWithLove.png',
    '/resources/images/nubnubcat/Love/Ilovehereyes.png',
    '/resources/images/nubnubcat/Love/HerMakeMyDihBlush.png',
    '/resources/images/nubnubcat/Love/MeTeasingHer.png',
    '/resources/images/nubnubcat/Love/samefreakquency.png',
    '/resources/images/nubnubcat/Love/sticker_27.png',
    '/resources/images/nubnubcat/Love/sticker_28.png',
    '/resources/images/nubnubcat/Love/fuckingmissyou.png',
  ]

  // Estados para controle de não repetição
  const [currentSong, setCurrentSong] = useState(null)
  const [playedSongs, setPlayedSongs] = useState([])
  const shuffledPlaylistRef = useRef([])

  // Inicializar com música completamente aleatória de todas as 21 músicas
  useEffect(() => {
    if (shuffledPlaylistRef.current.length === 0 && !currentSong) {
      // Embaralhar todas as músicas aleatoriamente
      const shuffled = [...allSongs].sort(() => Math.random() - 0.5)
      shuffledPlaylistRef.current = shuffled
      
      // Começar com primeira música aleatória (índice 0)
      setCurrentSong(shuffled[0])
      setPlayedSongs([0])
    }
  }, [currentSong])

  // Atualizar src do áudio quando currentSong muda e tocar automaticamente
  useEffect(() => {
    if (audioRef.current && currentSong) {
      audioRef.current.src = currentSong.url
      audioRef.current.load()

      // Atualizar ícone/capa da notificação do telemóvel (Media Session API)
      try {
        if ('mediaSession' in navigator && loveArtworkImages.length > 0) {
          const randomArtwork =
            loveArtworkImages[Math.floor(Math.random() * loveArtworkImages.length)]

          navigator.mediaSession.metadata = new window.MediaMetadata({
            title: currentSong.name || 'For You 💕',
            artist: currentSong.artist || 'For my sweetie',
            album: 'For You',
            artwork: [
              {
                src: randomArtwork,
                sizes: '512x512',
                type: 'image/png',
              },
            ],
          })
        }
      } catch (err) {
        console.log('Erro ao atualizar Media Session artwork:', err)
      }
      
      // Tocar automaticamente quando a música muda (se canPlay for true)
      if (canPlay) {
        setIsPlaying(true) // Garantir que está marcado como playing
        
        // Try to play immediately
        const playPromise = audioRef.current.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Successfully started playing
              setIsPlaying(true)
            })
            .catch(err => {
              console.log('Auto-play prevented, will try on user interaction:', err)
              // If autoplay fails, try again on first user interaction
              const tryPlayOnInteraction = () => {
                audioRef.current?.play()
                  .then(() => setIsPlaying(true))
                  .catch(() => {})
                document.removeEventListener('click', tryPlayOnInteraction)
                document.removeEventListener('touchstart', tryPlayOnInteraction)
              }
              document.addEventListener('click', tryPlayOnInteraction, { once: true })
              document.addEventListener('touchstart', tryPlayOnInteraction, { once: true })
            })
        }
      }
    }
  }, [currentSong, canPlay])

  // Controlar play/pause quando isPlaying muda
  useEffect(() => {
    if (audioRef.current && currentSong && canPlay) {
      if (isPlaying) {
        audioRef.current.play().catch(err => {
          console.log('Audio play failed:', err)
        })
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, canPlay, currentSong])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !currentSong) return

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100)
        setDuration(audio.duration)
      }
    }

    const updateDuration = () => {
      setDuration(audio.duration)
    }

    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('loadedmetadata', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateProgress)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [currentSong])

  const togglePlay = () => {
    if (canPlay) {
      setIsPlaying(!isPlaying)
      setShowPlayer(true)
    }
  }

  // Função para obter próxima música não tocada (ou reembaralhar se completou todas)
  const getNextUntrackedSong = () => {
    const playlist = shuffledPlaylistRef.current
    
    // Se todas as músicas foram tocadas, reembaralhar tudo aleatoriamente
    if (playedSongs.length >= allSongs.length) {
      const newShuffle = [...allSongs].sort(() => Math.random() - 0.5)
      shuffledPlaylistRef.current = newShuffle
      setPlayedSongs([])
      return { song: newShuffle[0], newIndex: 0 }
    }

    // Encontrar próxima música não tocada na sequência embaralhada
    const currentIndex = currentSong ? playlist.findIndex(song => song.url === currentSong.url) : -1
    
    // Procurar próxima não tocada a partir da atual
    for (let i = 1; i < playlist.length; i++) {
      const checkIndex = (currentIndex + i) % playlist.length
      if (!playedSongs.includes(checkIndex)) {
        return { song: playlist[checkIndex], newIndex: checkIndex }
      }
    }

    // Se chegou aqui, todas foram tocadas (não deveria acontecer, mas volta ao início)
    return { song: playlist[0], newIndex: 0 }
  }

  const handleEnded = () => {
    // Quando música termina, marcar atual como tocada e tocar próxima não tocada
    if (currentSong) {
      const currentIndex = shuffledPlaylistRef.current.findIndex(s => s.url === currentSong.url)
      if (currentIndex !== -1) {
        setPlayedSongs(prev => {
          const newPlayed = [...prev]
          if (!newPlayed.includes(currentIndex)) {
            newPlayed.push(currentIndex)
          }
          return newPlayed
        })
      }
    }
    
    // Obter próxima música não tocada (ou voltar ao início se completou todas)
    const { song, newIndex } = getNextUntrackedSong()
    setCurrentSong(song)
    setPlayedSongs(prev => {
      const newPlayed = [...prev]
      if (!newPlayed.includes(newIndex)) {
        newPlayed.push(newIndex)
      }
      return newPlayed
    })
  }

  const nextTrack = () => {
    // Pular para próxima música não tocada (ou próxima na sequência se todas foram tocadas)
    const { song, newIndex } = getNextUntrackedSong()
    
    // Marcar música atual como tocada se ainda não foi
    if (currentSong) {
      const currentIndex = shuffledPlaylistRef.current.findIndex(s => s.url === currentSong.url)
      if (currentIndex !== -1 && !playedSongs.includes(currentIndex)) {
        setPlayedSongs(prev => {
          const newPlayed = [...prev, currentIndex]
          // Atualizar também com a próxima se necessário
          if (!newPlayed.includes(newIndex)) {
            newPlayed.push(newIndex)
          }
          return newPlayed
        })
      } else {
        // Apenas adicionar a próxima se a atual já estava marcada
        setPlayedSongs(prev => {
          if (!prev.includes(newIndex)) {
            return [...prev, newIndex]
          }
          return prev
        })
      }
    } else {
      setPlayedSongs(prev => {
        if (!prev.includes(newIndex)) {
          return [...prev, newIndex]
        }
        return prev
      })
    }
    
    setCurrentSong(song)
  }

  const prevTrack = () => {
    // Voltar para música anterior (se houver)
    const playlist = shuffledPlaylistRef.current
    const currentIndex = playlist.findIndex(song => song.url === currentSong?.url)
    
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1
      setCurrentSong(playlist[prevIndex])
    } else {
      // Se estiver na primeira, vai para a última
      setCurrentSong(playlist[playlist.length - 1])
    }
  }

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleProgressClick = (e) => {
    if (!audioRef.current || !duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = clickX / rect.width
    audioRef.current.currentTime = percentage * duration
  }

  if (!currentSong) {
    return null // Não renderizar até ter uma música selecionada
  }

  return (
    <div className={`music-player ${showPlayer ? 'expanded' : ''}`}>
      <audio
        ref={audioRef}
        src={currentSong.url}
        onEnded={handleEnded}
        preload="auto"
      />
      
      <div className="music-controls">
        <button 
          className="music-toggle" 
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
          disabled={!canPlay}
        >
          {isPlaying ? '||' : '>'}
        </button>
        
        {showPlayer && (
          <>
            <button className="music-nav prev" onClick={prevTrack} aria-label="Previous">
              |◀
            </button>
            <button className="music-nav next" onClick={nextTrack} aria-label="Next">
              ▶|
            </button>
            <button className="music-expand" onClick={() => setShowPlayer(!showPlayer)}>
              {showPlayer ? '▼' : '▲'}
            </button>
          </>
        )}
      </div>

      {showPlayer && (
        <div className="music-details">
          <div className="music-info">
            <span className="music-note">🎵</span>
            <div className="music-text">
              <div className="music-title">{currentSong.name}</div>
              {currentSong.artist && (
                <div className="music-artist">{currentSong.artist}</div>
              )}
            </div>
          </div>
          
          <div className="music-progress-container" onClick={handleProgressClick}>
            <div className="music-progress-bar">
              <div 
                className="music-progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="music-time">
              <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MusicPlayer
