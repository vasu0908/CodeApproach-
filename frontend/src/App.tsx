import React, { useState, useEffect, useCallback } from 'react';
import CodeEditor from './components/CodeEditor';
import AnalysisResults from './components/AnalysisResults';
import Header from './components/Header';
import { AnalysisResult, LanguageDetection } from './types';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [problemStatement, setProblemStatement] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [languageDetection, setLanguageDetection] = useState<LanguageDetection | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true); // Start with dark mode

  // Check for saved dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    } else {
      // Default to system preference
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Real-time language detection
  const detectLanguage = useCallback(async (codeToDetect: string) => {
    if (!codeToDetect.trim()) {
      setLanguageDetection(undefined);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/detect-language`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: codeToDetect }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setLanguageDetection(data.detection);
        }
      }
    } catch (err) {
      // Silent fail for language detection
      console.log('Language detection failed:', err);
    }
  }, []);

  // Debounced language detection
  useEffect(() => {
    const timer = setTimeout(() => {
      detectLanguage(code);
    }, 500);

    return () => clearTimeout(timer);
  }, [code, detectLanguage]);

  const handleAnalyze = async () => {
    if (!code.trim()) {
      setError('Please enter some code to analyze');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          problemStatement: problemStatement.trim() || undefined
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Analysis failed');
      }

      if (data.success) {
        setAnalysisResult(data.analysis);
        if (data.languageDetection) {
          setLanguageDetection(data.languageDetection);
        }
      } else {
        throw new Error(data.error || 'Analysis failed');
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(err instanceof Error ? err.message : 'Failed to analyze code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearAll = () => {
    setCode('');
    setProblemStatement('');
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
    }`}>
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/5 rounded-full blur-3xl animate-pulse" />
      </div>
      <Header 
        darkMode={darkMode} 
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onClearAll={handleClearAll}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          {/* Input Section */}
          <div className="animate-fade-in">
            <CodeEditor
              code={code}
              onCodeChange={setCode}
              problemStatement={problemStatement}
              onProblemStatementChange={setProblemStatement}
              onAnalyze={handleAnalyze}
              isLoading={isLoading}
              darkMode={darkMode}
              languageDetection={languageDetection}
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="animate-slide-up bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                    Analysis Error
                  </h3>
                  <div className="mt-1 text-sm text-red-700 dark:text-red-300">
                    {error}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results Section */}
          {analysisResult && (
            <div className="animate-slide-up">
              <AnalysisResults 
                result={analysisResult} 
                darkMode={darkMode}
              />
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="animate-fade-in flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                  Analyzing your code...
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                  This may take a few moments
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
