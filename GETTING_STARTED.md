# 🚀 Getting Started with CodeApproach Analyzer

Welcome! This guide will help you set up and run your CodeApproach Analyzer application.

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **Google Gemini API Key** - [Get one here](https://ai.google.dev/)
- **Git** (optional) - For version control

## ⚡ Quick Start (5 minutes)

### 1. Set Up Environment Variables

First, create your environment file:

```bash
# Copy the template
copy .env.example backend\.env

# Edit the file and add your Gemini API key
# GEMINI_API_KEY=your_actual_api_key_here
```

### 2. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies  
cd ../frontend
npm install
```

### 3. Start the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

### 4. Open Your Browser

Navigate to: `http://localhost:3000`

You should see the CodeApproach Analyzer interface! 🎉

## 🧪 Test Your Setup

1. **Backend Health Check:** Visit `http://localhost:5000/health`
2. **API Test:** Visit `http://localhost:5000/api/test`
3. **Full Test:** Try analyzing the example code in the frontend

## 📝 Example Usage

1. Click "Load Example" in the frontend
2. Click "Analyze Code"
3. Review the AI-generated analysis with:
   - Approach classification (brute force/better/optimal)
   - Time and space complexity
   - Areas for improvement
   - Optimized code suggestion
   - Detailed explanation

## 🛠️ Development Mode

### Backend Development
```bash
cd backend
npm run dev    # Starts with nodemon for auto-restart
npm test       # Run tests
```

### Frontend Development
```bash
cd frontend
npm start      # Starts development server
npm test       # Run tests
npm run build  # Build for production
```

## 🎨 Key Features

### For Users
- **Code Analysis**: Paste any code and get instant AI analysis
- **Complexity Analysis**: Get Big O notation for time and space
- **Optimization Suggestions**: Receive improved code solutions
- **Teaching Mode**: Step-by-step explanations for learning
- **Dark Mode**: Toggle between light and dark themes
- **Mobile Friendly**: Responsive design works on all devices

### For Developers
- **Modern Stack**: React + TypeScript + TailwindCSS + Node.js
- **AI Integration**: Google Gemini API for code analysis
- **Type Safety**: Full TypeScript support
- **Testing**: Jest test suites for both frontend and backend
- **Code Quality**: ESLint and Prettier configurations
- **Deployment Ready**: Easy deployment to various platforms

## 🔧 Configuration Options

### Frontend Environment Variables (Optional)
```env
REACT_APP_API_URL=http://localhost:5000  # Backend URL
```

### Backend Environment Variables
```env
GEMINI_API_KEY=your_api_key              # Required
PORT=5000                                # Optional
NODE_ENV=development                     # Optional
FRONTEND_URL=http://localhost:3000       # For CORS
```

## 📚 Supported Languages

The analyzer works with any programming language, but examples focus on:
- JavaScript/TypeScript
- Python
- Java
- C++
- And more!

## 🚨 Troubleshooting

### Common Issues

**Backend won't start:**
- Check if your Gemini API key is set correctly
- Ensure port 5000 is not in use
- Run `npm install` in the backend directory

**Frontend won't connect:**
- Verify the backend is running on port 5000
- Check browser console for CORS errors
- Ensure both servers are running

**Analysis fails:**
- Verify your Gemini API key is valid
- Check your internet connection
- Try with smaller code samples first

### Get Help

1. Check the console logs for error messages
2. Review the full README.md for detailed documentation
3. Verify all environment variables are set correctly

## 🎯 Next Steps

### Immediate Tasks
1. ✅ Get the application running
2. ✅ Test with the example code
3. ✅ Try analyzing your own code
4. ✅ Explore the dark mode toggle

### Advanced Usage
1. 📖 Read the full README.md
2. 🚀 Check out DEPLOYMENT.md for production setup
3. 🧪 Run the test suites
4. 🎨 Customize the UI to your preferences

### Contributing
1. 🐛 Report bugs or suggest features
2. 🔧 Make improvements to the code
3. 📚 Help improve documentation
4. 🌟 Share the project with others

## 📞 Support

- **Documentation**: Check README.md and DEPLOYMENT.md
- **Issues**: Create detailed bug reports with steps to reproduce
- **Features**: Suggest new features with use cases
- **Questions**: Include your environment details and error messages

---

**Happy Coding!** 🎉

The CodeApproach Analyzer is designed to help you learn and improve your programming skills through AI-powered code analysis. Whether you're a beginner learning algorithms or an experienced developer optimizing performance, this tool provides valuable insights into your code's efficiency and potential improvements.

Start by analyzing the example code, then try it with your own algorithms to see what optimizations the AI suggests!
