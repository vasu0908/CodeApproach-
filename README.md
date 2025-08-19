# CodeApproach Analyzer

A modern web application that analyzes code to detect optimization approaches, computes complexity, and suggests optimal solutions using AI.

## 🚀 Features

- **Code Analysis**: Detects whether code is brute force, better, or optimal
- **Complexity Analysis**: Computes time and space complexity
- **Optimization Suggestions**: Provides optimal solutions with explanations
- **Modern UI**: React with TailwindCSS, dark/light mode, syntax highlighting
- **AI-Powered**: Uses Google Gemini API for intelligent code analysis

## 📁 Project Structure

```
cca/
├── frontend/          # React application
├── backend/           # Node.js Express server
├── README.md         # This file
└── .env.example      # Environment variables template
```

## 🛠️ Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Gemini API key

## 🚀 Quick Start

### 1. Clone and Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd cca

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env and add your Google Gemini API key
# GEMINI_API_KEY=your_api_key_here
```

### 3. Run the Application

```bash
# Terminal 1 - Start backend server
cd backend
npm run dev

# Terminal 2 - Start frontend development server
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔧 Development

### Backend
- Built with Node.js and Express
- Uses Google Gemini API for code analysis
- CORS enabled for frontend communication
- Structured JSON responses

### Frontend
- React with modern hooks
- TailwindCSS for styling
- Monaco Editor for code input
- Prism.js for syntax highlighting
- Dark/light mode support
- Responsive design

## 🌐 Deployment

### Backend Deployment (Node.js hosting)
1. Set environment variables on your hosting platform
2. Deploy the `backend/` directory
3. Ensure Node.js runtime is available

### Frontend Deployment (Static hosting)
1. Build the production version: `npm run build`
2. Deploy the `build/` directory to any static hosting service
3. Update API endpoints to point to your deployed backend

### Environment Variables

Create a `.env` file in the backend directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
NODE_ENV=production
```



## 🎨 UI Features

- **Modern Design**: Clean, card-based layout with shadows and animations
- **Code Editor**: Monaco Editor with syntax highlighting
- **Responsive**: Works on desktop, tablet, and mobile
- **Dark Mode**: Toggle between light and dark themes
- **Copy to Clipboard**: Easy copying of suggested optimal code
- **Loading States**: Visual feedback during analysis
- **Error Handling**: User-friendly error messages

## 🧪 Testing

```bash
# Run backend tests
cd backend
npm test

# Run frontend tests
cd frontend
npm test
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

1. **API Key Issues**: Ensure your Gemini API key is correctly set in the .env file
2. **CORS Errors**: Make sure the backend server is running on the correct port
3. **Build Errors**: Check that all dependencies are installed with compatible versions

### Getting Help

- Check the console for error messages
- Verify environment variables are set correctly
- Ensure both frontend and backend servers are running

