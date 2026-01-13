# 🤖 Documentação para IAs - Site For Her

## 📋 Visão Geral do Projeto

**Nome**: Site For Her / Site For Her - Romantic Nub Nub Cat Website  
**Tipo**: Aplicação Web Romântica Interativa  
**Stack**: React 18 + Vite 5  
**Objetivo**: Site romântico personalizado com tema "Nub Nub Cat", otimizado para mobile (iPhone), com interações, jogos e galeria de memórias.

---

## 🏗️ Arquitetura e Estrutura

### Estrutura de Navegação
```
LoveRequest (Página Inicial)
  ↓ [Clica "YES"]
HappyScreen (Tela de Aceitação)
  ↓ [Clica "Continue"]
Hub (Navegação Principal)
  ├─ Album (Galeria de Fotos/Vídeos)
  └─ LoveWars (Jogo Space Invaders)
```

### Estrutura de Pastas
```
SiteForHer/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Album.jsx/css    # Galeria de fotos/vídeos
│   │   └── MusicPlayer.jsx/css  # Player de música fixo
│   ├── pages/               # Páginas principais
│   │   ├── LoveRequest.jsx/css  # Página inicial (proposta)
│   │   ├── HappyScreen.jsx/css  # Tela após aceitar
│   │   └── Hub.jsx/css          # Menu navegação
│   ├── games/               # Jogos
│   │   └── LoveWars.jsx/css # Space Invaders temático
│   ├── firebase/            # Config Firebase (não usado atualmente)
│   ├── App.jsx              # Componente principal (roteamento)
│   ├── main.jsx             # Entry point React
│   └── index.css            # Estilos globais + variáveis CSS
├── public/
│   └── resources/
│       ├── images/
│       │   ├── nubnubcat/   # Imagens temáticas Nub Nub Cat
│       │   │   ├── Love/    # 18 imagens de amor
│       │   │   ├── Sad/     # 2 imagens tristes
│       │   │   └── Freak/   # 7 imagens (não usadas ainda)
│       │   └── album/       # 21 imagens JPEG (memórias)
│       ├── videos/
│       │   └── albuns (1).mp4  # 1 vídeo
│       └── sounds/          # Pasta vazia (músicas placeholder)
└── package.json
```

---

## 🎨 Sistema de Design

### Paleta de Cores (CSS Variables em `index.css`) - **INTENSIFICADA**
- **Rosa Principal**: `#ff99cc` (var(--color-pink)) - **MAIS INTENSO**
- **Rosa Claro**: `#ffd1e6` (var(--color-pink-light)) - **MAIS INTENSO**
- **Rosa Escuro**: `#ff80bf` (var(--color-pink-dark)) - **MAIS INTENSO**
- **Roxo**: `#cc99ff` (var(--color-purple)) - **MAIS INTENSO**
- **Roxo Claro**: `#e6ccff` (var(--color-purple-light)) - **MAIS INTENSO**
- **Azul**: `#99ccff` (var(--color-blue)) - **MAIS INTENSO**
- **Azul Claro**: `#cce6ff` (var(--color-blue-light)) - **MAIS INTENSO**
- **Pêssego**: `#ffd9b3` (var(--color-peach))
- **Texto**: `#4a4a4a` (var(--color-text))

### Estilo Visual - **ATUALIZADO**
- **Glassmorphism**: Backdrop-filter blur, transparências
- **Gradientes**: Linear gradients com tons pastel rosa/roxo/azul **MAIS INTENSOS**
  - Gradientes animados com `gradientShift` animation em títulos principais
  - Background do body com gradiente fixo e radial gradients sobrepostos
- **Sombras**: Múltiplas camadas de sombras **MAIS INTENSAS** (--shadow-soft, --shadow-medium, --shadow-strong)
  - Opacidade aumentada de 0.3-0.5 para 0.4-0.6
- **Bordas**: Border-radius alto (20-50px) para elementos arredondados
- **Background Global**: Gradiente fixo com radial gradients rosa/azul dispersos mais fortes

### Animações Principais
- `float`: Flutuação vertical (3s infinite)
- `bounce`: Salto vertical (2s infinite)
- `pulse`: Pulsação de escala (2s infinite)
- `fadeIn`: Aparição com translateY (0.6s)
- `slideIn`: Deslizamento lateral (0.6s)
- `emojiRain`: Chuva de emojis caindo e girando
- `heartBeat`: Batimento cardíaco (1.5s infinite)
- `gradientShift`: **NOVO** - Animação de gradiente em títulos (3s infinite, background-position)

---

## 📄 Páginas e Componentes Detalhados

### 1. LoveRequest (`src/pages/LoveRequest.jsx`)

**Propósito**: Página inicial interativa de proposta romântica

**Elementos Principais**:
- **Imagem Nub Nub Cat Principal**: Selecionada aleatoriamente de 8 imagens específicas:
  - `LoveBeinglilFreakytogether.png`
  - `nub-cat-nub.gif`
  - `shebitingmycheeck.png`
  - `SheIsMyLilBoba.png`
  - `UsAlsoTogetherAfterMissingEachOther.png`
  - `UsAndABigHeart.png`
  - `uswetkissing.png`
  - `wannaspendmywholelifewithu.png`
- **Tamanho da Imagem**: 240px x 240px (2x do tamanho original de 120px) - **ATUALIZADO**
- **Texto Principal**: "I love you" (gradiente animado)
- **Pergunta**: "You love me too?"
- **Botão YES**: Aceita e vai para HappyScreen (não centralizado - permanece no mesmo sítio)
- **Botão NO**: Foge ao clicar (sistema de teleporte)
  - Após 1 clique: Fixa posição e teleporta aleatoriamente
  - Texto muda a cada clique (10 variações)
  - Após 10 cliques: Desaparece, mostra gato triste
- **Emoji Rain**: Emojis caindo continuamente (❤️, 💕, 😘, ✨, 💖, 💗, 💝, 🥰, 😍, 💋)
- **Gato Triste**: Aparece após 10 recusas (imagens da pasta Sad/)

**Estados**:
- `noButtonAttempts`: Contador de cliques no "NO" (0-10)
- `noButtonVisible`: Visibilidade do botão "NO"
- `noButtonPosition`: Posição fixa após primeiro clique
- `sadCatVisible`: Visibilidade do gato triste
- `currentCatImage`: Imagem atual do gato (aleatória)

