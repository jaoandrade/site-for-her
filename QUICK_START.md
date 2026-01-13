# 🚀 Quick Start Guide

## 1. Install Dependencies

```bash
npm install
```

## 2. Configure Supabase (Optional - for Album feature)

1. Go to https://supabase.com/dashboard
2. Create a new project (free tier available)
3. Create a table `album` and storage bucket `album`
4. Copy your Project URL and anon key from Settings > API
5. Create `.env.local` file in root directory:
   ```
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

**📚 For detailed step-by-step instructions, see `GUIA_PASSO_A_PASSO.md`**

## 3. Add Music (Optional)

Edit `src/components/MusicPlayer.jsx` and replace the placeholder URLs with your music files.

## 4. Run the Project

```bash
npm run dev
```

Open http://localhost:3000 in your browser!

## 5. Customize

- **Romantic Message**: Edit `src/pages/HappyScreen.jsx` - `romanticMessage` variable
- **Colors**: Edit CSS variables in `src/index.css`
- **Music**: Update playlist in `src/components/MusicPlayer.jsx`

## That's it! 💕

The site works without Supabase, but the Album feature requires it.

**📚 Need more help? Check `GUIA_PASSO_A_PASSO.md` for a complete detailed guide!**
