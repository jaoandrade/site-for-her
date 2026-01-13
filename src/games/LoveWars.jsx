import { useState, useEffect, useRef } from 'react'
import './LoveWars.css'

const LoveWars = ({ onBack }) => {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [showStartPopup, setShowStartPopup] = useState(true)
  const [showEndPopup, setShowEndPopup] = useState(false)
  const gameStartTimeRef = useRef(Date.now())
  const canvasSizeRef = useRef({ width: 0, height: 0 })
  const livesRef = useRef(3) // Ref para evitar re-renders que causam mudança de resolução
  
  // Imagens do Player
  const playerImages = [
    '/resources/images/nubnubcat/Game/Player/player.png',
    '/resources/images/nubnubcat/Game/Player/player (2).png'
  ]
  
  // Imagens do Enemy
  const enemyImages = [
    '/resources/images/nubnubcat/Game/Enemy/enemy.png',
    '/resources/images/nubnubcat/Game/Enemy/enemy.gif',
    '/resources/images/nubnubcat/Game/Enemy/enemy.webp'
  ]
  
  // Tipos de projéteis que o inimigo pode atirar
  const projectileTypes = [
    { emoji: '❤️', name: 'coração' },
    { emoji: '💋', name: 'beijo' },
    { emoji: '🍫', name: 'chocolate' },
    { emoji: '🍬', name: 'doce' },
    { emoji: '🌹', name: 'rosa' },
    { emoji: '🍰', name: 'bolo' },
    { emoji: '💝', name: 'presente' },
    { emoji: '💐', name: 'flores' }
  ]
  
  // Imagens do EndGame
  const endGameImages = [
    '/resources/images/nubnubcat/Game/EndGame/endgame.png',
    '/resources/images/nubnubcat/Game/EndGame/endgame (1).jpg',
    '/resources/images/nubnubcat/Game/EndGame/endgame (1).gif',
    '/resources/images/nubnubcat/Game/EndGame/endgame (1).webp',
    '/resources/images/nubnubcat/Game/EndGame/endgame (2).jpg',
    '/resources/images/nubnubcat/Game/EndGame/endgame (2).gif',
    '/resources/images/nubnubcat/Game/EndGame/endgame (3).jpg'
  ]
  
  // Obter pontuação máxima do localStorage
  const getHighScore = () => {
    try {
      const highScore = localStorage.getItem('loveWarsHighScore')
      return highScore ? parseInt(highScore, 10) : 0
    } catch (e) {
      return 0
    }
  }
  
  // Salvar pontuação máxima
  const saveHighScore = (newScore) => {
    try {
      const currentHighScore = getHighScore()
      if (newScore > currentHighScore) {
        localStorage.setItem('loveWarsHighScore', newScore.toString())
      }
    } catch (e) {
      // Ignorar erros de localStorage
    }
  }
  
  const gameStateRef = useRef({
    // Gato em cima (atira corações)
    enemyCat: { 
      x: 0, 
      y: 0, 
      width: 60, 
      height: 60,
      direction: 1, // 1 = direita, -1 = esquerda
      speed: 1.5,
      lastHeartShot: 0,
      heartShotInterval: 2000, // Começa atirando a cada 2 segundos
      imageIndex: 0,
      cornerTime: 0, // Tempo que está nos cantos (em ms)
      lastPositionX: 0, // Última posição X para detectar se travou
      stuckTime: 0 // Tempo que está na mesma posição (travado)
    },
    // Player em baixo (pega corações)
    player: { 
      x: 0, 
      y: 0, 
      width: 60, // 1.2x de 50
      height: 60, // 1.2x de 50
      imageIndex: 0,
      initialY: 0 // Guardar posição Y inicial para não mudar durante o jogo
    },
    // Projéteis que caem (agora pode ser diferentes tipos)
    projectiles: [],
    // Tempo de jogo para dificuldade progressiva
    gameTime: 0,
    // Controles de teclado
    keys: {}
  })

  // Cache de imagens
  const imageCacheRef = useRef({
    player: [],
    enemy: []
  })

  // Carregar imagens
  useEffect(() => {
    const loadImages = async () => {
      // Carregar imagens do player
      for (let i = 0; i < playerImages.length; i++) {
        const img = new Image()
        img.src = playerImages[i]
        await new Promise((resolve) => {
          img.onload = resolve
          img.onerror = resolve
        })
        imageCacheRef.current.player[i] = img
      }
      
      // Carregar imagens do enemy
      for (let i = 0; i < enemyImages.length; i++) {
        const img = new Image()
        img.src = enemyImages[i]
        await new Promise((resolve) => {
          img.onload = resolve
          img.onerror = resolve
        })
        imageCacheRef.current.enemy[i] = img
      }
    }
    loadImages()
  }, [])

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      const containerWidth = rect.width
      const containerHeight = rect.height
      
      // Guardar tamanho atual para evitar redimensionamentos durante o jogo
      canvasSizeRef.current = { width: containerWidth, height: containerHeight }
      
      // Definir dimensões do canvas com alta resolução para melhor qualidade
      const dpr = window.devicePixelRatio || 1
      canvas.width = containerWidth * dpr
      canvas.height = containerHeight * dpr
      
      // Escalar contexto para compensar DPR
      const ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)
      
      // Ajustar estilo do canvas para manter tamanho visual
      canvas.style.width = containerWidth + 'px'
      canvas.style.height = containerHeight + 'px'
      
      const state = gameStateRef.current
      // Player começa na direita, bem em baixo mas acima do botão de música
      // Calcular altura do botão de música considerando mobile (pode ser até 75px quando expandido)
      const musicPlayerHeight = window.innerWidth <= 480 ? 80 : 75
      state.player.x = containerWidth - state.player.width - 20
      // Guardar posição Y inicial e usar sempre a mesma (sobe ligeiramente - 10px a mais)
      state.player.initialY = containerHeight - state.player.height - musicPlayerHeight - 10
      state.player.y = state.player.initialY
      
      // Gato inimigo começa no centro bem em cima
      state.enemyCat.x = (containerWidth - state.enemyCat.width) / 2
      state.enemyCat.y = 10
    }

    resizeCanvas()
    const handleResize = () => {
      // Só redimensionar se não estiver em jogo ativo (para evitar bug de resolução ao levar dano)
      // Usar livesRef ao invés de lives state para evitar re-renders
      if (isPaused || gameOver || showStartPopup || livesRef.current <= 0) {
        resizeCanvas()
      }
    }
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', () => {
      if (isPaused || gameOver || showStartPopup) {
        setTimeout(resizeCanvas, 100)
      }
    })

    // Keyboard controls
    const handleKeyDown = (e) => {
      gameStateRef.current.keys = gameStateRef.current.keys || {}
      gameStateRef.current.keys[e.key] = true
    }

    const handleKeyUp = (e) => {
      gameStateRef.current.keys = gameStateRef.current.keys || {}
      gameStateRef.current.keys[e.key] = false
    }

    // Touch controls
    let touchStartX = 0
    let isTouching = false

    const handleTouchStart = (e) => {
      e.preventDefault()
      e.stopPropagation()
      isTouching = true
      const touch = e.touches[0] || e.changedTouches[0]
      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      touchStartX = x
      
      const state = gameStateRef.current
      state.player.x = Math.max(0, Math.min(x - state.player.width / 2, rect.width - state.player.width))
    }

    const handleTouchMove = (e) => {
      if (!isTouching) return
      e.preventDefault()
      e.stopPropagation()
      const touch = e.touches[0] || e.changedTouches[0]
      if (!touch) return
      const rect = canvas.getBoundingClientRect()
      const x = touch.clientX - rect.left
      
      const state = gameStateRef.current
      state.player.x = Math.max(0, Math.min(x - state.player.width / 2, rect.width - state.player.width))
    }

    const handleTouchEnd = (e) => {
      e.preventDefault()
      e.stopPropagation()
      isTouching = false
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false })
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false })
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false })
    canvas.addEventListener('touchcancel', handleTouchEnd, { passive: false })

    // Game loop
    let animationFrameId
    let lastTime = 0
    const ctx = canvas.getContext('2d')

    const gameLoop = (currentTime) => {
      if (!isPaused && !gameOver && !showStartPopup) {
        const deltaTime = currentTime - lastTime
        lastTime = currentTime

        update(deltaTime)
        draw(ctx, canvasSizeRef.current.width, canvasSizeRef.current.height)
      }
      animationFrameId = requestAnimationFrame(gameLoop)
    }

    if (!showStartPopup && !gameOver) {
      lastTime = 0
      animationFrameId = requestAnimationFrame(gameLoop)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      canvas.removeEventListener('touchmove', handleTouchMove)
      canvas.removeEventListener('touchstart', handleTouchStart)
      canvas.removeEventListener('touchend', handleTouchEnd)
      canvas.removeEventListener('touchcancel', handleTouchEnd)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
    }
  }, [isPaused, gameOver, showStartPopup])

  // Salvar pontuação máxima quando o jogo termina
  useEffect(() => {
    if (gameOver) {
      saveHighScore(score)
      setTimeout(() => setShowEndPopup(true), 500)
    }
  }, [gameOver, score])

  const update = (deltaTime) => {
    const state = gameStateRef.current
    const canvas = canvasRef.current
    if (!canvas) return

    const canvasWidth = canvasSizeRef.current.width
    const canvasHeight = canvasSizeRef.current.height

    // Calcular tempo de jogo (em segundos)
    state.gameTime = (Date.now() - gameStartTimeRef.current) / 1000

    // Mover player (apenas horizontalmente - Y nunca muda)
    const playerSpeed = 4
    const keys = state.keys || {}
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
      state.player.x = Math.max(0, state.player.x - playerSpeed)
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
      state.player.x = Math.min(canvasWidth - state.player.width, state.player.x + playerSpeed)
    }
    // Garantir que posição Y nunca muda durante o jogo
    state.player.y = state.player.initialY

    // Mover gato inimigo - EVITA o player (objetivo: fazer projéteis caírem nas áreas vazias)
    const baseSpeed = 1.5
    const speedIncrease = Math.min(state.gameTime / 20, 4) // Aumenta até 4x após 20 segundos (mais rápido com o tempo)
    state.enemyCat.speed = baseSpeed + speedIncrease

    // Mudança de imagem do enemy baseada no tempo (a cada 10 segundos)
    state.enemyCat.imageIndex = Math.floor(state.gameTime / 10) % enemyImages.length

    // Detectar se travou (mesma posição por muito tempo)
    const positionChanged = Math.abs(state.enemyCat.x - state.enemyCat.lastPositionX) > 0.1
    if (!positionChanged) {
      state.enemyCat.stuckTime += deltaTime
      // Se travou por mais de 200ms, forçar mudança de direção
      if (state.enemyCat.stuckTime > 200) {
        state.enemyCat.direction *= -1
        state.enemyCat.stuckTime = 0
      }
    } else {
      state.enemyCat.stuckTime = 0
      state.enemyCat.lastPositionX = state.enemyCat.x
    }
    
    // Inimigo EVITA o player: calcular distância e mover para longe
    const playerCenterX = state.player.x + state.player.width / 2
    const enemyCenterX = state.enemyCat.x + state.enemyCat.width / 2
    const distanceToPlayer = enemyCenterX - playerCenterX
    
    // Detectar cantos (últimos 150px de cada lado)
    const cornerZone = 150
    const isNearLeftCorner = state.enemyCat.x <= cornerZone
    const isNearRightCorner = state.enemyCat.x + state.enemyCat.width >= canvasWidth - cornerZone
    const isInCorner = isNearLeftCorner || isNearRightCorner
    
    // Se está nos cantos, incrementar tempo
    if (isInCorner) {
      state.enemyCat.cornerTime += deltaTime
      // Se ficou mais de 1 segundo no canto, forçar sair
      if (state.enemyCat.cornerTime > 1000) {
        if (isNearLeftCorner) {
          state.enemyCat.direction = 1 // Forçar ir para direita
        } else {
          state.enemyCat.direction = -1 // Forçar ir para esquerda
        }
        state.enemyCat.cornerTime = 0
      }
    } else {
      state.enemyCat.cornerTime = 0 // Reset quando não está no canto
    }
    
    // Se estiver muito perto do player, mover para longe (mas respeitando limites de canto)
    const avoidanceDistance = state.enemyCat.width * 2.5 // Distância mínima para evitar
    const tooClose = Math.abs(distanceToPlayer) < avoidanceDistance
    
    if (tooClose && !isInCorner) {
      // Mover para longe do player (só se não estiver forçado a sair do canto)
      if (distanceToPlayer > 0) {
        // Inimigo está à direita do player, mover mais para direita
        state.enemyCat.direction = 1
      } else {
        // Inimigo está à esquerda do player, mover mais para esquerda
        state.enemyCat.direction = -1
      }
    } else if (!isInCorner) {
      // Se não está muito perto nem no canto, continuar padrão de movimento mas evitando quando necessário
      // Se o player está se aproximando, mudar direção
      const playerMovingLeft = (state.keys?.['ArrowLeft'] || state.keys?.['a'] || state.keys?.['A'])
      const playerMovingRight = (state.keys?.['ArrowRight'] || state.keys?.['d'] || state.keys?.['D'])
      
      if (playerMovingLeft && distanceToPlayer < 0 && Math.abs(distanceToPlayer) < avoidanceDistance * 2) {
        // Player indo para esquerda e inimigo à esquerda - evitar, ir para direita
        state.enemyCat.direction = 1
      } else if (playerMovingRight && distanceToPlayer > 0 && Math.abs(distanceToPlayer) < avoidanceDistance * 2) {
        // Player indo para direita e inimigo à direita - evitar, ir para esquerda
        state.enemyCat.direction = -1
      }
    }
    
    // Mover o inimigo (sempre se move, nunca para)
    const oldX = state.enemyCat.x
    state.enemyCat.x += state.enemyCat.speed * state.enemyCat.direction
    
    // Limitar dentro dos bounds e mudar direção automaticamente
    if (state.enemyCat.x <= 0) {
      state.enemyCat.direction = 1
      state.enemyCat.x = 0
      state.enemyCat.cornerTime = 0 // Reset ao bater na borda
    } else if (state.enemyCat.x + state.enemyCat.width >= canvasWidth) {
      state.enemyCat.direction = -1
      state.enemyCat.x = canvasWidth - state.enemyCat.width
      state.enemyCat.cornerTime = 0 // Reset ao bater na borda
    }
    
    // Garantir movimento: se não se moveu (travou na borda), forçar movimento
    if (Math.abs(state.enemyCat.x - oldX) < 0.1 && !isInCorner) {
      // Se está no lado esquerdo, ir para direita; se está no direito, ir para esquerda
      if (state.enemyCat.x < canvasWidth / 2) {
        state.enemyCat.direction = 1
      } else {
        state.enemyCat.direction = -1
      }
    }

    // Gato atira projéteis - intervalo diminui mais rápido (mudado de 120s para 60s)
    const baseInterval = 2000
    const minInterval = 600 // Reduzido de 800 para 600ms (mais rápido)
    const timeReduction = Math.min(state.gameTime / 60, 1) // Reduz ao longo de 60 segundos (mais rápido)
    state.enemyCat.heartShotInterval = baseInterval - (baseInterval - minInterval) * timeReduction

    const now = Date.now()
    if (now - state.enemyCat.lastHeartShot > state.enemyCat.heartShotInterval) {
      // Selecionar tipo de projétil aleatório
      const projectileType = projectileTypes[Math.floor(Math.random() * projectileTypes.length)]
      
      // Atirar do centro do inimigo (objetivo: cair nas áreas vazias, não onde o player está)
      const baseX = state.enemyCat.x + state.enemyCat.width / 2 - 15
      const projectileX = baseX
      
      // Velocidade base que aumenta com o tempo
      const baseSpeed = 2 + (state.gameTime / 30) * 1.5 // Aumenta mais com o tempo
      
      // Alguns projéteis (30% de chance, especialmente coração) caem mais rápido
      const isFastProjectile = Math.random() < 0.3 || projectileType.emoji === '❤️'
      const speedMultiplier = isFastProjectile ? 1.5 + (state.gameTime / 60) * 0.5 : 1.0 // Fast projéteis 1.5x mais rápido, aumenta com tempo
      const projectileSpeed = baseSpeed * speedMultiplier
      
      state.projectiles.push({
        x: Math.max(0, Math.min(projectileX, canvasWidth - 30)),
        y: state.enemyCat.y + state.enemyCat.height,
        width: 30,
        height: 30,
        speed: projectileSpeed,
        type: projectileType.emoji,
        name: projectileType.name,
        isFast: isFastProjectile
      })
      state.enemyCat.lastHeartShot = now
    }

    // Atualizar projéteis (caem)
    state.projectiles = state.projectiles.filter(projectile => {
      projectile.y += projectile.speed
      
      // Verificar colisão com player (pegar projétil)
      if (
        projectile.x < state.player.x + state.player.width &&
        projectile.x + projectile.width > state.player.x &&
        projectile.y < state.player.y + state.player.height &&
        projectile.y + projectile.height > state.player.y
      ) {
        // Player pegou o projétil - ganha 1 ponto
        setScore(prev => {
          const newScore = prev + 1
          // Mudança de imagem do player baseada nos pontos (a cada 10 pontos)
          state.player.imageIndex = Math.floor(newScore / 10) % playerImages.length
          return newScore
        })
        
        return false
      }

      // Se projétil passou do player (perdeu vida)
      if (projectile.y > canvasHeight) {
        // Usar ref para evitar re-render que causa mudança de resolução
        livesRef.current = livesRef.current - 1
        const newLives = livesRef.current
        // Atualizar state apenas para UI, mas usar ref para lógica
        setLives(newLives)
        if (newLives <= 0) {
          setGameOver(true)
        }
        return false
      }

      return projectile.y < canvasHeight + 50
    })
  }

  const draw = (ctx, width, height) => {
    const state = gameStateRef.current
    if (!state) return

    // Clear canvas (otimizado)
    ctx.clearRect(0, 0, width, height)
    // Fill com gradiente suave
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, 'rgba(255, 230, 245, 0.3)')
    gradient.addColorStop(1, 'rgba(230, 204, 255, 0.3)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Desenhar gato inimigo em cima
    const enemyImg = imageCacheRef.current.enemy[state.enemyCat.imageIndex]
    if (enemyImg && enemyImg.complete && enemyImg.width > 0) {
      ctx.drawImage(enemyImg, state.enemyCat.x, state.enemyCat.y, state.enemyCat.width, state.enemyCat.height)
    } else {
      // Fallback para emoji
      ctx.font = '50px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('🐱', state.enemyCat.x + state.enemyCat.width / 2, state.enemyCat.y + state.enemyCat.height / 2)
    }

    // Desenhar projéteis caindo (com opacidade reduzida para diluir borrão)
    ctx.font = '30px Arial'
    ctx.save()
    ctx.globalAlpha = 0.7 // Reduzir opacidade para diluir borrão
    state.projectiles.forEach(projectile => {
      ctx.fillText(projectile.type, projectile.x + projectile.width / 2, projectile.y + projectile.height / 2)
    })
    ctx.restore()

    // Desenhar player em baixo
    const playerImg = imageCacheRef.current.player[state.player.imageIndex]
    if (playerImg && playerImg.complete && playerImg.width > 0) {
      ctx.drawImage(playerImg, state.player.x, state.player.y, state.player.width, state.player.height)
    } else {
      // Fallback para emoji
      ctx.font = '50px Arial'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('🐱', state.player.x + state.player.width / 2, state.player.y + state.player.height / 2)
    }
  }

  const startGame = () => {
    setShowStartPopup(false)
    gameStartTimeRef.current = Date.now()
    livesRef.current = 3 // Garantir que livesRef está sincronizado
  }

  const resetGame = () => {
    setScore(0)
    setLives(3)
    livesRef.current = 3 // Reset ref também
    setGameOver(false)
    setIsPaused(false)
    setShowEndPopup(false)
    setShowStartPopup(true)
    gameStartTimeRef.current = Date.now()
    gameStateRef.current = {
      enemyCat: { 
        x: 0, 
        y: 0, 
        width: 60, 
        height: 60,
        direction: 1,
        speed: 1.5,
        lastHeartShot: 0,
        heartShotInterval: 2000,
        imageIndex: 0,
        cornerTime: 0,
        lastPositionX: 0,
        stuckTime: 0
      },
      player: { 
        x: 0, 
        y: 0, 
        width: 60, // 1.2x de 50
        height: 60, // 1.2x de 50
        imageIndex: 0,
        initialY: 0
      },
      projectiles: [],
      gameTime: 0,
      keys: {}
    }
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const containerWidth = rect.width
      const containerHeight = rect.height
      
      const dpr = window.devicePixelRatio || 1
      canvas.width = containerWidth * dpr
      canvas.height = containerHeight * dpr
      
      const ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)
      
      canvas.style.width = containerWidth + 'px'
      canvas.style.height = containerHeight + 'px'
      
      const musicPlayerHeight = window.innerWidth <= 480 ? 80 : 75
      gameStateRef.current.player.x = containerWidth - gameStateRef.current.player.width - 20
      // Usar posição Y inicial guardada (sobe ligeiramente - 10px a mais)
      gameStateRef.current.player.initialY = containerHeight - gameStateRef.current.player.height - musicPlayerHeight - 10
      gameStateRef.current.player.y = gameStateRef.current.player.initialY
      gameStateRef.current.enemyCat.x = (containerWidth - gameStateRef.current.enemyCat.width) / 2
      gameStateRef.current.enemyCat.y = 10
    }
  }

  const handlePlayAgain = () => {
    setShowEndPopup(false)
    resetGame()
  }

  // Selecionar imagem aleatória do EndGame
  const randomEndGameImage = endGameImages[Math.floor(Math.random() * endGameImages.length)]

  return (
    <div className="love-wars">
      <div className="wars-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="wars-info">
          <div className="score">Score: {score}</div>
          <div className="lives">Lives: {'❤️'.repeat(lives)}</div>
          <button 
            className="pause-button"
            onClick={() => setIsPaused(!isPaused)}
            disabled={showStartPopup || gameOver}
          >
            {isPaused ? '>' : '||'}
          </button>
        </div>
      </div>

      <div className="game-container">
        <canvas
          ref={canvasRef}
          className="game-canvas"
        />
        
        {/* Popup inicial */}
        {showStartPopup && (
          <div className="game-start-popup">
            <div className="start-popup-content">
              <h2>💕 Love Wars 💕</h2>
              <p className="start-instructions">
                Mexa com o dedo de um lado para o outro e colete meu amor, vamos ver quanto vou precisar para te ganhar
              </p>
              {getHighScore() > 0 && (
                <p className="high-score-text">
                  Última pontuação máxima: {getHighScore()} pontos
                </p>
              )}
              <button className="start-button" onClick={startGame}>
                Continue
              </button>
            </div>
          </div>
        )}
        
        {/* Popup de fim de jogo */}
        {showEndPopup && (
          <div className="game-end-popup">
            <div className="end-popup-content">
              <img 
                src={randomEndGameImage} 
                alt="Game Over" 
                className="endgame-image"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
              <h2>Game Over! 💔</h2>
              <p className="final-score">Pontuação: {score}</p>
              {getHighScore() > 0 && score < getHighScore() && (
                <p className="high-score-text">Recorde: {getHighScore()} pontos</p>
              )}
              {score >= getHighScore() && getHighScore() > 0 && (
                <p className="new-record">🎉 Novo Recorde! 🎉</p>
              )}
              <button className="play-again-button" onClick={handlePlayAgain}>
                Play Again
              </button>
            </div>
          </div>
        )}

        {isPaused && !gameOver && !showStartPopup && (
          <div className="game-paused" onClick={() => setIsPaused(false)}>
            <h2>Paused ||</h2>
            <p>Tap to resume</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default LoveWars