**Funcionalidades**:
- Teleporte inteligente do botão "NO" (evita sobrepor botão YES)
- Responsive com ajuste de posição em resize/orientationchange
- Touch events para mobile
- Fallback para emoji se imagem não carregar

---

### 2. HappyScreen (`src/pages/HappyScreen.jsx`)

**Propósito**: Tela romântica após aceitar a proposta

**Elementos Principais**:
- **3 Gatos Felizes**: Selecionados aleatoriamente da pasta Love/ (exceto as 8 usadas em LoveRequest e mewhenIthinkOfHer removido) - **ATUALIZADO: 1.6x maiores (160px)**
  - Tamanho: 160px x 160px (anteriormente 100px) - **NOVO**
  - Emoji fallback: 112px (anteriormente 70px) - **NOVO**
  - Inclui: `ustogetherhappy.png`, `ushugging.png`, `shehuggingme.png`, `sheRefilsMeWithLove.png`, `Ilovehereyes.png`, `HerMakeMyDihBlush.png`, `MeTeasingHer.png`, `samefreakquency.png`, `sticker_27.webp`, `sticker_28.webp`
  - **TOTAL: Todas as 18 imagens Love estão sendo usadas** (8 LoveRequest + 10 HappyScreen lista + 1 central)
- **Mensagem Romântica**: Texto editável em `romanticMessage` variable
- **Imagem Central**: `fuckingmissyou.png` posicionada entre a mensagem e "I love you my sweetie 💕"
- **3 Imagens Destacadas**: Selecionadas aleatoriamente do álbum (`albuns (1).jpeg` até `(21).jpeg`)
- **Título**: "I love you my sweetie 💕"
- **Botão Continue**: Aparece após 6 segundos, vai para Hub
- **Emoji Rain**: Mais intensa que LoveRequest (intervalo menor, mais emojis)

**Timeline de Aparição**:
- T0s: Página carrega, emojis começam a cair, 3 gatos aparecem, mensagem aparece
- T3s: Seção de imagens destacadas aparece
- T6s: Botão "Continue" aparece

**Estados**:
- `showImages`: Controla aparição das imagens destacadas
- `showContinue`: Controla aparição do botão
- `currentCatImages`: Array de 3 gatos selecionados
- `currentFeaturedImages`: Array de 3 imagens do álbum selecionadas

---

### 3. Hub (`src/pages/Hub.jsx`)

**Propósito**: Menu de navegação principal com opções do site

**Elementos Principais**:
- **Título**: "💕 Our Special Place 💕"
- **3 Botões de Navegação**:
  1. **📸 Album**: Vai para componente Album
  2. **🚀 Love Wars**: Vai para jogo LoveWars
  3. **🛠️ WIP**: Desabilitado ("Coming Soon")
- **Imagens NubCats Decorativas**: Espalhadas pelo Hub (decorativas, não clicáveis) - **NOVO**
  - 6 imagens da pasta Love/ espalhadas em posições fixas
  - Utiliza: `ustogetherhappy.png`, `ushugging.png`, `shehuggingme.png`, `sheRefilsMeWithLove.png`, `Ilovehereyes.png`, `HerMakeMyDihBlush.png`, `MeTeasingHer.png`, `samefreakquency.png`
  - Posicionadas absolutamente com float animation
  - Tamanho: 80px x 80px (60px em mobile)
  - Opacidade: 0.7 (1.0 no hover)
  - Escondidas em mobile (< 768px) para não atrapalhar
- **Footer**: "Made with ❤️ for you"

**Estados**:
- `activeView`: Controla qual componente mostrar (null, 'album', 'love-wars')

**Nota**: Hub atua como router simples usando conditional rendering

---

### 4. Album (`src/components/Album.jsx`)

**Propósito**: Galeria de fotos e vídeos organizada tematicamente (memórias) com integração Supabase para upload de novas fotos

**Funcionalidades**:
- Carrega e organiza TODAS as imagens e vídeos do álbum em ordem específica
- Organização temática: Fotos Juntos → Me With Her (+ Trogir) → Hvar → Cuddling → Her → SillyFaces → Minions → Instagram Desenho → OnPlane
- Grid organizado em fileiras de 4 itens
- Separadores decorativos entre fileiras (emojis + gradientes)
- Modal fullscreen ao clicar (suporta imagem e vídeo)
- Textos fofos personalizados para CADA imagem/vídeo
- NubCats decorativos estrategicamente espalhados
- Botão "← Back" para voltar ao Hub
- **NOVO**: Integração Supabase para upload de fotos customizadas
  - Um gato no final do álbum (clicável) permite adicionar novas fotos
  - Ao clicar no gato, abre modal para selecionar imagem e adicionar texto
  - Imagem é enviada para Supabase Storage (bucket `album-images`)
  - Dados são salvos na tabela `album_custom_images`
  - Após upload, o gato move-se automaticamente para o final (novas fotos aparecem antes dele)

**Ordem Específica de Exibição**:
1. **Fotos Juntos** (8 imagens)
2. **Me With Her** (6 imagens + 2 vídeos) + **Trogir** (1 imagem + 1 vídeo) - Trogir junto
3. **Hvar Completo**: Vídeos primeiro (`Hvar Video.mp4`, `Caminho HVar.mp4`), depois fotos Hvar (5), depois Caminho Hvar (6 fotos)
4. **Cuddling** (9 imagens)
5. **Her** (10 imagens)
6. **SillyFaces** (4 imagens) - depois de Her, antes de Minions
7. **Minions** (2 imagens)
8. **Desenho Instagram** (1 imagem)
9. **OnPlane** (5 imagens)

**Total**: ~70+ itens (imagens + vídeos)

**Estrutura de Dados**:
```javascript
{
  id: number,
  url: string,
  type: 'image' | 'video',
  comment: string // Texto fofo personalizado
}
```

**Função Principal**: `organizeAlbumMedia()` - Organiza todas as mídias na ordem específica com textos personalizados

