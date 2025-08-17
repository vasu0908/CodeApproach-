import React, { useState } from 'react';
import { AnalysisResultsProps } from '../types';
import {
  Target,
  Clock,
  Database,
  AlertTriangle,
  Code2,
  BookOpen,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Zap,
  Award,
  TrendingUp,
  Brain
} from 'lucide-react';

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, darkMode }) => {
  const [copiedCode, setCopiedCode] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    approach: true,
    complexity: true,
    weaknesses: true,
    optimal: true,
    explanation: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  };

  const copyOptimalCode = async () => {
    try {
      await navigator.clipboard.writeText(result.optimalCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getApproachColor = (approach: string) => {
    switch (approach.toLowerCase()) {
      case 'brute force':
        return 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300 dark:border-red-800';
      case 'better':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-300 dark:border-yellow-800';
      case 'optimal':
        return 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600';
    }
  };

  const getApproachIcon = (approach: string) => {
    switch (approach.toLowerCase()) {
      case 'optimal':
        return '🎯';
      case 'better':
        return '⚡';
      case 'brute force':
        return '🐌';
      default:
        return '❓';
    }
  };

  const formatComplexity = (complexity: string) => {
    return complexity.replace(/O\(([^)]+)\)/g, '<code class="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded text-sm">O($1)</code>');
  };

  const Section: React.FC<{
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    sectionKey: string;
    defaultExpanded?: boolean;
  }> = ({ title, icon, children, sectionKey, defaultExpanded = true }) => {
    const isExpanded = expandedSections[sectionKey as keyof typeof expandedSections];
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            {icon}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        {isExpanded && (
          <div className="p-6 animate-slide-up">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header with AI Branding */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-2xl" />
        <div className="relative bg-white/40 dark:bg-gray-800/40 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl p-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-75" />
              <div className="relative bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30">
                <Brain className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Analysis Complete
              </h2>
              <Sparkles className="h-6 w-6 text-yellow-500 animate-pulse" />
            </div>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 font-medium">
            Here's what our advanced AI discovered about your code
          </p>
          <div className="flex items-center justify-center space-x-4 mt-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Analysis Complete</span>
            </div>
            <div className="flex items-center space-x-1">
            </div>
          </div>
        </div>
      </div>

      {/* Approach Detection Card */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl" />
        <div className="relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl overflow-hidden">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20" />
            <div className="relative px-6 py-4 border-b border-white/20 dark:border-gray-700/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg shadow-lg">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Approach Classification
                </h3>
                <Award className="h-5 w-5 text-yellow-500" />
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{getApproachIcon(result.approach)}</div>
              <div className="flex-1">
                <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-2xl text-lg font-bold border-2 ${getApproachColor(result.approach)} shadow-lg`}>
                  <span>{result.approach.charAt(0).toUpperCase() + result.approach.slice(1)}</span>
                  {result.approach.toLowerCase() === 'optimal' && <Award className="h-5 w-5" />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time & Space Complexity */}
      <Section
        title="Complexity Analysis"
        icon={<Clock className="h-5 w-5 text-primary-600 dark:text-primary-400" />}
        sectionKey="complexity"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <h4 className="font-semibold text-blue-900 dark:text-blue-100">Time Complexity</h4>
            </div>
            <div 
              className="text-blue-800 dark:text-blue-200" 
              dangerouslySetInnerHTML={{ __html: formatComplexity(result.timeComplexity) }}
            />
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <div className="flex items-center space-x-2 mb-2">
              <Database className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <h4 className="font-semibold text-purple-900 dark:text-purple-100">Space Complexity</h4>
            </div>
            <div 
              className="text-purple-800 dark:text-purple-200" 
              dangerouslySetInnerHTML={{ __html: formatComplexity(result.spaceComplexity) }}
            />
          </div>
        </div>
      </Section>

      {/* Weaknesses */}
      <Section
        title="Areas for Improvement"
        icon={<AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-400" />}
        sectionKey="weaknesses"
      >
        <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {result.weaknesses}
          </p>
        </div>
      </Section>

      {/* Optimal Code */}
      <Section
        title="Suggested Optimal Solution"
        icon={<Code2 className="h-5 w-5 text-green-600 dark:text-green-400" />}
        sectionKey="optimal"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Here's an optimized version of your code:
            </p>
            <button
              onClick={copyOptimalCode}
              className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors duration-200"
            >
              {copiedCode ? (
                <>
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <pre className="p-4 overflow-x-auto text-sm">
              <code className="language-javascript">
                {result.optimalCode}
              </code>
            </pre>
          </div>
        </div>
      </Section>

      {/* Explanation */}
      <Section
        title="Step-by-Step Explanation"
        icon={<BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />}
        sectionKey="explanation"
      >
        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg border border-indigo-200 dark:border-indigo-800">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {result.explanation}
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};

export default AnalysisResults;
