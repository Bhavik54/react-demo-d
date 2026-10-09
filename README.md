# For Dhruvi, With Love ❤️

A premium, interactive romantic website built with React + Vite + Framer Motion + Tailwind CSS.

---

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

---

## Personalizing the Website

All editable content lives in **`src/config.js`**. Open it and update:

| Field | What to change |
|-------|---------------|
| `herName` | Her name (default: Dhruvi) |
| `myName` | Your name (default: Bhavik) |
| `loveLetter` | The full love letter text |
| `storyCards` | Titles, previews, and detail text for the 4 story cards |
| `galleryPhotos` | Array of `{ src, caption }` — add photo files to `/public/gallery/` |
| `musicPath` | Path to an MP3 in `/public/music/` e.g. `/music/our-song.mp3` |
| `finaleMessage` | The message shown after the confetti |
| `finaleSignature` | Closing line |

### Adding photos

1. Create the folder `public/gallery/`
2. Drop your photos in: `public/gallery/photo1.jpg`, etc.
3. In `src/config.js`, populate `galleryPhotos`:

```js
galleryPhotos: [
  { src: '/gallery/photo1.jpg', caption: 'Our first date' },
  { src: '/gallery/photo2.jpg', caption: 'That one evening' },
],
```

### Adding background music

1. Place your MP3 in `public/music/our-song.mp3`
2. In `src/config.js` set: `musicPath: '/music/our-song.mp3'`

---

## Production Build

```bash
npm run build
npm run preview   # preview the built app locally
```

---

## Deploy on Vercel

### Option A — GitHub + Vercel (recommended)

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/dhruvi-love.git
   git push -u origin main
   ```
2. Go to https://vercel.com → **New Project** → Import your GitHub repo.
3. Vercel auto-detects Vite. Click **Deploy**.
4. Your site will be live at `https://dhruvi-love.vercel.app` (or a custom domain).

### Option B — Vercel CLI (no GitHub needed)

```bash
npm install -g vercel
vercel login
vercel --prod
```

Follow the prompts. The CLI will give you the live URL.

---

## Project Structure

```
dhruvi-love/
├── public/
│   ├── gallery/        ← add your photos here
│   └── music/          ← add your MP3 here
├── src/
│   ├── components/
│   │   ├── HeroSection.jsx
│   │   ├── LoveLetter.jsx
│   │   ├── LoveStory.jsx
│   │   ├── InteractiveQuestion.jsx
│   │   ├── SurpriseFinale.jsx
│   │   ├── FloatingHearts.jsx
│   │   ├── MusicToggle.jsx
│   │   ├── CustomCursor.jsx
│   │   └── ProgressBar.jsx
│   ├── config.js       ← EDIT THIS FILE
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── vercel.json
```

---

## Post-Deploy Checklist

- [ ] Site loads on mobile (test on iPhone/Android)
- [ ] Opening envelope animation works
- [ ] All 4 story cards open correctly
- [ ] Love question shows animated responses
- [ ] Finale confetti fires on button click
- [ ] Replay button works
- [ ] Music plays/pauses (if you added a file)
- [ ] Custom cursor visible on desktop
- [ ] Progress dots update while scrolling
- [ ] No console errors