**Integração Supabase**:
- **Tabela**: `album_custom_images` (id, image_url, text, created_at, updated_at)
- **Storage Bucket**: `album-images` (público)
- **Cliente**: `src/supabase/client.js` (usa variáveis de ambiente VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY)
- **Variáveis de Ambiente**: 
  - `VITE_SUPABASE_URL=https://vizlfacxrfgqfpxkitum.supabase.co`
  - `VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpemxmYWN4cmZncWZweGtpdHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyOTg2NjAsImV4cCI6MjA4Mzg3NDY2MH0.PDuQk81KTeAkhxfnizt9GTzEhqpsiTNjfn_8LswEHlQ`

**Nota**: Usa arquivos locais para fotos originais + Supabase para fotos customizadas adicionadas pelo usuário. Nomenclatura de arquivos locais deve corresponder exatamente aos nomes na pasta.

---

### 5. LoveWars (`src/games/LoveWars.jsx`) - **ATUALIZADO COM TODAS AS FUNCIONALIDADES**

**Propósito**: Jogo de pegar corações - novo conceito completamente diferente

**Mecânica Nova**:
- **Gato Inimigo em Cima**: 🐱 (Nub Nub Cat) que se move da esquerda para direita e atira corações
- **Player em Baixo**: 🐱 (Nub Nub Cat) que se move da direita para esquerda para pegar corações
- **Corações**: ❤️ que caem do gato inimigo
- **Objetivo**: Player deve pegar os corações que caem
- **Sistema de Vidas**: 3 vidas - perde uma vida quando um coração passa sem ser pego
- **Game Over**: Quando perder 3 corações (3 vidas)
- **Score**: +1 ponto por coração pego (pontos vão de um em um)

**Dificuldade Progressiva** (MAIS RÁPIDA):
- **Tempo de Jogo**: Dificuldade aumenta mais rapidamente
- **Velocidade do Gato**: Aumenta progressivamente (começa em 1.5, aumenta até 4.5x após 30 segundos - mais rápido)
- **Frequência de Tiros**: Começa atirando a cada 2 segundos, reduz até 0.6 segundos após 60 segundos (mais rápido)
- **Velocidade dos Corações**: Aumenta gradualmente com o tempo de jogo (mais rápido - a cada 30 segundos)
- **Inteligência do Gato**: Move-se da esquerda para direita com mudança de direção nas bordas

**Sistema de Imagens**:
- **Player**: Imagens variam baseadas nos pontos (a cada 10 pontos muda de imagem)
  - Imagens em: `/resources/images/nubnubcat/Game/Player/`
  - 2 imagens disponíveis: `player.png`, `player (2).png`
- **Enemy**: Imagens variam baseadas no tempo (a cada 10 segundos muda de imagem)
  - Imagens em: `/resources/images/nubnubcat/Game/Enemy/`
  - 3 imagens disponíveis: `enemy.png`, `enemy.gif`, `enemy.webp`
- **EndGame**: Imagem aleatória aparece no popup de fim de jogo
  - Imagens em: `/resources/images/nubnubcat/Game/EndGame/`
  - 7 imagens disponíveis: `endgame.png`, `endgame (1).jpg`, `endgame (1).gif`, `endgame (1).webp`, `endgame (2).jpg`, `endgame (2).gif`, `endgame (3).jpg`

**Popup Inicial**:
- Aparece antes do jogo começar
- Mostra instruções: "Mexa com o dedo de um lado para o outro e colete meu amor, vamos ver quanto vou precisar para te ganhar"
- Mostra última pontuação máxima (se houver)
- Botão "Continue" para começar o jogo

**Popup de Fim de Jogo**:
- Aparece quando o jogador morre (perde todas as vidas)
- Mostra pontuação final
- Mostra imagem aleatória do EndGame
- Mostra recorde (se não for novo recorde)
- Mostra "🎉 Novo Recorde! 🎉" se for novo recorde
- Botão "Play Again" para reiniciar

**Sistema de Pontuação Máxima (localStorage)**:
- Salva automaticamente a pontuação máxima no localStorage
- Chave: `loveWarsHighScore`
- Atualiza apenas se a nova pontuação for maior que a anterior

**Controles**:
- Desktop: Setas ou A/D para mover player
- Mobile: Touch para mover player (deslizar dedo de um lado para o outro)
- Player se move horizontalmente na parte inferior da tela

**Estados**:
- `score`: Pontuação atual (+1 por coração pego)
- `lives`: Vidas restantes (3 vidas, mostra como ❤️❤️❤️)
- `gameOver`: Flag de fim de jogo (quando vidas = 0)
- `isPaused`: Flag de pausa
- `showStartPopup`: Mostra popup inicial (inicia como true)
- `showEndPopup`: Mostra popup de fim de jogo
- `gameStateRef`: Ref com estado do jogo (enemyCat, player, hearts, gameTime, keys)
- `gameStartTimeRef`: Tempo de início do jogo para calcular dificuldade progressiva
- `canvasSizeRef`: Guarda tamanho do canvas para evitar redimensionamentos durante o jogo (corrige bug de resolução)

**Correção de Bug**:
- **Bug corrigido**: Quando se leva dano, a resolução não muda mais - o canvas mantém seu tamanho durante o jogo
- Usa `canvasSizeRef` para guardar tamanho do canvas e evitar redimensionamentos durante o jogo ativo

**UI**:
- Score display no topo
- Lives display (mostra corações ❤️)
- Botão pause/resume
- Popup inicial com instruções e pontuação máxima
- Popup de fim de jogo com imagem aleatória do EndGame, pontuação e botão "Play Again"
- Tela de Pause

---

### 6. MusicPlayer (`src/components/MusicPlayer.jsx`)

**Propósito**: Player de música fixo no canto inferior direito

**Funcionalidades**:
- Player colapsado/expandido
- Play/Pause (auto-play tentado, requer interação)
- Previous/Next track (sistema inteligente de não repetição)
- Barra de progresso clicável
- Display de tempo atual/total
- Nome da música e artista formatados

**Playlist Completa (21 Músicas)**:
- Todas as músicas estão em `/resources/sounds/musica/`
- Lista completa: Arctic Monkeys, Charlie Puth, Elvis Presley, girl in red, Laufey, Lord Huron, Michael Bublé, Mitski, New West, Pixote, Ruth B., Stephen Sanchez, The Neighbourhood, The Police, Vance Joy, Yung Kai, Elliot James Reay, Chris Grey, Gigi Perez
- Cada música tem nome e artista formatados corretamente

