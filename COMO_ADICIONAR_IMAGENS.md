# 📸 Como Adicionar Imagens ao Site

## 📁 Estrutura de Pastas

```
public/
  resources/
    images/
      cat1.png          # Gato principal (Love Request)
      cat2.png          # Gato 2 (Happy Screen)
      cat3.png          # Gato 3 (Happy Screen)
      featured1.jpg     # Imagem destacada 1 (Happy Screen)
      featured2.jpg     # Imagem destacada 2 (Happy Screen)
      featured3.jpg     # Imagem destacada 3 (Happy Screen)
      album/
        memory1.jpg     # Foto do álbum 1
        memory2.jpg     # Foto do álbum 2
        memory3.jpg     # Foto do álbum 3
        ...             # Adicione quantas quiser
    sounds/
      song1.mp3         # Música 1
      song2.mp3         # Música 2
      song3.mp3         # Música 3
      ...               # Adicione quantas quiser
```

## 🐱 Imagens de Gatos

### Love Request (Página Inicial)
- **Arquivo**: `public/resources/images/cat1.png`
- **Tamanho recomendado**: 200x200px a 400x400px
- **Formato**: PNG (com fundo transparente) ou JPG

### Happy Screen (Tela Feliz)
- **Arquivos**: 
  - `public/resources/images/cat1.png`
  - `public/resources/images/cat2.png`
  - `public/resources/images/cat3.png`
- **Tamanho recomendado**: 150x150px a 300x300px
- **Formato**: PNG ou JPG

**Onde editar**: `src/pages/LoveRequest.jsx` e `src/pages/HappyScreen.jsx`
- Procure por `catImages` e atualize os caminhos

## 💕 Imagens Destacadas (Happy Screen)

- **Arquivos**: 
  - `public/resources/images/featured1.jpg`
  - `public/resources/images/featured2.jpg`
  - `public/resources/images/featured3.jpg`
- **Tamanho recomendado**: 600x600px ou maior
- **Formato**: JPG ou PNG

**Onde editar**: `src/pages/HappyScreen.jsx`
- Procure por `featuredImages` e atualize os caminhos

## 📸 Álbum de Fotos

- **Pasta**: `public/resources/images/album/`
- **Arquivos**: `memory1.jpg`, `memory2.jpg`, etc.
- **Tamanho recomendado**: 800x800px ou maior
- **Formato**: JPG, PNG, WebP

**Onde editar**: `src/components/Album.jsx`
- Procure por `albumImages`
- Adicione novas entradas na lista:

```javascript
const albumImages = [
  {
    id: 1,
    url: '/resources/images/album/memory1.jpg',
    comment: 'Seu comentário aqui 💕'
  },
  {
    id: 2,
    url: '/resources/images/album/memory2.jpg',
    comment: 'Outro comentário ❤️'
  },
  // Adicione mais aqui...
]
```

## 🎵 Músicas

- **Pasta**: `public/resources/sounds/`
- **Arquivos**: `song1.mp3`, `song2.mp3`, etc.
- **Formato**: MP3 (recomendado), OGG, WAV

**Onde editar**: `src/components/MusicPlayer.jsx`
- Procure por `playlist`
- Atualize os caminhos e nomes:

```javascript
const playlist = [
  {
    name: "Nome da Música",
    artist: "Nome do Artista",
    url: "/resources/sounds/song1.mp3"
  },
  // Adicione mais aqui...
]
```

## 📝 Resumo Rápido

1. **Gatos**: Coloque em `public/resources/images/` (cat1.png, cat2.png, cat3.png)
2. **Imagens destacadas**: Coloque em `public/resources/images/` (featured1.jpg, featured2.jpg, featured3.jpg)
3. **Álbum**: Coloque em `public/resources/images/album/` (memory1.jpg, memory2.jpg, etc.)
4. **Músicas**: Coloque em `public/resources/sounds/` (song1.mp3, song2.mp3, etc.)
5. **Edite os arquivos JSX** para atualizar os caminhos e adicionar mais itens

---

**Tudo está pronto para você adicionar suas imagens e músicas!** 💕✨
