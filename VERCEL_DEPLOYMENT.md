# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Google Gemini API Key**: Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

## Step-by-Step Deployment

### 1. Login to Vercel

```bash
vercel login
```

Follow the authentication prompts to connect your Vercel account.

### 2. Deploy the Application

```bash
vercel --prod
```

This will:
- Set up your project on Vercel
- Deploy both frontend and API endpoints
- Provide you with a live URL

### 3. Configure Environment Variables

After deployment, you need to add your environment variables:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `codeapproach-analyzer` project
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your Google Gemini API key
   - **Environments**: Production, Preview, Development

### 4. Redeploy with Environment Variables

```bash
vercel --prod --force
```

This ensures your environment variables are applied.

## API Endpoints

Once deployed, your API will be available at:

- `https://your-app.vercel.app/api/analyze` - Code analysis endpoint
- `https://your-app.vercel.app/api/detect-language` - Language detection
- `https://your-app.vercel.app/api/health` - Health check

## Frontend

Your React frontend will be available at:
- `https://your-app.vercel.app`

## Testing the Deployment

### Test the API Health Check

```bash
curl https://your-app.vercel.app/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "CodeApproach Analyzer API is running on Vercel",
  "geminiConfigured": true,
  "timestamp": "2024-01-01T12:00:00.000Z",
  "environment": "vercel"
}
```

### Test Code Analysis

```bash
curl -X POST https://your-app.vercel.app/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "code": "function fibonacci(n) { if (n <= 1) return n; return fibonacci(n-1) + fibonacci(n-2); }",
    "problemStatement": "Calculate nth Fibonacci number"
  }'
```

## Troubleshooting

### Common Issues

1. **Environment Variables Not Working**
   - Ensure you've added `GEMINI_API_KEY` in Vercel dashboard
   - Redeploy after adding environment variables

2. **API Endpoints Not Working**
   - Check that files are in the `/api` directory
   - Ensure functions are properly exported

3. **CORS Issues**
   - CORS headers are set in each API function
   - Frontend should work seamlessly with the API

### Updating Your Deployment

To update your deployment with new changes:

```bash
git add .
git commit -m "Update deployment"
git push
vercel --prod
```

Or simply:
```bash
vercel --prod
```

## Local Development

To test your Vercel functions locally:

```bash
vercel dev
```

This will start a local development server that mimics Vercel's environment.

## Project Structure

```
CodeApproach-/
├── api/                    # Vercel serverless functions
│   ├── analyze.js         # Main analysis endpoint
│   ├── detect-language.js # Language detection
│   └── health.js          # Health check
├── utils/                 # Shared utilities
│   └── languageDetector.js
├── frontend/              # React application
├── vercel.json           # Vercel configuration
├── package.json          # Dependencies
└── VERCEL_DEPLOYMENT.md  # This guide
```

## Next Steps

1. Complete the Vercel login process
2. Deploy using `vercel --prod`
3. Configure environment variables in Vercel dashboard
4. Test your deployed application
5. Update your frontend to use the new API endpoints

Your application will be live at `https://your-project-name.vercel.app`!