**Sistema de Não Repetição**:
- **Inicialização**: Escolhe uma música aleatória das 21 para começar
- **Playlist Embaralhada**: Cria uma ordem aleatória única no início
- **Rastreamento**: Mantém lista de índices de músicas já tocadas (`playedSongs`)
- **Próxima Música**: Sempre escolhe próxima música não tocada na sequência embaralhada
- **Reset Automático**: Quando todas as 21 músicas foram tocadas:
  - Cria novo shuffle aleatório
  - Reseta lista de tocadas
  - Recomeça o ciclo infinitamente

**Estados e Refs**:
- `currentSong`: Música atual sendo reproduzida (objeto {name, artist, url})
- `playedSongs`: Array de índices já tocados
- `shuffledPlaylistRef`: Ref persistente com playlist embaralhada atual
- `isPlaying`: Estado de play/pause
- `progress`: Progresso atual da música (0-100)
- `duration`: Duração total da música
- `showPlayer`: Controla expansão do player

**Funções Principais**:
- `getNextUntrackedSong()`: Encontra próxima música não tocada (ou faz novo shuffle se todas foram tocadas)
- `handleEnded()`: Chamado quando música termina, toca próxima não tocada
- `nextTrack()`: Pula para próxima música não tocada (marca atual como tocada)
- `prevTrack()`: Volta para música anterior na playlist embaralhada
- `togglePlay()`: Alterna play/pause

**Props**:
- `canPlay`: Boolean que controla se pode tocar (requer interação do usuário para auto-play)

---

## 🖼️ Gestão de Imagens

### Imagens Nub Nub Cat - Pasta Love/ (18 arquivos)

**Usadas em LoveRequest (8 imagens principais - seleção aleatória)**:
1. `LoveBeinglilFreakytogether.png`
2. `nub-cat-nub.gif`
3. `shebitingmycheeck.png`
4. `SheIsMyLilBoba.png`
5. `UsAlsoTogetherAfterMissingEachOther.png`
6. `UsAndABigHeart.png`
7. `uswetkissing.png`
8. `wannaspendmywholelifewithu.png`

**Usadas em HappyScreen (3 imagens no topo - seleção aleatória)**:
- **Tamanho: 160px x 160px (1.6x maiores)** - **ATUALIZADO**
- Selecionadas aleatoriamente de 10 imagens disponíveis (exceto as 8 de LoveRequest e mewhenIthinkOfHer)
- Inclui: `ustogetherhappy.png`, `ushugging.png`, `shehuggingme.png`, `sheRefilsMeWithLove.png`, `Ilovehereyes.png`, `HerMakeMyDihBlush.png`, `MeTeasingHer.png`, `samefreakquency.png`, `sticker_27.webp`, `sticker_28.webp`

**Usadas em HappyScreen (1 imagem central)**:
- `fuckingmissyou.png` - Posicionada entre mensagem e "I love you my sweetie"
- Tamanho responsivo (max-width 400px, 300px em mobile)

**Usadas no Hub (decorativas - 6 imagens)**:
- Reutiliza algumas das imagens Love/ como decoração espalhada
- Tamanho: 80px x 80px (60px em mobile)
- Animações float para efeito visual
- Opacidade 0.7 (1.0 no hover)

**Resumo Total (18 imagens)**:
- LoveRequest: 8 imagens
- HappyScreen (topo): 10 imagens disponíveis, 3 selecionadas aleatoriamente
- HappyScreen (central): 1 imagem (`fuckingmissyou.png`)
- Hub: 6 imagens decorativas (reutiliza algumas)
- **TODAS AS 18 IMAGENS DA PASTA LOVE ESTÃO SENDO USADAS** ✅

**Imagens não usadas ainda**:
- `sticker_27.webp`, `sticker_28.webp` (podem ser usadas futuramente)

### Imagens Nub Nub Cat - Pasta Sad/ (2 arquivos)
- `Sad (1).webp`
- `Sad (2).webp`
- **Uso**: Aparecem em LoveRequest após 10 cliques no botão "NO"

### Imagens Nub Nub Cat - Pasta Freak/ (7 arquivos)
- `HerOnTopOfMe.png`, `lickher.png`, `lickOnBath.png`, `MeLickingHerP#ssy.png`, `MeThinkingUSHardCUddling.png`, `UsdoingUnholyThingsPART1.png`, `UsdoingUnholyThingsPART2.png`
- **Status**: Não usadas atualmente, podem ser implementadas futuramente

### Imagens do Álbum (Organizadas Tematicamente) - **REORGANIZADAS**

**Organização por Categoria**:
- **Fotos Juntos**: 8 imagens (`Fotos Juntos.jpeg` até `Fotos Juntos (8).jpeg`)
- **Me With Her**: 6 imagens (`MeWithHer.jpeg` até `MeWithHer (6).jpeg`)
- **Hvar**: 5 fotos (`Hvar.jpeg` até `Hvar (5).jpeg`)
- **Caminho Hvar**: 6 fotos (`Caminho Hvar.jpeg` até `Caminho Hvar (5).jpeg`)
- **Cuddling**: 9 imagens (`Cuddling.jpeg` até `Cuddling (9).jpeg`)
- **Her**: 10 imagens (`Her.jpeg` até `Her (9).jpeg`)
- **SillyFaces**: 4 imagens (`SillyFaces (1).jpeg` até `SillyFaces (4).jpeg`)
- **Minions**: 2 imagens (`Minions.jpeg`, `Minions (2).jpeg`)
- **Desenho Instagram**: 1 imagem (`Instagram Desenho.jpeg`)
- **OnPlane**: 5 imagens (`OnPlane.jpeg` até `OnPlane (5).jpeg`)
- **Trogir**: 1 imagem (`Trogir.jpeg`)

**Total**: ~57 imagens JPEG organizadas em ordem específica

**Uso**: 
  - Album component (todas organizadas tematicamente)
  - HappyScreen featured section (3 selecionadas aleatoriamente do álbum completo)

### Vídeos do Álbum (5 arquivos) - **ATUALIZADO**
- **Me With Her**: `MeWithHer.mp4`, `MeWithHer2.mp4`
- **Hvar**: `Hvar Video.mp4`, `Caminho HVar.mp4`
- **Trogir**: `Trogir.mp4`

