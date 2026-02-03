# Deployment Guide for Tipdora.fun

## Prerequisites
- Node.js installed.
- A GitHub/GitLab account.
- A Vercel or Netlify account.

## Local Build Test
Before deploying, ensure the build works locally:
```bash
npm run build
npm run preview
```
This will create a `dist/` folder with your production assets.

## Deploying to Vercel (Recommended)
1. Push this code to a Git repository (GitHub/GitLab).
2. Login to [Vercel](https://vercel.com).
3. Click "Add New Project".
4. Import your **tipdora-fun** repository.
5. Identify the Framework Preset: Vercel usually detects `Vite` automatically.
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Click **Deploy**.

## Deploying to Netlify
1. Login to Netlify.
2. "Import from Git".
3. Choose repository.
4. **Build Command:** `npm run build`
5. **Publish Directory:** `dist`
6. Click **Deploy Site**.

## Post Deployment
- **Domain:** Connect `tipdora.fun` domain in the hosting settings.
- **SSL:** Ensure HTTPS is active (auto-enabled on Vercel/Netlify).
- **Analytics:** Connect Google Analytics.
- **Search Console:** Verify ownership in Google Search Console.
