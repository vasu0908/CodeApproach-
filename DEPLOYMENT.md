# Deployment Guide

This guide covers deploying the CodeApproach Analyzer to production environments.

## 🚀 Quick Deployment Options

### 1. Vercel (Frontend) + Railway/Render (Backend)

**Frontend (Vercel):**
```bash
# Build the frontend
cd frontend
npm run build

# Deploy to Vercel
npm install -g vercel
vercel

# Set environment variables in Vercel dashboard:
# REACT_APP_API_URL=https://your-backend-domain.com
```

**Backend (Railway):**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Set environment variables:
railway variables set GEMINI_API_KEY=your_actual_api_key
railway variables set NODE_ENV=production
railway variables set FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### 2. Netlify (Frontend) + Heroku (Backend)

**Frontend (Netlify):**
```bash
# Build the frontend
cd frontend
npm run build

# Deploy build folder to Netlify
# Configure environment variables in Netlify dashboard
```

**Backend (Heroku):**
```bash
# Install Heroku CLI
npm install -g heroku

# Create and deploy
heroku create your-app-name
git subtree push --prefix backend heroku main

# Set environment variables
heroku config:set GEMINI_API_KEY=your_actual_api_key
heroku config:set NODE_ENV=production
heroku config:set FRONTEND_URL=https://your-frontend-domain.netlify.app
```

### 3. AWS/GCP/Azure

**Frontend (S3/CloudFront, GCS, or Azure Storage):**
- Build the frontend: `npm run build`
- Upload the `build/` folder to static hosting
- Configure CloudFront/CDN for optimal performance

**Backend (EC2, Compute Engine, or App Service):**
- Set up a Linux server
- Install Node.js and PM2
- Clone the repository
- Install dependencies: `npm install`
- Set environment variables
- Start with PM2: `pm2 start server.js --name "cca-backend"`

## 🔧 Production Checklist

### Environment Variables

**Backend (.env):**
```env
GEMINI_API_KEY=your_actual_google_gemini_api_key
PORT=5000
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend (if using environment variables):**
```env
REACT_APP_API_URL=https://your-backend-domain.com
```

### Security Configuration

1. **CORS**: Update `FRONTEND_URL` to match your production frontend domain
2. **HTTPS**: Ensure both frontend and backend use HTTPS in production
3. **API Keys**: Use secure key management (AWS Secrets Manager, etc.)
4. **Rate Limiting**: Consider adding rate limiting for the analyze endpoint

### Performance Optimizations

1. **Frontend:**
   - Enable gzip compression
   - Configure CDN caching
   - Optimize bundle size with code splitting

2. **Backend:**
   - Enable compression middleware
   - Configure proper logging
   - Set up health checks and monitoring

### Monitoring

1. **Error Tracking**: Integrate Sentry or similar service
2. **Analytics**: Add usage analytics for the analyze endpoint
3. **Uptime Monitoring**: Set up uptime checks for both services

## 📱 Domain Configuration

### Custom Domain Setup

1. **Frontend**: Configure custom domain in your hosting provider
2. **Backend**: Set up custom domain with SSL certificate
3. **DNS**: Update DNS records to point to your hosting services

### CORS Configuration

Update the backend's CORS configuration:

```javascript
app.use(cors({
  origin: [
    'https://your-custom-domain.com',
    'https://www.your-custom-domain.com'
  ],
  credentials: true
}));
```

## 🔄 CI/CD Pipeline

### GitHub Actions Example

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install and build
        run: |
          cd frontend
          npm install
          npm run build
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        uses: railway/action@v0.1
        with:
          token: ${{ secrets.RAILWAY_TOKEN }}
```

## 🧪 Testing in Production

1. **Smoke Tests**: Verify all endpoints work correctly
2. **Load Testing**: Test the analyze endpoint with various code samples
3. **Error Handling**: Verify error responses and edge cases

## 💾 Backup Strategy

1. **Code**: Ensure code is version controlled in Git
2. **Logs**: Configure log retention and backup
3. **Configuration**: Backup environment variables and configurations

## 📊 Scaling Considerations

1. **Backend Scaling**: 
   - Use load balancers for multiple instances
   - Consider serverless functions for the analyze endpoint
   - Implement caching for repeated analyses

2. **Frontend Scaling**:
   - Use CDN for global distribution
   - Implement service worker for offline functionality
   - Optimize for mobile devices

## 🚨 Troubleshooting

### Common Issues

1. **CORS Errors**: Check frontend and backend URLs match
2. **API Key Issues**: Verify Gemini API key is correctly set
3. **Build Failures**: Check Node.js versions and dependencies
4. **Memory Issues**: Monitor memory usage for large code analyses

### Health Checks

- Frontend: Check if the app loads and dark mode works
- Backend: Test `/health` and `/api/test` endpoints
- Integration: Test the full analyze flow with sample code

## 📞 Support

For deployment issues:
1. Check logs for error messages
2. Verify environment variables are set correctly
3. Test API endpoints independently
4. Review the troubleshooting section in README.md