**Uso**: 
  - Album component (integrados nas seções corretas junto com fotos relacionadas)
  - Modal fullscreen com controles de vídeo
  - Ícone de play overlay no grid

### Músicas (21 arquivos MP3) - **ORDEM ESPECÍFICA** - **ATUALIZADO**
- **Localização**: `/resources/sounds/musica/`
- **Arquivos**: 21 músicas românticas com nomes e artistas completos
- **Uso**: MusicPlayer component
- **Sistema de Reprodução**: - **ATUALIZADO**
  - **SEMPRE começa com**: "I Wanna Be Yours" (Arctic Monkeys)
  - **Depois**: Outras 20 músicas embaralhadas aleatoriamente SEM REPETIR
  - **Quando completa todas**: Volta para "I Wanna Be Yours" e reembaralha as outras 20
  - **Ciclo infinito**: I Wanna Be Yours → 20 aleatórias → I Wanna Be Yours → 20 novas aleatórias → ...

---

## 🎯 Fluxo de Dados e Estados

### App.jsx (Componente Principal)
```javascript
currentPage: 'love-request' | 'happy' | 'hub'
userInteracted: boolean (para permitir auto-play de música)
```

### Navegação
- LoveRequest → `onAccept()` → HappyScreen
- HappyScreen → `onContinue()` → Hub
- Hub → `setActiveView('album')` → Album
- Hub → `setActiveView('love-wars')` → LoveWars
- Album/LoveWars → `onBack()` → Hub

---

## 🔧 Configurações e Customização

### Personalização Fácil

**Mensagem Romântica** (`HappyScreen.jsx`):
```javascript
const romanticMessage = `Sua mensagem aqui...`
```

**Cores** (`index.css`):
```css
:root {
  --color-pink: #ffb3d9;
  --color-purple: #d9b3ff;
  --color-blue: #b3d9ff;
  /* ... */
}
```

**Playlist** (`MusicPlayer.jsx`):
```javascript
const playlist = [
  { name: "Nome", artist: "Artista", url: "/resources/sounds/song1.mp3" }
]
```

**Imagens do Álbum** (`Album.jsx`):
- Loop automático de 1 até 21: `albuns (${i}).jpeg`
- Vídeo hardcoded: `albuns (1).mp4`

---

## 🐛 Tratamento de Erros

- **Imagens não carregam**: Fallback para emoji (🐱, 😢, etc.)
- **Música não carrega**: Player ainda funciona, apenas não toca
- **Resize/Orientation**: Botão "NO" ajusta posição automaticamente
- **Touch events**: Prevenção de scroll padrão em canvas do jogo

---

## 📱 Responsividade

### Breakpoints
- `480px`: Mobile padrão
- `360px`: Mobile pequeno
- `390px`: iPhone 13 específico

### Otimizações Mobile
- Touch-friendly (botões grandes, áreas de toque amplas)
- Viewport meta tag configurada (no-scale)
- Touch events em todos os elementos interativos
- CSS mobile-first (min-width media queries)

---

## 🚀 Scripts Disponíveis

```bash
npm install      # Instalar dependências
npm run dev      # Servidor desenvolvimento (localhost:3000)
npm run build    # Build produção
npm run preview  # Preview build produção
```

---

## 📝 Notas Importantes para IAs

1. **Supabase**: **IMPLEMENTADO** - Album usa arquivos locais para fotos originais + Supabase para fotos customizadas adicionadas pelo usuário. Configuração em `src/supabase/client.js` com variáveis de ambiente. Tabela `album_custom_images` e Storage bucket `album-images` configurados.

2. **Imagens**: Sempre verificar se arquivo existe antes de referenciar. Usar fallback de emoji.

3. **Músicas**: Playlist está configurada mas pasta `/sounds/` está vazia. Player funciona mas não toca sem arquivos.

4. **Estado**: React hooks (useState, useEffect, useRef) são usados extensivamente.

5. **Animações**: CSS animations e requestAnimationFrame (no jogo) para performance.

6. **Tema**: Tons rosa e azul pastel são os dominantes, com gradientes suaves.

7. **Nub Nub Cat**: Tema central do site. Imagens organizadas em pastas temáticas (Love, Sad, Freak).

---

## 🎨 Estilo de Código

- **Componentes**: Functional components com React hooks
- **CSS**: Modules separados por componente + CSS variables globais
- **Naming**: camelCase para variáveis, kebab-case para classes CSS
- **Comentários**: Código bem comentado, especialmente lógicas complexas
- **Error Handling**: Try-catch e fallbacks onde necessário

---

---

## 🔄 Mudanças Recentes (Última Atualização)

### Visual e Design
1. **Imagem Principal Aumentada**: Imagem Nub Nub Cat em LoveRequest agora é **312px x 312px (1.3x - ATUALIZADO)** - **ATUALIZADO**
   - Emoji fallback: 260px
2. **Gatos HappyScreen Aumentados**: Gatos no topo do HappyScreen agora são **192px x 192px (1.2x - ATUALIZADO)** - **ATUALIZADO**
   - Emoji fallback: 134px
   - Mobile: 154px (mantém proporção)
3. **Tons Rosa e Azul Intensificados**: Paleta de cores atualizada para tons mais fortes e vibrantes
   - Rosa: `#ff99cc` (anteriormente `#ffb3d9`)
   - Azul: `#99ccff` (anteriormente `#b3d9ff`)
   - Roxo: `#cc99ff` (anteriormente `#d9b3ff`)
4. **Gradientes Animados**: Títulos principais agora têm gradientes animados (gradientShift animation)
5. **Background Global**: Body agora tem gradiente fixo com radial gradients rosa/azul dispersos mais intensos

### Imagens Nub Nub Cat - **DISTRIBUIÇÃO COMPLETA**
1. **LoveRequest**: Usa 8 imagens específicas (removido mewhenIthinkOfHer)
   - Gato principal: **312px x 312px (1.3x)**
2. **HappyScreen**: 
   - Gatos no topo: 3 selecionados aleatoriamente de 10 imagens disponíveis (**192px x 192px - 1.2x**)
   - Imagem central `fuckingmissyou.png` entre mensagem e "I love you sweetie"
   - **TOTAL: Todas as 18 imagens da pasta Love estão sendo usadas** - **CONFIRMADO**
