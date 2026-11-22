# PawHome - Client

## Purpose
PawHome is a pet adoption platform where people can browse dogs, cats, birds and rabbits, send adoption requests, and where pet owners can list pets and approve or reject the requests they receive.

## Live URL
- Client: https://your-client.vercel.app
- Server: https://your-server.onrender.com

## Features
- Browse all pets with search by name, species filter and sorting by adoption fee
- Pet details page with an adoption request form (pickup date and message)
- Email/password and Google login with Firebase, plus JWT in an httpOnly cookie
- Private routes that stay logged in after a page reload
- Dashboard with My Listings (stats, edit, delete, requests modal), Add Pet and My Requests
- Owner can approve or reject requests; approving one marks the pet as adopted and closes the rest
- Dark / light theme toggle and Framer Motion animation on the hero
- Toast notifications and confirmation modals, no browser alerts
- Fully responsive layout

## NPM Packages Used
react, react-dom, react-router-dom, axios, firebase, react-hot-toast, framer-motion, react-icons, tailwindcss, daisyui, vite

## Run locally
```bash
npm install
cp .env.example .env   # fill in the values
npm run dev
```

## Deploy on Vercel
- Root directory: `client`, framework preset Vite (build `npm run build`, output `dist`)
- Add all `VITE_*` variables from `.env.example` in Vercel before building. `VITE_API_URL` is your Render url without a trailing slash
- In Firebase Console, Authentication, Settings, Authorized domains: add your Vercel domain
- `vercel.json` rewrites every route to `index.html`, so reloading any page works
