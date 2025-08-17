import React from 'react';
import Editor from '@monaco-editor/react';
import { CodeEditorProps } from '../types';
import { Play, FileText, Code2, Lightbulb, Sparkles } from 'lucide-react';

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onCodeChange,
  problemStatement,
  onProblemStatementChange,
  onAnalyze,
  isLoading,
  darkMode,
  languageDetection
}) => {
  const handleEditorChange = (value: string | undefined) => {
    onCodeChange(value || '');
  };

  const exampleCode = `// Example: Two Sum Problem
function twoSum(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return [];
}`;

  const loadExample = () => {
    onCodeChange(exampleCode);
    onProblemStatementChange('Find two numbers in an array that add up to a target sum.');
  };

  return (
    <div className="relative">
      {/* Glassmorphism Container */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-2xl overflow-hidden">
        {/* Header with Gradient */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-600/20 dark:to-purple-600/20" />
          <div className="relative px-6 py-5 border-b border-white/20 dark:border-gray-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg">
                  <Code2 className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Code Input
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Paste or write your code for analysis
                  </p>
                </div>
              </div>
              <button
                onClick={loadExample}
                className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <Lightbulb className="h-4 w-4 group-hover:animate-pulse" />
                <span>Load Example</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Problem Statement */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <label htmlFor="problem-statement" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Problem Statement
              </label>
              <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                Optional
              </span>
            </div>
            <div className="relative">
              <textarea
                id="problem-statement"
                value={problemStatement}
                onChange={(e) => onProblemStatementChange(e.target.value)}
                placeholder="Describe the problem your code is solving... This helps provide better analysis"
                className="w-full px-4 py-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none transition-all duration-200 hover:bg-white/70 dark:hover:bg-gray-800/70"
                rows={3}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-xl pointer-events-none" />
            </div>
          </div>

          {/* Code Editor */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <label htmlFor="code-editor" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Your Code
              </label>
              {languageDetection && (
                <div className="flex items-center space-x-2 text-xs">
                  <div 
                    className={`w-2 h-2 rounded-full animate-pulse`}
                    style={{ backgroundColor: languageDetection.color }}
                  />
                  <div className="flex items-center space-x-1">
                    <span 
                      className="text-gray-700 dark:text-gray-300 font-medium"
                      style={{ color: languageDetection.color }}
                    >
                      {languageDetection.icon} {languageDetection.name}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      ({Math.round(languageDetection.confidence * 100)}%)
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl" />
              <div className="relative bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-xl overflow-hidden shadow-inner">
                <Editor
                  height="450px"
                  defaultLanguage={languageDetection?.monacoLanguage || "javascript"}
                  value={code}
                  onChange={handleEditorChange}
                  theme={darkMode ? 'vs-dark' : 'light'}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 15,
                    lineNumbers: 'on',
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2,
                    wordWrap: 'on',
                    folding: true,
                    lineNumbersMinChars: 3,
                    glyphMargin: false,
                    padding: { top: 16, bottom: 16 },
                    fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
                    fontLigatures: true,
                    cursorBlinking: 'smooth',
                    cursorSmoothCaretAnimation: 'on',
                    smoothScrolling: true,
                    scrollbar: {
                      vertical: 'auto',
                      horizontal: 'auto',
                      verticalScrollbarSize: 12,
                      horizontalScrollbarSize: 12
                    }
                  }}
                  loading={
                    <div className="flex items-center justify-center h-96 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-2" />
                        <div className="text-gray-600 dark:text-gray-400 font-medium">Loading editor...</div>
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              onClick={onAnalyze}
              disabled={isLoading || !code.trim()}
              className="group relative w-full overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl transform"
            >
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center space-x-3">
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span className="text-lg">Analyzing your code...</span>
                    <Sparkles className="h-5 w-5 animate-pulse" />
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    <span className="text-lg">Analyze Code</span>
                    <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  </>
                )}
              </div>
            </button>
          </div>

          {/* Enhanced Help Text */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-400/10 rounded-xl" />
            <div className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-3">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <p className="font-semibold text-gray-800 dark:text-gray-200">Pro Tips for Better Analysis</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Include complete functions or algorithms</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Add problem context for better insights</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Ensure syntactically correct code</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Focus on core algorithms, not boilerplate</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
