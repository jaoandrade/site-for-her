import { useState, useEffect, useRef } from 'react'
import './LoveRequest.css'

const LoveRequest = ({ onAccept }) => {
  const [noButtonAttempts, setNoButtonAttempts] = useState(0)
  const [noButtonVisible, setNoButtonVisible] = useState(true)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [isNoButtonFixed, setIsNoButtonFixed] = useState(false)
  const [disappearEmojis, setDisappearEmojis] = useState([])
  const [emojis, setEmojis] = useState([])
  const [sadCatVisible, setSadCatVisible] = useState(false)
  const [currentCatImage, setCurrentCatImage] = useState('')
  const [buttonsDisabled, setButtonsDisabled] = useState(false)
  const noButtonRef = useRef(null)
  const containerRef = useRef(null)
  const buttonsContainerRef = useRef(null)

  const emojiList = ['❤️', '💕', '❣️', '✨', '💖', '💗', '🩷', '😻', '🌸', '💋']
  const disappearEmojiList = ['👹', '😭', '😭', '😭', '👹', '😭']
  
  // Imagens Nub Nub Cat da pasta Love - Rotação aleatória (8 imagens específicas para página principal)
  const loveCatImages = [
    '/resources/images/nubnubcat/Love/LoveBeinglilFreakytogether.png',
    '/resources/images/nubnubcat/Love/nub-cat-nub.gif',
    '/resources/images/nubnubcat/Love/shebitingmycheeck.png',
    '/resources/images/nubnubcat/Love/SheIsMyLilBoba.png',
    '/resources/images/nubnubcat/Love/UsAlsoTogetherAfterMissingEachOther.png',
    '/resources/images/nubnubcat/Love/UsAndABigHeart.png',
    '/resources/images/nubnubcat/Love/uswetkissing.png',
    '/resources/images/nubnubcat/Love/wannaspendmywholelifewithu.png'
  ]
  
  // Imagens tristes da pasta Sad
  const sadCatImages = [
    '/resources/images/nubnubcat/Sad/Sad (1).webp',
    '/resources/images/nubnubcat/Sad/Sad (2).webp'
  ]
  
  // Textos que mudam a cada tentativa
  const noButtonTexts = [
    '❌ NO',
    '😤 NO WAY',
    '🙅 NOPE',
    '😏 MAYBE... NO',
    '🤔 HMM... NO',
    '😅 STILL NO',
    '😢 REALLY?',
    '😭 PLEASE?',
    '🥺 COME ON..SWEETIE',
    '💔 LAST CHANCE'
  ]

  // Escolher imagem de gato aleatória ao carregar
  useEffect(() => {
    const randomCat = loveCatImages[Math.floor(Math.random() * loveCatImages.length)]
    setCurrentCatImage(randomCat)
  }, [])

  // Listener para redimensionamento da janela
  useEffect(() => {
    if (!isNoButtonFixed) return
    
    const handleResize = () => {
      if (noButtonRef.current) {
        const button = noButtonRef.current
        const buttonRect = button.getBoundingClientRect()
        const buttonWidth = buttonRect.width || button.offsetWidth
        const buttonHeight = buttonRect.height || button.offsetHeight
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const padding = 15
        
        const currentX = noButtonPosition.x
        const currentY = noButtonPosition.y
        
        const minX = padding
        const minY = padding
        const maxX = viewportWidth - buttonWidth - padding
        const maxY = viewportHeight - buttonHeight - padding
        
        if (currentX < minX || currentX > maxX || currentY < minY || currentY > maxY) {
          const newX = Math.max(minX, Math.min(currentX, maxX))
          const newY = Math.max(minY, Math.min(currentY, maxY))
          setNoButtonPosition({ x: newX, y: newY })
        }
      }
    }
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [isNoButtonFixed, noButtonPosition])

  // Create emoji rain - otimizado para mobile (menos frequente e limitado)
  useEffect(() => {
    const MAX_EMOJIS = 5 // Limitar número máximo de emojis simultâneos
    
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
          delay: Math.random() * 1,
          duration: 3 + Math.random() * 2,
          size: 12 + Math.random() * 15  // Tamanho ainda mais reduzido
        }
        
        setTimeout(() => {
          setEmojis(current => current.filter(e => e.id !== emoji.id))
        }, (emoji.duration + emoji.delay) * 1000)
        
        return [...prev, emoji]
      })
    }

    // Intervalo muito maior (2000ms em vez de 800ms) para reduzir carga
    const interval = setInterval(createEmoji, 2000)
    
    // Criar menos emojis iniciais
    for (let i = 0; i < 2; i++) {
      setTimeout(createEmoji, i * 600)
    }

    return () => clearInterval(interval)
  }, [])

  const handleNoClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Prevent double clicks - disable buttons for 1 second
    if (buttonsDisabled) return
    
    setButtonsDisabled(true)
    setTimeout(() => {
      setButtonsDisabled(false)
    }, 1000)
    
    const newAttempts = noButtonAttempts + 1
    setNoButtonAttempts(newAttempts)
    
    if (newAttempts === 1) {
      setIsNoButtonFixed(true)
    }
    
    // Após 10 tentativas, mostrar gato triste
    if (newAttempts >= 10) {
      setNoButtonVisible(false)
      setSadCatVisible(true)
      
      // Criar emojis de desaparecimento
      const buttonRect = noButtonRef.current?.getBoundingClientRect()
      const containerRect = containerRef.current?.getBoundingClientRect()
      
      if (buttonRect && containerRect) {
        const buttonCenterX = buttonRect.left - containerRect.left + buttonRect.width / 2
        const buttonCenterY = buttonRect.top - containerRect.top + buttonRect.height / 2
        
        const newEmojis = []
        for (let i = 0; i < 8; i++) {
          const emoji = {
            id: Date.now() + i,
            type: disappearEmojiList[Math.floor(Math.random() * disappearEmojiList.length)],
            x: buttonCenterX,
            y: buttonCenterY,
            angle: (i * 45) * (Math.PI / 180),
            distance: 100 + Math.random() * 50
          }
          newEmojis.push(emoji)
        }
        setDisappearEmojis(newEmojis)
        
        setTimeout(() => {
          setDisappearEmojis([])
        }, 2000)
      }
      
      return
    }
    
    // Calcular nova posição dentro dos limites do viewport/dispositivo
    if (noButtonRef.current && buttonsContainerRef.current) {
      requestAnimationFrame(() => {
        const button = noButtonRef.current
        const buttonsContainer = buttonsContainerRef.current
        if (!button) return
        
        const buttonWidth = button.offsetWidth || button.clientWidth || 200
        const buttonHeight = button.offsetHeight || button.clientHeight || 60
      
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const padding = 10
      
        const minX = padding
        const minY = padding
        const maxX = Math.max(minX, viewportWidth - buttonWidth - padding)
        const maxY = Math.max(minY, viewportHeight - buttonHeight - padding)
      
        if (maxX <= minX || maxY <= minY || buttonWidth >= viewportWidth || buttonHeight >= viewportHeight) {
          const safeX = Math.max(0, Math.floor((viewportWidth - buttonWidth) / 2))
          const safeY = Math.max(0, Math.floor((viewportHeight - buttonHeight) / 2))
          setNoButtonPosition({ x: safeX, y: safeY })
          return
        }
      
        let newX, newY
        let attempts = 0
        const maxAttempts = 30
      
        do {
          newX = Math.floor(Math.random() * (maxX - minX + 1)) + minX
          newY = Math.floor(Math.random() * (maxY - minY + 1)) + minY
          
          if (newX + buttonWidth > viewportWidth - padding) {
            newX = viewportWidth - buttonWidth - padding
          }
          if (newX < minX) {
            newX = minX
          }
          
          if (newY + buttonHeight > viewportHeight - padding) {
            newY = viewportHeight - buttonHeight - padding
          }
          if (newY < minY) {
            newY = minY
          }
          
          const yesButton = buttonsContainer.querySelector('.btn-yes')
          if (yesButton) {
            const yesRect = yesButton.getBoundingClientRect()
            const yesCenterX = yesRect.left + yesRect.width / 2
            const yesCenterY = yesRect.top + yesRect.height / 2
            const buttonCenterX = newX + buttonWidth / 2
            const buttonCenterY = newY + buttonHeight / 2
          
            const distance = Math.sqrt(
              Math.pow(buttonCenterX - yesCenterX, 2) + Math.pow(buttonCenterY - yesCenterY, 2)
            )
          
            if (distance < 120) {
              attempts++
              if (attempts >= maxAttempts) {
                newX = Math.max(minX, Math.min(maxX, viewportWidth - buttonWidth - padding))
                newY = Math.max(minY, Math.min(maxY, viewportHeight - buttonHeight - padding))
                break
              }
              continue
            }
          }
          
          if (newX >= minX && 
              newX + buttonWidth <= viewportWidth - padding &&
              newY >= minY && 
              newY + buttonHeight <= viewportHeight - padding) {
            break
          }
          
          attempts++
        } while (attempts < maxAttempts)
      
        let finalX = Math.max(minX, Math.min(newX, maxX))
        let finalY = Math.max(minY, Math.min(newY, maxY))
        
        if (finalX + buttonWidth > viewportWidth - padding) {
          finalX = viewportWidth - buttonWidth - padding
        }
        if (finalY + buttonHeight > viewportHeight - padding) {
          finalY = viewportHeight - buttonHeight - padding
        }
        
        finalX = Math.max(0, Math.min(finalX, viewportWidth - buttonWidth))
        finalY = Math.max(0, Math.min(finalY, viewportHeight - buttonHeight))
      
        setNoButtonPosition({ x: finalX, y: finalY })
      })
    }
  }

  const handleNoTouch = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!buttonsDisabled) {
      handleNoClick(e)
    }
  }

  const handleYesClick = () => {
    // Prevent double clicks - disable buttons for 1 second
    if (buttonsDisabled) return
    
    setButtonsDisabled(true)
    setTimeout(() => {
      setButtonsDisabled(false)
      onAccept()
    }, 100)
  }

  const handleImageError = (e) => {
    if (e.target.nextSibling) {
      e.target.style.display = 'none'
      e.target.nextSibling.style.display = 'block'
    }
  }

  return (
    <div className="love-request" ref={containerRef}>
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

      {/* Disappear Emojis */}
      {disappearEmojis.map(emoji => {
        const finalX = Math.cos(emoji.angle) * emoji.distance
        const finalY = Math.sin(emoji.angle) * emoji.distance
        return (
          <div
            key={emoji.id}
            className="disappear-emoji"
            style={{
              left: `${emoji.x}px`,
              top: `${emoji.y}px`,
              '--final-x': `${finalX}px`,
              '--final-y': `${finalY}px`
            }}
          >
            {emoji.type}
          </div>
        )
      })}

      {/* Sad Cat - Aparece após 10 recusas */}
      {sadCatVisible && (
        <div className="sad-cat-container fade-in">
          <img 
            src={sadCatImages[Math.floor(Math.random() * sadCatImages.length)]} 
            alt="Sad Nub Nub Cat" 
            className="sad-cat-image"
            onError={(e) => {
              e.target.style.display = 'none'
              if (e.target.nextSibling) {
                e.target.nextSibling.style.display = 'block'
              }
            }}
          />
          <div className="sad-cat-emoji" style={{ display: 'none' }}>😢</div>
          <p className="sad-cat-message">Please say yes... 💔</p>
        </div>
      )}

      <div className="love-request-content">
        {/* Nub Nub Cat - Agora com imagem real */}
        <div className="nub-cat-container">
          {currentCatImage && (
            <>
              <img 
                src={currentCatImage} 
                alt="Nub Nub Cat" 
                className="nub-cat-image float"
                onError={handleImageError}
              />
              <div className="nub-cat-emoji float" style={{ display: 'none' }}>🐱</div>
            </>
          )}
        </div>

        {/* Main Text */}
        <h1 className="love-text fade-in">I love you</h1>
        
        <div className="question-container slide-in">
          <p className="question-text">You love me too?🤭</p>
        </div>

        {/* Buttons */}
        <div className="buttons-container fade-in" ref={buttonsContainerRef}>
          <button 
            className="btn-yes"
            onClick={handleYesClick}
            disabled={buttonsDisabled}
            style={{
              opacity: buttonsDisabled ? 0.6 : 1,
              cursor: buttonsDisabled ? 'not-allowed' : 'pointer'
            }}
          >
            ✅ YES
          </button>
          
          {noButtonVisible && (
            <button
              ref={noButtonRef}
              className="btn-no"
              onClick={handleNoClick}
              onTouchStart={handleNoTouch}
              disabled={buttonsDisabled}
              style={{
                position: isNoButtonFixed ? 'fixed' : 'relative',
                left: isNoButtonFixed ? `${noButtonPosition.x}px` : 'auto',
                top: isNoButtonFixed ? `${noButtonPosition.y}px` : 'auto',
                right: isNoButtonFixed ? 'auto' : 'auto',
                bottom: isNoButtonFixed ? 'auto' : 'auto',
                transition: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                opacity: noButtonAttempts >= 10 ? 0 : (buttonsDisabled ? 0.6 : 1),
                transform: noButtonAttempts >= 10 ? 'scale(0)' : 'scale(1)',
                zIndex: isNoButtonFixed ? 1000 : 1,
                cursor: buttonsDisabled ? 'not-allowed' : 'pointer'
              }}
            >
              {noButtonTexts[Math.min(noButtonAttempts, noButtonTexts.length - 1)]}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LoveRequest
