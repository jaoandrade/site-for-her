# 🎯 Projéteis com Imagens no iPhone/iOS

## 📋 Visão Geral

No jogo Love Wars, os projéteis são renderizados de forma diferente dependendo da plataforma:
- **iPhone/iOS Safari**: Usa imagens PNG da pasta `projeteisiphone`
- **Android/Outros navegadores**: Usa emojis Unicode

## 🎨 Imagens Utilizadas

As seguintes imagens são usadas como projéteis no iPhone/iOS:

| Arquivo | Tamanho Original | Tamanho no Jogo |
|---------|------------------|-----------------|
| `projetil1.png` | ~2.0MB | 30x30px |
| `projetil2.png` | ~204KB | 30x30px |
| `projetil3.png` | ~1.8MB | 30x30px |
| `projetil4.png` | ~165KB | 30x30px |
| `projetil5.png` | ~287KB | 30x30px |
| `projetil6.png` | ~1.6MB | 30x30px |

**Localização**: `/public/resources/images/projeteisiphone/`

**Total**: 6 imagens diferentes que são selecionadas aleatoriamente para cada projétil.

## 🔧 Implementação Técnica

### Detecção de Plataforma

```javascript
// Detectar iOS/Safari para usar imagens ao invés de emojis
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
const useImageProjectiles = isIOS || isSafari
```

### Lista de Imagens

```javascript
const iphoneProjectileImages = [
  '/resources/images/projeteisiphone/projetil1.png',
  '/resources/images/projeteisiphone/projetil2.png',
  '/resources/images/projeteisiphone/projetil3.png',
  '/resources/images/projeteisiphone/projetil4.png',
  '/resources/images/projeteisiphone/projetil5.png',
  '/resources/images/projeteisiphone/projetil6.png'
]
```

### Carregamento de Imagens

As imagens são pré-carregadas quando o componente é montado:

```javascript
// Carregar imagens de projéteis para iPhone/iOS Safari (se necessário)
if (useImageProjectiles) {
  for (let i = 0; i < iphoneProjectileImages.length; i++) {
    const img = new Image()
    img.src = iphoneProjectileImages[i]
    await new Promise((resolve) => {
      img.onload = resolve
      img.onerror = resolve
    })
    imageCacheRef.current.projectiles[i] = img
  }
}
```

### Criação de Projéteis

Quando um projétil é criado no iPhone/iOS, um índice de imagem aleatório é atribuído:

```javascript
// Para iPhone/iOS: selecionar imagem aleatória dos projéteis
const projectileImageIndex = useImageProjectiles 
  ? Math.floor(Math.random() * iphoneProjectileImages.length)
  : null

state.projectiles.push({
  // ... outras propriedades
  imageIndex: projectileImageIndex // Índice da imagem para iPhone/iOS
})
```

### Renderização

No iPhone/iOS, as imagens são desenhadas usando `drawImage()`:

```javascript
if (useImageProjectiles && projectile.imageIndex !== null) {
  const projectileImg = imageCacheRef.current.projectiles[projectile.imageIndex]
  
  if (projectileImg && projectileImg.complete && projectileImg.width > 0) {
    // Desenhar imagem redimensionada para 30x30px
    ctx.drawImage(projectileImg, x, y, projectile.width, projectile.height)
  } else {
    // Fallback: círculo rosa se imagem não carregou
    ctx.fillStyle = '#ff69b4'
    ctx.beginPath()
    ctx.arc(centerX, centerY, projectile.width / 2, 0, Math.PI * 2)
    ctx.fill()
  }
}
```

## 📐 Tamanho e Escala

- **Tamanho no jogo**: 30x30 pixels
- **Redimensionamento**: Automático via `drawImage()` do Canvas API
- **Opacidade**: 0.7 (70%) para efeito visual suave
- **Posicionamento**: Centralizado na posição X/Y do projétil

## 🔄 Seleção Aleatória

Cada projétil criado recebe uma imagem aleatória das 6 disponíveis:
- `projetil1.png` até `projetil6.png`
- Seleção feita no momento da criação do projétil
- Distribuição uniforme (cada imagem tem mesma chance de ser selecionada)

## 🛡️ Fallback e Tratamento de Erros

### Se a imagem não carregar:
- Desenha um círculo rosa (`#ff69b4`) como fallback
- Garante que o jogo continue funcionando mesmo se houver erro

### Se `drawImage()` falhar:
- Captura o erro com `try/catch`
- Usa o mesmo fallback (círculo rosa)
- Loga aviso no console para debug

## 📱 Compatibilidade

### iPhone/iOS Safari:
- ✅ Usa imagens PNG
- ✅ Todas as 6 imagens são utilizadas
- ✅ Seleção aleatória por projétil
- ✅ Redimensionamento automático para 30x30px

### Android/Outros navegadores:
- ✅ Continua usando emojis Unicode
- ✅ Sem impacto na performance
- ✅ Sem necessidade de carregar imagens

## 🎮 Comportamento no Jogo

1. **Criação**: Quando o inimigo atira, um projétil é criado com um índice de imagem aleatório (0-5)
2. **Movimento**: O projétil cai verticalmente como normalmente
3. **Renderização**: A cada frame, a imagem correspondente é desenhada no canvas
4. **Colisão**: Funciona normalmente, independente de ser imagem ou emoji

## 📝 Arquivos Modificados

- `src/games/LoveWars.jsx`:
  - Detecção de iOS/Safari (linha ~29-33)
  - Lista de imagens de projéteis (linha ~36-43)
  - Cache de imagens de projéteis (linha ~117)
  - Carregamento de imagens (linha ~144-155)
  - Criação de projéteis com índice de imagem (linha ~472-474)
  - Renderização condicional (linha ~523-550)

## 🗂️ Estrutura de Arquivos

```
public/
  resources/
    images/
      projeteisiphone/
        projetil1.png  ← Imagem de projétil 1
        projetil2.png  ← Imagem de projétil 2
        projetil3.png  ← Imagem de projétil 3
        projetil4.png  ← Imagem de projétil 4
        projetil5.png  ← Imagem de projétil 5
        projetil6.png  ← Imagem de projétil 6
```

## ✅ Vantagens desta Solução

1. **Confiabilidade**: Imagens sempre renderizam corretamente no iOS
2. **Performance**: Imagens são pré-carregadas e cacheadas
3. **Variedade**: 6 imagens diferentes criam variedade visual
4. **Compatibilidade**: Não afeta outros navegadores
5. **Fallback robusto**: Sistema de fallback garante funcionamento mesmo com erros

## 🐛 Debug

Se os projéteis não aparecerem no iPhone:

1. **Verificar Console**: Procure por erros de carregamento de imagens
2. **Verificar caminhos**: Certifique-se que as imagens existem em `/public/resources/images/projeteisiphone/`
3. **Verificar cache**: As imagens devem estar em `imageCacheRef.current.projectiles`
4. **Verificar fallback**: Se aparecerem círculos rosa, as imagens não carregaram

## 📅 Data da Implementação

Implementado em: Janeiro 2025

## 🔗 Relacionado

- `BUGFIX_IPHONE_PROJETEIS.md` - Documentação sobre o problema original
- `src/games/LoveWars.jsx` - Código do jogo