3. **Hub**: 6 imagens NubCats decorativas espalhadas pelo hub (80px, opacidade 0.7)
4. **Album**: - **NOVO**
   - Gatos decorativos entre linhas (80px, opacidade 0.6, em linhas específicas)
   - Gatos decorativos no grid quando há espaço (80px, opacidade 0.7)
   - 6 imagens diferentes usadas estrategicamente
5. **LoveWars**: - **NOVO**
   - 3 gatos decorativos flutuantes no background (100px, opacidade 0.15)
   - Posicionados estrategicamente para não atrapalhar o jogo
   - Escondidos em mobile (< 768px)

### Sistema de Música (MusicPlayer) - **ALEATÓRIO COMPLETO** - **ATUALIZADO**

#### **Ordem de Reprodução**:
1. **Início Aleatório**: Site começa com uma música **completamente aleatória** de todas as 21 músicas - **ATUALIZADO**
   - Todas as 21 músicas são embaralhadas aleatoriamente no início
   - A primeira música pode ser qualquer uma das 21
   - Não há música fixa inicial

2. **Aleatório Sem Repetir**: - **ATUALIZADO**
   - Todas as 21 músicas são embaralhadas aleatoriamente
   - Cada música é tocada apenas uma vez até todas as 21 serem reproduzidas
   - Rastreamento de músicas já tocadas via estado `playedSongs`
   - Ordem completamente aleatória desde o início

3. **Ciclo Infinito**: - **ATUALIZADO**
   - Quando todas as 21 músicas foram tocadas, reembaralha todas as 21 músicas novamente
   - Nova ordem aleatória completa
   - Reseta `playedSongs` e recomeça o ciclo
   - Processo se repete infinitamente com ordem sempre aleatória

4. **Auto-Play e Auto-Advance**: - **NOVO**
   - Música toca automaticamente quando o site inicia
   - Quando uma música termina, avança automaticamente para a próxima música não tocada
   - Auto-play funciona desde o início (canPlay = true por padrão)

#### **Playlist Completa (21 Músicas)**:
- **Localização**: `/resources/sounds/musica/`
- **Músicas**: Todas as 21 músicas embaralhadas completamente aleatoriamente
- Nomes e artistas formatados corretamente

#### **Lógica de Reprodução**: - **ATUALIZADA**
- `useEffect` inicial: Embaralha todas as 21 músicas aleatoriamente e escolhe a primeira
- `getNextUntrackedSong()`: Encontra próxima música não tocada (ou reembaralha se completou todas)
  - Se completou todas: Reembaralha todas as 21 músicas, reseta `playedSongs`
- `handleEnded()`: Quando música termina, toca próxima não tocada automaticamente
- `nextTrack()`: Pula para próxima música não tocada manualmente
- `shuffledPlaylistRef`: Ref persistente com todas as 21 músicas embaralhadas aleatoriamente

#### **Controles Funcionais**: - **MANTIDO**
   - **Pause/Play**: Funciona perfeitamente (toggle de isPlaying)
   - **Next Track**: Pula para próxima música não tocada (ou reembaralha se completou)
   - **Previous Track**: Volta para música anterior na playlist embaralhada
   - Barra de progresso clicável funcional
   - **Auto-Play**: Toca automaticamente ao iniciar e quando muda de música
   - **Auto-Advance**: Avança automaticamente quando música termina

### Album Component - **REORGANIZAÇÃO COMPLETA** - **ATUALIZADO**

#### **Ordem Específica de Exibição** (Nova Organização):
1. **Fotos Juntos** (8 imagens)
   - `Fotos Juntos.jpeg` até `Fotos Juntos (8).jpeg`
   - Textos fofos: "Our first memory together 💕", "Perfect moments captured forever 💖", etc.

2. **Me With Her** (6 imagens + 2 vídeos) + **Trogir** (1 imagem + 1 vídeo)
   - Me With Her: `MeWithHer.jpeg` até `MeWithHer (6).jpeg`
   - Vídeos: `MeWithHer.mp4`, `MeWithHer2.mp4`
   - **Trogir junto**: `Trogir.jpeg` + `Trogir.mp4`
   - Textos: "Making memories with you 💕", "A special moment together 🎬💕", etc.

3. **Tudo de Hvar** (vídeos primeiro, depois fotos)
   - Vídeos: `Hvar Video.mp4`, `Caminho HVar.mp4`
   - Fotos Hvar: `Hvar.jpeg` até `Hvar (5).jpeg` (5 fotos)
   - Caminho Hvar fotos: `Caminho Hvar.jpeg` até `Caminho Hvar (5).jpeg` (6 fotos)
   - Textos: "Amazing moments in Hvar 🏖️💕", "Paradise found in Hvar 🌊", etc.

4. **Cuddling** (9 imagens)
   - `Cuddling.jpeg` até `Cuddling (9).jpeg`
   - Textos: "Snuggles and cuddles 💕", "Warmth and comfort 🥰", etc.

5. **Her** (10 imagens)
   - `Her.jpeg` até `Her (9).jpeg`
   - Textos: "Beautiful you 💕", "My favorite view 🌹", etc.

6. **SillyFaces** (4 imagens) - **Depois de Her, antes de Minions**
   - `SillyFaces (1).jpeg` até `SillyFaces (4).jpeg`
   - Textos: "Silly moments together 😂", "Making each other laugh 😆", etc.

7. **Minions** (2 imagens)
   - `Minions.jpeg`, `Minions (2).jpeg`
   - Textos: "Minion adventures 🟡", "Cute minion moments 💛"

8. **Desenho Instagram** (1 imagem)
   - `Instagram Desenho.jpeg`
   - Texto: "Creative artwork together 🎨✨"

9. **OnPlane** (5 imagens)
   - `OnPlane.jpeg` até `OnPlane (5).jpeg`
   - Textos: "Flying together ✈️", "Adventures in the sky 🌤️", etc.

