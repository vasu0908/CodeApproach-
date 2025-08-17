export interface AnalysisResult {
  approach: 'brute force' | 'better' | 'optimal' | 'analysis_failed';
  timeComplexity: string;
  spaceComplexity: string;
  weaknesses: string;
  optimalCode: string;
  explanation: string;
}

export interface LanguageDetection {
  detectedLanguage: string;
  confidence: number;
  name: string;
  icon: string;
  color: string;
  monacoLanguage: string;
}

export interface AnalysisResponse {
  success: boolean;
  analysis?: AnalysisResult;
  languageDetection?: LanguageDetection;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  problemStatement: string;
  onProblemStatementChange: (statement: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  darkMode: boolean;
  languageDetection?: LanguageDetection;
}

export interface AnalysisResultsProps {
  result: AnalysisResult;
  darkMode: boolean;
}

export interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onClearAll: () => void;
}
