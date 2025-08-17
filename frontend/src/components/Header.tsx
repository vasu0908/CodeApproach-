import React from 'react';
import { HeaderProps } from '../types';
import { Moon, Sun, Code, Trash2, Sparkles, Zap } from 'lucide-react';

const Header: React.FC<HeaderProps> = ({ darkMode, onToggleDarkMode, onClearAll }) => {
  return (
    <header className="relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      <div className="relative container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl blur opacity-75" />
              <div className="relative bg-white/10 backdrop-blur-sm p-3 rounded-xl border border-white/20">
                <Code className="h-8 w-8 text-white" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-3xl font-bold text-white">
                  CodeApproach
                </h1>
                <div className="flex items-center space-x-1 px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm font-medium text-white">AI</span>
                </div>
              </div>
              <p className="text-blue-100 text-sm mt-1 flex items-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Intelligent code optimization analysis</span>
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-3">
            {/* Clear All Button */}
            <button
              onClick={onClearAll}
              className="group flex items-center space-x-2 px-4 py-2.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 transition-all duration-200 hover:scale-105"
              title="Clear all inputs and results"
            >
              <Trash2 className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">Clear All</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="group p-2.5 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-105"
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-200 group-hover:-rotate-12 transition-transform duration-500" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Subtitle */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <p className="text-white text-sm font-medium">
              Paste your code below for instant AI-powered analysis and optimization suggestions
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
