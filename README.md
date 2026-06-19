# Shubham Kashikar Portfolio Website

A professional Vue 3 + Vite portfolio website for Shubham Kashikar, focused on full-stack engineering, GovTech products, AI/RAG systems, cloud APIs, court kiosks, analytics, and technical leadership.

## Features

- Modern responsive landing page
- Hero, skills, projects, experience, and contact sections
- Clean dark professional UI
- Data-driven profile content in `src/data/profile.js`
- Ready for Vercel, Cloudflare Pages, Netlify, or GitHub Pages
- Free SSL when deployed on Vercel or Cloudflare Pages

## Tech Stack

- Vue 3
- Vite
- Plain CSS
- No paid dependencies

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown in your terminal.

## Build for production

```bash
npm run build
```

The production files will be generated in the `dist` folder.

## Deploy to Vercel

1. Push this folder to GitHub.
2. Go to Vercel.
3. Click **Add New Project**.
4. Import the GitHub repository.
5. Use these settings:

```text
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
```

6. Add your custom domain in **Project Settings → Domains**.
7. Copy the DNS records from Vercel into Namecheap Advanced DNS.

## Update your information

Edit this file:

```text
src/data/profile.js
```

Update:

- Email
- GitHub
- LinkedIn
- Skills
- Project names
- Experience details
- Contact text

## Recommended DNS for Vercel + Namecheap

In Namecheap Advanced DNS, Vercel commonly uses:

```text
A Record
Host: @
Value: 76.76.21.21

CNAME Record
Host: www
Value: cname.vercel-dns.com
```

Always use the exact records Vercel shows in your project because they can vary.