#### **Características da Organização**:
- **Total**: ~70+ itens (imagens + vídeos) organizados em ordem específica
- **Separadores entre fileiras**: Linhas decorativas com emojis (💕, ✨, 💖)
- **Textos fofos personalizados**: Cada imagem/vídeo tem comentário único e fofo
- **Layout em fileiras**: 4 itens por linha, organizados sequencialmente
- **Vídeos integrados**: Vídeos aparecem nas seções corretas junto com fotos relacionadas

#### **NubCats Decorativos no Album**: - **MANTIDO**
   - Gatos decorativos entre linhas (em linhas específicas - 2, 4, 6, etc)
   - Gatos decorativos no grid quando há espaço vazio
   - 6 imagens diferentes usadas estrategicamente
   - Opacidade reduzida (0.6-0.7) para não competir com conteúdo
   - Animações float para efeito visual suave

#### **Layout Responsivo**: - **MANTIDO**
   - Desktop: 4 colunas por linha
   - Tablet (≤768px): 3 colunas
   - Mobile (≤480px): 2 colunas
   - Mobile pequeno (≤360px): 2 colunas com espaçamento reduzido

### NubCats em Todo o Site - **DISTRIBUIÇÃO ESTRATÉGICA**
- **LoveRequest**: 1 gato principal grande (312px)
- **HappyScreen**: 3 gatos topo (192px) + 1 central = 4 imagens
- **Hub**: 6 gatos decorativos espalhados (80px, opacidade 0.7)
- **Album**: Gatos entre linhas e no grid (80px, opacidade 0.6-0.7)
- **LoveWars**: 3 gatos flutuantes background (100px, opacidade 0.15)
- **Total**: NubCats aparecem em todas as páginas sem repetição excessiva, cada um com tamanho e opacidade apropriados para seu contexto

### NubCats em Todo o Site - **NOVO**
- **LoveRequest**: Gato principal grande (312px) - 1 imagem
- **HappyScreen**: 3 gatos no topo (192px) + 1 central (fuckingmissyou) - 4 imagens
- **Hub**: 6 gatos decorativos espalhados (80px) - 6 imagens
- **Album**: Gatos entre linhas e no grid (80px) - 6 imagens diferentes
- **LoveWars**: 3 gatos decorativos flutuantes no background (100px, opacidade 0.15) - 3 imagens
- **Total**: NubCats aparecem estrategicamente em todas as páginas sem repetição excessiva

### Estrutura
- **Todas as 18 imagens Love estão sendo usadas** (8 LoveRequest + 10 HappyScreen + 1 central + usadas no Hub/Album/Wars)
- Imagens organizadas por contexto de uso
- NubCats espalhados estrategicamente em todo o site
- Responsividade mantida e melhorada
- Sistema de música completamente funcional e inteligente

---

## 📸 Organização Detalhada do Album - Guia Completo para IAs

### Estrutura de Arquivos e Ordem de Exibição

O Album está organizado em uma ordem específica e temática. Cada seção tem suas imagens e vídeos listados abaixo na ordem exata de exibição:

#### **Seção 1: Fotos Juntos** (8 itens)
```
1. Fotos Juntos.jpeg - "Our first memory together 💕"
2. Fotos Juntos (2).jpeg - "Perfect moments captured forever 💖"
3. Fotos Juntos (3).jpeg - "Together is my favorite place 🥰"
4. Fotos Juntos (4).jpeg - "Love in every frame ❤️"
5. Fotos Juntos (5).jpeg - "These memories make my heart full 💗"
6. Fotos Juntos (6).jpeg - "You make every moment special 🌸"
7. Fotos Juntos (7).jpeg - "Forever grateful for these days 💝"
8. Fotos Juntos (8).jpeg - "Pure happiness captured 💫"
```

#### **Seção 2: Me With Her + Trogir** (10 itens)
**Me With Her - Imagens:**
```
9. MeWithHer.jpeg - "Making memories with you 💕"
10. MeWithHer (2).jpeg - "Every photo is a treasure 🌹"
11. MeWithHer (3).jpeg - "Love looks so good on us 💖"
12. MeWithHer (4).jpeg - "Time stands still with you ⏰"
13. MeWithHer (5).jpeg - "These moments make life beautiful ✨"
14. MeWithHer (6).jpeg - "Forever my favorite person 💕"
```

**Me With Her - Vídeos:**
```
15. MeWithHer.mp4 - "A special moment together 🎬💕"
16. MeWithHer2.mp4 - "Our beautiful memories captured 💖🎥"
```

**Trogir (junto com Me With Her e Fotos Juntos):**
```
17. Trogir.jpeg - "Beautiful place, beautiful memories 🌍💕"
18. Trogir.mp4 - "Exploring together in Trogir 🎬✨"
```

#### **Seção 3: Tudo de Hvar** (13 itens)
**Vídeos Hvar (primeiro):**
```
19. Hvar Video.mp4 - "Amazing moments in Hvar 🏖️💕"
20. Caminho HVar.mp4 - "The beautiful path to Hvar 🛤️✨"
```

**Fotos Hvar:**
```
21. Hvar.jpeg - "Paradise found in Hvar 🌊"
22. Hvar (2).jpeg - "Sunset memories 💖"
23. Hvar (3).jpeg - "Perfect days together ☀️"
24. Hvar (4).jpeg - "Adventures in Hvar 🏝️"
25. Hvar (5).jpeg - "Love and sunshine 💕"
```

**Caminho Hvar Fotos:**
```
26. Caminho Hvar.jpeg - "The journey together 🛤️"
27. Caminho Hvar (2).jpeg - "Beautiful path, beautiful company 💕"
28. caminho Hvar (3).jpeg - "Every step with you is special ✨"
29. Caminho Hvar (4).jpeg - "Walking hand in hand 💖"
30. Caminho Hvar (5).jpeg - "The road to happiness 🛣️"
```

#### **Seção 4: Cuddling** (9 itens)
```
31. Cuddling.jpeg - "Snuggles and cuddles 💕"
32. Cuddling (2).jpeg - "Warmth and comfort 🥰"
33. Cuddling (3).jpeg - "Perfect closeness 💖"
34. Cuddling (4).jpeg - "Cozy moments together 🌸"
35. Cuddling (5).jpeg - "Hugs that heal the heart 💗"
36. Cuddling (6).jpeg - "Your arms are home 🏠"
37. Cuddling (7).jpeg - "Safe and loved 💝"
38. Cuddling (8).jpeg - "Pure comfort together 💫"
39. Cuddling (9).jpeg - "Snuggle time forever 💕"
```

