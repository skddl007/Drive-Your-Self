# Deployment Guide

This guide provides instructions for deploying the DSA Practice Platform to various hosting platforms.

## Prerequisites

Before deploying, make sure you have:

1. A Supabase account with your project set up
2. Your Supabase URL and anon key
3. A GitHub repository with your code

## Environment Variables

The application requires the following environment variables:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon/public key

These are already configured in the following files:
- `.env.production`
- `netlify.toml`
- `vercel.json`

**Important**: Before deploying to production, replace the placeholder values with your actual Supabase credentials.

## Deployment Options

### Option 1: Netlify

1. Push your code to GitHub
2. Log in to [Netlify](https://www.netlify.com/)
3. Click "New site from Git"
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Show advanced" and add your environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Click "Deploy site"

### Option 2: Vercel

1. Push your code to GitHub
2. Log in to [Vercel](https://vercel.com/)
3. Click "New Project"
4. Import your repository
5. Configure project:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. Click "Deploy"

### Option 3: GitHub Pages

1. Install the gh-pages package:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Add these scripts to package.json:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. Add a base URL to vite.config.ts:
   ```typescript
   base: '/your-repo-name/',
   ```

4. Deploy:
   ```bash
   npm run deploy
   ```

## Troubleshooting

### White Screen / Blank Page

If you see a white screen after deployment:

1. Check browser console for errors
2. Verify environment variables are correctly set
3. Ensure the Supabase project is active and accessible
4. Check if the routing is working correctly (try navigating directly to a route)

### Authentication Issues

If users can't log in:

1. Verify Supabase URL and anon key are correct
2. Check if you've added the deployment URL to the allowed URLs in Supabase Auth settings
3. Ensure CORS is properly configured in Supabase

## Post-Deployment Verification

After deploying, verify:

1. Home page loads correctly
2. User registration works
3. User login works
4. Dashboard displays after login
5. Problem sheets load correctly
6. Completing problems updates the database

## Updating Your Deployment

To update your deployed application:

1. Make changes to your code
2. Commit and push to GitHub
3. The deployment should automatically update (if using CI/CD)
4. If not using CI/CD, run `npm run deploy` again
