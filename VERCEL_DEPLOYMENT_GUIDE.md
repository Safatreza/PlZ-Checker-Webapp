# Vercel Deployment Troubleshooting Guide

## Issues Fixed

This guide documents the issues found in the PLZ-Checker-Webapp deployment and the fixes applied.

---

## Problems Identified

### 1. **Missing Node.js Version Specification**
**Issue**: `package.json` did not specify which Node.js version to use, causing Vercel to potentially use an incompatible version.

**Fix Applied**: Added engines field to `package.json`:
```json
"engines": {
  "node": ">=18.17.0"
}
```

**Why**: Next.js 13.5.11 requires Node.js 18.17.0 or higher. Without this specification, Vercel might use an older version.

---

### 2. **Missing Vercel Configuration**
**Issue**: No `vercel.json` file existed, so Vercel used default settings which may not be optimal for this application.

**Fix Applied**: Created `vercel.json` with:
- API function timeout increased to 30 seconds (from default 10s)
- Memory allocation set to 1024MB for serverless functions
- CORS headers configured for API routes
- Region set to Frankfurt (fra1) for European users

**Why**: The default 10-second timeout might not be enough for API calls that use the Nominatim geocoding fallback. CORS headers ensure the API works across different origins.

---

### 3. **Missing Serverless Function Configuration**
**Issue**: The API endpoint at `pages/api/check_plz.js` didn't export a config object for Vercel serverless functions.

**Fix Applied**: Added to `pages/api/check_plz.js`:
```javascript
export const config = {
  maxDuration: 30,
  runtime: 'nodejs18.x'
};
```

**Why**: Explicitly configures the serverless function runtime and timeout. This ensures consistency across deployments.

---

### 4. **Missing Next.js Configuration**
**Issue**: No `next.config.js` file existed, missing important optimizations and configurations.

**Fix Applied**: Created `next.config.js` with:
- React strict mode enabled
- SWC minification enabled
- Image optimization configured
- CORS headers for API routes
- Console removal in production
- Security headers

**Why**: These optimizations improve performance, security, and ensure proper API functionality.

---

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard

1. **Push changes to GitHub**:
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration and fixes"
   git push origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will automatically detect Next.js

3. **Configure Environment (if needed)**:
   - No environment variables are currently required
   - If you add any API keys in the future, add them in Vercel dashboard

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd PlZ-Checker-Webapp-main
   vercel
   ```

4. **Follow prompts**:
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No (first time) or Yes (redeployment)
   - Project name? plz-checker-webapp
   - Directory? ./
   - Override settings? No

---

## Testing After Deployment

### 1. **Test API Endpoint**
Visit: `https://your-app.vercel.app/api/check_plz?plz=80331`

Expected response:
```json
{
  "person": "Anna Kropfitsch",
  "land": "Baden-Württemberg/Bayern",
  "contact": {
    "name": "Anna Kropfitsch",
    "position": "Sales Manager",
    "email": "anna.kropfitsch@aboutwater.de",
    "color": "#059669",
    "initials": "AK"
  }
}
```

### 2. **Test Frontend**
Visit: `https://your-app.vercel.app`

Try these inputs:
- Direct PLZ: `80331`
- City name: `München`
- Full address: `Hauptstraße 15, München`
- PLZ requiring choice: `45000` (should show two options)

### 3. **Test Address Processing**
Try various formats:
- `Berlin` (city only)
- `10115` (PLZ only)
- `10115 Berlin` (PLZ + city)
- `Unter den Linden 1, Berlin` (full address)

---

## Common Deployment Errors & Solutions

### Error: "Build failed"
**Possible causes**:
1. Missing dependencies
2. Syntax errors
3. Import errors

**Solutions**:
```bash
# Test build locally first
npm run build

# If it fails locally, fix the errors before deploying
# Check build logs in Vercel dashboard for specific errors
```

### Error: "Serverless Function Timeout"
**Cause**: API function taking longer than configured timeout (30s)

**Solutions**:
1. Check if Nominatim API is responding
2. Increase timeout in `vercel.json` (max 60s on Pro plan)
3. Add caching for frequently requested PLZ codes

### Error: "Module not found"
**Cause**: Import paths not resolving correctly

**Solutions**:
1. Check all import paths are correct
2. Ensure all files are committed to Git
3. Verify `jsconfig.json` or `tsconfig.json` paths

### Error: "API returns 404"
**Cause**: API route not found

**Solutions**:
1. Verify file is in `pages/api/` directory
2. Check filename matches route (check_plz.js = /api/check_plz)
3. Ensure file exports default function

### Error: "CORS blocked"
**Cause**: CORS headers not configured

**Solution**: Already fixed in `vercel.json` and `next.config.js`. If still occurring:
1. Clear browser cache
2. Check Vercel deployment logs
3. Verify headers are being sent (check Network tab)

---

## Performance Optimization Tips

### 1. **Enable Caching**
For frequently requested PLZ codes, add API response caching:
```javascript
res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
```

### 2. **Image Optimization**
The background image `UI.jpg` is large. Consider:
- Compressing the image
- Using Next.js Image component
- Converting to WebP format

### 3. **Reduce Bundle Size**
Current bundle is small, but monitor with:
```bash
npm run build
# Check output for bundle sizes
```

---

## Monitoring & Debugging

### Check Deployment Logs
1. Go to Vercel Dashboard
2. Select your project
3. Click on "Deployments"
4. Click on specific deployment
5. Check "Build Logs" and "Function Logs"

### Enable Function Logging
Add to API functions for debugging:
```javascript
console.log('PLZ received:', plz);
console.log('Processing result:', result);
```

View logs in Vercel Dashboard → Your Project → Logs

### Performance Monitoring
- Use Vercel Analytics (enable in dashboard)
- Monitor API response times
- Check for failed requests

---

## Security Considerations

### Current Security Measures
1. ✅ Only GET requests allowed for API
2. ✅ Input sanitization for PLZ
3. ✅ No sensitive data exposed
4. ✅ CORS configured correctly
5. ✅ No authentication required (public tool)

### Future Enhancements
- Add rate limiting to prevent abuse
- Implement request logging for analytics
- Add CAPTCHA if spam becomes an issue

---

## Rollback Procedure

If deployment fails or causes issues:

1. **Via Vercel Dashboard**:
   - Go to Deployments
   - Find previous working deployment
   - Click "..." menu → "Promote to Production"

2. **Via Git**:
   ```bash
   git revert HEAD
   git push origin main
   ```

---

## Contact & Support

**Technical Issues**:
- Email: safat.majumder@aboutwater.de

**Vercel Support**:
- Documentation: https://vercel.com/docs
- Support: https://vercel.com/support

---

## Changelog

### 2026-01-13 - Initial Deployment Configuration
- Added `vercel.json` with function timeout and CORS
- Added Node.js version to `package.json`
- Added serverless function config to API endpoint
- Created `next.config.js` with optimizations
- Created this deployment guide

---

## Next Steps

1. ✅ Apply fixes (completed)
2. ⏳ Push to GitHub
3. ⏳ Deploy to Vercel
4. ⏳ Test all functionality
5. ⏳ Monitor for 24 hours
6. ⏳ Enable Vercel Analytics

---

## Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