#### **Seção 5: Her** (10 itens)
```
40. Her.jpeg - "Beautiful you 💕"
41. Her (1).jpeg - "My favorite view 🌹"
42. Her (2).jpeg - "You light up everything ✨"
43. Her (3).jpeg - "Gorgeous inside and out 💖"
44. Her (4).jpeg - "Simply stunning 🌸"
45. Her (5).jpeg - "Your beauty takes my breath away 💗"
46. Her (6).jpeg - "Every angle is perfect 💝"
47. Her (7).jpeg - "My beautiful girl 💫"
48. Her (8).jpeg - "You are art 💕"
49. Her (9).jpeg - "Perfect in every way ❤️"
```

#### **Seção 6: SillyFaces** (4 itens) - **Depois de Her, antes de Minions**
```
50. SillyFaces (1).jpeg - "Silly moments together 😂"
51. SillyFaces (2).jpeg - "Making each other laugh 😆"
52. SillyFaces (3).jpeg - "Fun and goofy times 🥳"
53. SillyFaces (4).jpeg - "Laughter is the best medicine 😄"
```

#### **Seção 7: Minions** (2 itens)
```
54. Minions.jpeg - "Minion adventures 🟡"
55. Minions (2).jpeg - "Cute minion moments 💛"
```

#### **Seção 8: Desenho Instagram** (1 item)
```
56. Instagram Desenho.jpeg - "Creative artwork together 🎨✨"
```

#### **Seção 9: OnPlane** (5 itens)
```
57. OnPlane.jpeg - "Flying together ✈️"
58. OnPlane (2).jpeg - "Adventures in the sky 🌤️"
59. OnPlane (3).jpeg - "Traveling with you 💕"
60. OnPlane (4).jpeg - "Sky-high memories ✨"
61. OnPlane (5).jpeg - "Our journey continues 🛫"
```

**TOTAL**: 61 itens (56 imagens + 5 vídeos) organizados em ordem específica.

### Função de Organização

A função `organizeAlbumMedia()` em `Album.jsx` cria essa ordem exata usando um contador de IDs sequencial e arrays organizados por categoria. Cada item recebe:
- ID único sequencial
- URL completa para o arquivo
- Tipo ('image' ou 'video')
- Comentário fofo personalizado

### Separadores Visuais

Entre cada fileira de 4 itens, há separadores decorativos com:
- Linhas gradientes (rosa → roxo → azul)
- Emoji central (💕, ✨, 💖 rotacionando)
- Espaçamento visual (margin: 30px)

### NubCats Decorativos no Album

- Aparecem estrategicamente em linhas específicas (2, 4, 6, etc)
- Preenchem espaços vazios quando fileira não está completa (quando rowIndex % 3 === 0)
- 6 imagens diferentes da pasta Love/ usadas
- Opacidade 0.6-0.7 para não competir com conteúdo

---

## 🎵 Sistema de Música - Ordem Específica Detalhada

### Ordem de Reprodução Aleatória Completa - **ATUALIZADO**

1. **INÍCIO**: Música completamente aleatória de todas as 21 músicas
   - Todas as 21 músicas são embaralhadas aleatoriamente
   - A primeira música pode ser qualquer uma das 21
   - Não há música fixa

2. **REPRODUÇÃO**: Todas as 21 músicas embaralhadas aleatoriamente
   - Ordem muda completamente a cada ciclo
   - Cada música tocada apenas uma vez até completar todas

3. **QUANDO COMPLETA TODAS (21 músicas tocadas)**:
   - Reembaralha todas as 21 músicas em nova ordem aleatória completa
   - Reseta `playedSongs` array
   - Inicia novo ciclo com nova ordem aleatória

4. **AUTO-PLAY E AUTO-ADVANCE**: - **NOVO**
   - Música toca automaticamente quando o site inicia
   - Quando uma música termina, avança automaticamente para a próxima

### Fluxo Completo de Reprodução

```
Ciclo 1:
Música aleatória #1 → Música aleatória #2 → ... → Música aleatória #21 (ordem completamente aleatória)

Ciclo 2 (após completar ciclo 1):
Nova música aleatória #1 → Nova música aleatória #2 → ... → Nova música aleatória #21 (nova ordem completamente aleatória)

E assim por diante infinitamente com ordem sempre aleatória...
```

### Implementação Técnica

- `useEffect` inicial: Embaralha todas as 21 músicas aleatoriamente e escolhe a primeira
- `shuffledPlaylistRef.current`: Estrutura com todas as 21 músicas embaralhadas aleatoriamente
- `playedSongs`: Array de índices já tocados (ex: [0, 5, 12, 3, ...])
- `getNextUntrackedSong()`: 
  - Se `playedSongs.length >= 21`: Reembaralha todas as 21 músicas, reseta `playedSongs`
  - Senão: Encontra próxima música não tocada na sequência embaralhada atual
- `handleEnded()`: Marca atual como tocada, chama `getNextUntrackedSong()` para tocar próxima automaticamente
- `nextTrack()`: Marca atual como tocada, pula para próxima não tocada

---

**Última Atualização**: Documentação completa atualizada com Album reorganizado em ordem temática específica detalhada (61 itens: Fotos Juntos → Me With Her + Trogir → Hvar completo → Cuddling → Her → SillyFaces → Minions → Instagram Desenho → OnPlane), sistema de música com ordem completamente aleatória (inicial aleatória completa, auto-play e auto-advance garantidos), otimizações de performance para emojis (redução de frequência, quantidade e efeitos CSS para melhor performance em mobile, emojis no LoveRequest agora com z-index máximo 99999 para ficarem à frente de tudo), jogo LoveWars completamente refeito (novo conceito: gato em cima atira corações, player em baixo pega corações, sistema de 3 vidas, dificuldade progressiva ao longo de 1-2 minutos, otimizado para iPhone 13), todos os 5 vídeos integrados nas seções corretas, textos fofos personalizados para cada um dos 61 itens, e NubCats decorativos espalhados estrategicamente em todo o site. Guia completo para IAs entenderem a organização exata do Album, sistema de música aleatória, otimizações de performance, e novo jogo LoveWars.
