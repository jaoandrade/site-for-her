# 💕 Site For Her - Romantic Nub Nub Cat Website

A beautiful, mobile-first romantic website with interactive features, games, and shared memories.

## ✨ Features

- **Love Request Page**: Interactive proposal page with emoji rain and a "NO" button that runs away
- **Happy Screen**: Romantic message after acceptance
- **Hub**: Main navigation with three sections
- **📸 Album**: Photo album with local images + Supabase integration for adding new photos
- **🚀 Love Wars**: Space Invaders-style game with Nub Nub Cat
- **🎵 Music Player**: Fixed music player with romantic playlist
- **Mobile-First Design**: Optimized for iPhone and mobile devices
- **Smooth Animations**: Beautiful CSS/JS animations throughout

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

3. Configure Supabase (Required for Album upload feature):

   - Create a `.env` file in the root directory
   - Add the following variables:
   ```
   VITE_SUPABASE_URL=https://vizlfacxrfgqfpxkitum.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpemxmYWN4cmZncWZweGtpdHVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgyOTg2NjAsImV4cCI6MjA4Mzg3NDY2MH0.PDuQk81KTeAkhxfnizt9GTzEhqpsiTNjfn_8LswEHlQ
   ```
   - Run the SQL schema in `supabase_schema.sql` in your Supabase SQL Editor
   - Create a Storage bucket named `album-images` in Supabase Dashboard > Storage (set as public)

4. Add Images and Music (Optional):

   - Place cat images in `public/resources/images/` (cat1.png, cat2.png, cat3.png)
   - Place featured images in `public/resources/images/` (featured1.jpg, featured2.jpg, featured3.jpg)
   - Place album images in `public/resources/images/album/` (memory1.jpg, memory2.jpg, etc.)
   - Place music files in `public/resources/sounds/` (song1.mp3, song2.mp3, etc.)
   - Update the file paths in the respective JSX files
   - See `COMO_ADICIONAR_IMAGENS.md` for detailed instructions

5. Start the development server:

```bash
npm run dev
```

5. Open your browser to `http://localhost:3000`

## 📁 Project Structure

```
SiteForHer/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Album.jsx        # Photo album with local images
│   │   ├── MusicPlayer.jsx  # Music player component
│   │   └── ...
│   ├── pages/               # Main pages
│   │   ├── LoveRequest.jsx  # Initial proposal page
│   │   ├── HappyScreen.jsx  # Acceptance screen
│   │   └── Hub.jsx          # Main navigation hub
│   ├── games/               # Game components
│   │   └── LoveWars.jsx     # Space Invaders game
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── public/
│   └── resources/           # Images and sounds
│       ├── images/          # Cat images, featured images, album
│       └── sounds/          # Music files
├── package.json
└── vite.config.js
```

## 🎨 Customization

### Edit Romantic Message

Open `src/pages/HappyScreen.jsx` and edit the `romanticMessage` variable:

```javascript
const romanticMessage = `Your custom message here...`
```

### Change Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --color-pink: #ffb3d9;
  --color-purple: #d9b3ff;
  /* ... */
}
```

### Add Images and Music

See `COMO_ADICIONAR_IMAGENS.md` for complete instructions on:
- Where to place images (cats, featured, album)
- Where to place music files
- How to update file paths in the code

## 📸 Adding Images and Music

All images and music are stored locally in the `public/resources/` folder.

### Quick Setup:

1. **Cat Images**: Place in `public/resources/images/`
   - `cat1.png` - Main cat (Love Request page)
   - `cat2.png`, `cat3.png` - Happy cats (Happy Screen)

2. **Featured Images**: Place in `public/resources/images/`
   - `featured1.jpg`, `featured2.jpg`, `featured3.jpg` - Featured images in Happy Screen

3. **Album Images**: Place in `public/resources/images/album/`
   - `memory1.jpg`, `memory2.jpg`, etc. - Album photos

4. **Music**: Place in `public/resources/sounds/`
   - `song1.mp3`, `song2.mp3`, etc. - Romantic songs

5. **Update File Paths**: Edit the respective JSX files to match your file names

### Detailed Guide:

📚 **See `COMO_ADICIONAR_IMAGENS.md` for complete instructions!**

The guide includes:
- Folder structure
- File naming conventions
- Where to edit file paths
- Image size recommendations
- Music format recommendations

## 📱 Mobile Optimization

The site is optimized for mobile devices, especially iPhones:

- Touch-friendly controls
- Responsive design
- Mobile-first CSS
- Optimized animations
- Viewport meta tags

## 🎮 Game Controls

**Love Wars:**
- Desktop: Arrow keys or A/D to move
- Mobile: Touch to move
- Auto-shoot enabled

## 🛠️ Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📝 Notes

- The music player starts automatically when the site loads
- All images are stored locally in `public/resources/images/` (with Supabase for custom uploads)
- All music is stored locally in `public/resources/sounds/`
- The "NO" button in Love Request will teleport when clicked/touched (6 times, then disappears)
- Images use emoji fallback if files are missing
- **Album Feature**: Click the cat at the end of the album to add new photos with text. Photos are stored in Supabase and the cat moves to the end after each upload.
- **Remove Images**: See `COMO_REMOVER_IMAGENS.md` for instructions on how to remove images from the database.

## 💖 Made with Love

This website was created as a special romantic gesture. Customize it to make it even more personal!

## 📄 License

Feel free to use and modify this project for personal use.

---

**Enjoy! 💕🐱✨**
