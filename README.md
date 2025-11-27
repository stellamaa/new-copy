# Stella Mathioudakis — Next.js Portfolio

This repository now contains a [Next.js](https://nextjs.org/) application that recreates the original static portfolio while preserving every visual detail, animation, and interactive behaviour.

## 🚀 Getting Started

Install dependencies (npm shown, pnpm/yarn also work):

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000) with hot reloading enabled.

To build and launch the production bundle:

```bash
npm run build
npm start
```

## 📁 Project Structure

```
stellanew-copy/
├── app/
│   ├── layout.js      # Root layout & metadata
│   ├── page.js        # Main portfolio page (client component)
│   └── globals.css    # Global styles migrated from the previous site
├── public/
│   ├── assets/        # Images, audio, and video assets
│   └── fonts/         # Custom fonts served from /fonts
├── next.config.js     # Next.js configuration
├── package.json       # Scripts and dependencies
└── README.md          # This file
```

All static media is served from `public/assets`, so any new files can be dropped there and referenced with `/assets/...` paths. The legacy `script.js` logic lives now inside a `useEffect` in `app/page.js`, keeping Three.js interactions, modals, randomised imagery, audio controls, and theme toggling fully functional.

## 🛠️ Customisation Tips

- **Content:** Update the markup in `app/page.js`. Class names and IDs were kept intact to preserve styling hooks.
- **Styling:** Tweak `app/globals.css`. It mirrors the former `styles.css`, so existing rules remain unchanged.
- **Three.js gallery:** Adjust media files or behaviour inside the `useEffect` block in `app/page.js`.
- **Assets:** Add, replace, or remove files under `public/assets`. They are referenced directly without imports.

## ✅ Feature Parity Highlights

- Animated navigation letter flip and landing imagery with expand-on-click.
- Three.js media carousel with clickable videos and fullscreen image modal.
- Art section previews with hover/tap behaviour and synced audio controls.
- About overlay, footer call-to-action, and theme toggle with `localStorage` persistence.
- Mobile-friendly interaction patterns retained, including taps to open/close previews.

## 📦 Deployment

Any platform that supports Next.js (Vercel, Netlify, Render, etc.) can host this project. The default configuration enables React Strict Mode and uses the App Router.

## 📝 Licence

Design and content © Stella Mathioudakis. You’re welcome to adapt the codebase for personal use—just replace the media and copy with your own work before publishing.








