# Deployment Guide - Beyond the Swipe

## Quick Deploy Commands

### Option 1: Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd c:\Users\omkar\OneDrive\Desktop\elitmus
vercel
```

### Option 2: Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Option 3: Cloudflare Pages
```bash
# Install Wrangler
npm i -g wrangler

# Deploy
wrangler pages publish dist
```

## Build Configuration

### Build Command
```bash
npm run build
```

### Output Directory
```
dist/
```

### Environment Variables (for M2)
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_API_BASE_URL=https://your-api.com/api
```

## Platform-Specific Configuration

### Vercel (vercel.json)
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    }
  ]
}
```

### Netlify (_redirects file in public/)
```
/*    /index.html   200
```

### Cloudflare Pages
No additional configuration needed - auto-detected

## Post-Deployment Checklist

### Immediate
- [ ] Verify app loads at deployment URL
- [ ] Test PWA installability
- [ ] Verify service worker registration
- [ ] Test offline functionality
- [ ] Verify all routes work correctly
- [ ] Test on mobile device

### Before Production (M2)
- [ ] Add custom domain
- [ ] Configure SSL (auto on most platforms)
- [ ] Set up environment variables
- [ ] Configure Supabase project
- [ ] Generate and upload PWA icons
- [ ] Test payment integration (if applicable)
- [ ] Set up error tracking (Sentry)
- [ ] Configure analytics

## Performance Optimization

### Current Bundle Sizes
- JavaScript: 396 KB (121 KB gzipped)
- CSS: 30 KB (6 KB gzipped)
- Total: ~426 KB (~127 KB gzipped)

### Future Optimizations
1. Code splitting by route
2. Image optimization with CDN
3. Lazy load non-critical features
4. Preload critical assets
5. Optimize font loading

## Monitoring

### Recommended Tools
- **Error Tracking**: Sentry
- **Analytics**: Plausible or Fathom (privacy-focused)
- **Performance**: Vercel Analytics or Cloudflare Web Analytics
- **Uptime**: UptimeRobot or similar

## Security

### Current Setup
- HTTPS enforced (automatic on modern platforms)
- No secrets in client code
- Environment variables for sensitive data
- PWA requires secure context

### Future Security (M2)
- Content Security Policy headers
- Rate limiting on API
- Supabase RLS policies
- Input sanitization
- XSS protection

## Custom Domain Setup

### DNS Configuration
```
Type: CNAME
Name: @ or www
Value: [platform-specific-url]
```

### SSL Certificate
- Automatic on Vercel, Netlify, Cloudflare
- Usually provisions within 24 hours

## Troubleshooting

### PWA Not Installing
- Verify HTTPS is active
- Check manifest is accessible at /manifest.webmanifest
- Verify service worker is registered
- Check console for errors

### Routes Not Working
- Verify SPA redirect rules are configured
- Check _redirects or vercel.json
- Ensure index.html fallback is set

### Service Worker Issues
- Hard refresh (Ctrl+Shift+R)
- Clear service worker in DevTools
- Verify sw.js is accessible
- Check Cache-Control headers

## Rollback

### Quick Rollback
Most platforms support instant rollback to previous deployments through their dashboard.

### Manual Rollback
```bash
# Rebuild from previous commit
git checkout [previous-commit]
npm run build
[deploy-command]
```

## Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [Netlify Docs](https://docs.netlify.com)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages)
- [PWA Best Practices](https://web.dev/pwa-checklist/)
