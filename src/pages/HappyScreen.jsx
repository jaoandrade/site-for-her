import { useState, useEffect } from 'react'
import './HappyScreen.css'

const HappyScreen = ({ onContinue }) => {
  const [emojis, setEmojis] = useState([])
  const [showImages, setShowImages] = useState(true) // Show everything immediately
  const [showContinue, setShowContinue] = useState(true) // Show button immediately
  const [currentCatImages, setCurrentCatImages] = useState([])
  const [currentFeaturedImages, setCurrentFeaturedImages] = useState([])
  const [zoomedCatIndex, setZoomedCatIndex] = useState(null)

  // Easily editable romantic message
  const romanticMessage = `I'm so happy you said yes, sweetie! 💕

I love you so much! You mean the world to me, and I wanted to create something special just for you. ✨

I love you, Sumayyia... 😩💗 
You are so perfect and cute... gorgeous and simply stunning... ✨
Caring and takes care of me like no one else... 🫶🏻💋💋

You are quite a tease, as freaky as me... 👅 I liked that so much... 

I'm hopelessly in love with you 💕

This is our little corner of the internet, filled with love, memories, 
and fun times together, like 37 ☝️☝️

Thank you from the bottom of my heart... for being such a special and wonderful person in my life, my witch and little creature.. 
my pretty wifey...🥹💗 

I love you more than words can express! ❤️✨`

  const emojiList = ['❤️', '💕', '🌸', '✨', '💖', '💗', '💝', '❣️', '😻', '💋', '🌹']

  // TODAS as 18 imagens da pasta Love (garantindo uso completo)
  // LoveRequest usa 8 específicas, então HappyScreen usa as outras 10
  const allLoveImages = [
    // Imagens usadas em LoveRequest (não usar aqui):
    // LoveBeinglilFreakytogether.png, nub-cat-nub.gif, shebitingmycheeck.png,
    // SheIsMyLilBoba.png, UsAlsoTogetherAfterMissingEachOther.png, 
    // UsAndABigHeart.png, uswetkissing.png, wannaspendmywholelifewithu.png
    
    // Restantes 10 imagens para HappyScreen (topo):
    '/resources/images/nubnubcat/Love/ustogetherhappy.png',
    '/resources/images/nubnubcat/Love/ushugging.png',
    '/resources/images/nubnubcat/Love/shehuggingme.png',
    '/resources/images/nubnubcat/Love/sheRefilsMeWithLove.png',
    '/resources/images/nubnubcat/Love/Ilovehereyes.png',
    '/resources/images/nubnubcat/Love/HerMakeMyDihBlush.png',
    '/resources/images/nubnubcat/Love/MeTeasingHer.png',
    '/resources/images/nubnubcat/Love/samefreakquency.png',
    '/resources/images/nubnubcat/Love/sticker_27.png',
    '/resources/images/nubnubcat/Love/sticker_28.png'
  ]
  
  // Imagem central especial entre mensagem e "I love you sweetie"
  const centralImage = '/resources/images/nubnubcat/Love/fuckingmissyou.png'

  // Escolher 2 imagens aleatórias de gatos felizes para mobile (melhor organização)
  useEffect(() => {
    const shuffled = [...allLoveImages].sort(() => Math.random() - 0.5)
    setCurrentCatImages(shuffled.slice(0, 2))
  }, [])

  // Escolher 3 imagens para featured: sempre de Fotos Juntos e MeWithHer (mais Fotos Juntos)
  useEffect(() => {
    // Fotos Juntos (8 imagens) - mais prioridade
    const fotosJuntos = []
    fotosJuntos.push('/resources/images/album/Fotos Juntos.jpeg')
    for (let i = 2; i <= 8; i++) {
      fotosJuntos.push(`/resources/images/album/Fotos Juntos (${i}).jpeg`)
    }
    
    // MeWithHer (6 imagens) - menos prioridade
    const meWithHer = []
    meWithHer.push('/resources/images/album/MeWithHer.jpeg')
    for (let i = 2; i <= 6; i++) {
      meWithHer.push(`/resources/images/album/MeWithHer (${i}).jpeg`)
    }
    
    // Embaralhar cada grupo
    const shuffledFotosJuntos = [...fotosJuntos].sort(() => Math.random() - 0.5)
    const shuffledMeWithHer = [...meWithHer].sort(() => Math.random() - 0.5)
    
    // Selecionar 2 de Fotos Juntos e 1 de MeWithHer
    const selected = [
      ...shuffledFotosJuntos.slice(0, 2),
      shuffledMeWithHer[0]
    ]
    
    setCurrentFeaturedImages(selected)
  }, [])

  // Create emoji rain - otimizado para mobile (menos frequente e limitado)
  useEffect(() => {
    const MAX_EMOJIS = 6 // Limitar número máximo de emojis simultâneos
    
    const createEmoji = () => {
      setEmojis(prev => {
        // Limitar número de emojis simultâneos
        if (prev.length >= MAX_EMOJIS) {
          return prev
        }
        
        const emoji = {
          id: Date.now() + Math.random(),
          type: emojiList[Math.floor(Math.random() * emojiList.length)],
          left: Math.random() * 100,
          delay: Math.random() * 0.5,
          duration: 4 + Math.random() * 2,
          size: 20 + Math.random() * 25 // Tamanho reduzido
        }
        
        setTimeout(() => {
          setEmojis(current => current.filter(e => e.id !== emoji.id))
        }, (emoji.duration + emoji.delay) * 1000)
        
        return [...prev, emoji]
      })
    }

    // Intervalo muito maior (1500ms em vez de 400ms) para reduzir carga
    const interval = setInterval(createEmoji, 1500)
    
    // Criar menos emojis iniciais
    for (let i = 0; i < 3; i++) {
      setTimeout(createEmoji, i * 500)
    }

    // Everything shows immediately - no delays
    // setShowImages(true) - already set to true in useState
    // setShowContinue(true) - already set to true in useState

    return () => clearInterval(interval)
  }, [])

  const handleImageError = (e, fallbackEmoji) => {
    e.target.style.display = 'none'
    if (e.target.nextSibling) {
      e.target.nextSibling.style.display = 'block'
    }
  }

  return (
    <div className="happy-screen">
      {/* Emoji Rain */}
      {emojis.map(emoji => (
        <div
          key={emoji.id}
          className="emoji-rain"
          style={{
            left: `${emoji.left}%`,
            fontSize: `${emoji.size}px`,
            animationDelay: `${emoji.delay}s`,
            animationDuration: `${emoji.duration}s`
          }}
        >
          {emoji.type}
        </div>
      ))}

      <div className="happy-content fade-in">
        {/* Happy Nub Nub Cats - Agora com imagens reais e zoom ao clicar */}
        <div className="happy-cats">
          {currentCatImages.map((catImg, index) => (
            <div 
              key={index} 
              className={`happy-cat-wrapper ${zoomedCatIndex === index ? 'zoomed' : ''}`}
              onClick={() => {
                if (zoomedCatIndex === index) {
                  setZoomedCatIndex(null)
                } else {
                  setZoomedCatIndex(index)
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <img 
                src={catImg} 
                alt={`Happy cat ${index + 1}`}
                className="happy-cat-image float"
                style={{ animationDelay: `${index * 0.5}s` }}
                onError={(e) => handleImageError(e)}
              />
              <div 
                className="happy-cat-emoji float" 
                style={{ 
                  animationDelay: `${index * 0.5}s`,
                  display: 'none' 
                }}
              >
                {index === 1 ? '💕' : '🐱'}
              </div>
            </div>
          ))}
        </div>

        {/* Romantic Message */}
        <div className="message-container slide-in">
          <div className="message-text">
            {romanticMessage.split('\n').map((line, index) => (
              <p key={index} className="message-line">
                {line || '\u00A0'}
              </p>
            ))}
          </div>
        </div>

        {/* Central Image - fuckingmissyou */}
        {showImages && (
          <div className="central-image-container fade-in">
            <img 
              src={centralImage} 
              alt="Missing you" 
              className="central-image"
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none'
                if (e.target.nextSibling) {
                  e.target.nextSibling.style.display = 'block'
                }
              }}
            />
            <div className="central-image-emoji float" style={{ display: 'none' }}>💕</div>
          </div>
        )}

        {/* Featured Images Section */}
        {showImages && (
          <div className="featured-images-container fade-in">
            <h2 className="featured-title">I love you my sweetie</h2>
            <div className="featured-images">
              {currentFeaturedImages.map((imageUrl, index) => (
                <div key={index} className="featured-image-wrapper">
                  <img 
                    src={imageUrl} 
                    alt={`Love memory ${index + 1}`}
                    className="featured-image"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x300/ffb3d9/ffffff?text=Love+Memory'
                    }}
                  />
                  <div className="image-overlay">
                    <span className="overlay-heart">💖</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Decorative hearts */}
        <div className="decorative-hearts">
          <span className="heart heart-1">❤️</span>
          <span className="heart heart-2">💕</span>
          <span className="heart heart-3">💖</span>
          <span className="heart heart-4">💗</span>
          <span className="heart heart-5">💝</span>
        </div>

        {/* Continue Button */}
        {showContinue && (
          <button className="btn-continue bounce" onClick={onContinue}>
            Continue ✨
          </button>
        )}
      </div>
    </div>
  )
}

export default HappyScreen
