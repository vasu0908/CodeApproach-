const detectLanguage = (code) => {
  // Remove whitespace and comments for better detection
  const cleanCode = code.trim().toLowerCase();
  
  // Language patterns and keywords
  const patterns = {
    javascript: {
      keywords: ['function', 'const', 'let', 'var', 'console.log', '=>', 'require', 'import', 'export'],
      patterns: [
        /function\s+\w+\s*\(/,
        /const\s+\w+\s*=/,
        /let\s+\w+\s*=/,
        /var\s+\w+\s*=/,
        /console\.log\s*\(/,
        /=>\s*{?/,
        /require\s*\(/,
        /import\s+.*from/,
        /export\s+(default\s+)?/
      ],
      extensions: ['.js', '.jsx', '.mjs']
    },
    python: {
      keywords: ['def', 'import', 'from', 'class', 'if __name__', 'print', 'return', 'elif', 'except'],
      patterns: [
        /def\s+\w+\s*\(/,
        /import\s+\w+/,
        /from\s+\w+\s+import/,
        /class\s+\w+/,
        /if\s+__name__\s*==\s*['"]__main__['"]/,
        /print\s*\(/,
        /elif\s+/,
        /except\s+/,
        /:\s*$/m
      ],
      extensions: ['.py']
    },
    java: {
      keywords: ['public class', 'private', 'public', 'static', 'void', 'main', 'System.out'],
      patterns: [
        /public\s+class\s+\w+/,
        /private\s+\w+/,
        /public\s+\w+/,
        /static\s+void\s+main/,
        /System\.out\.print/,
        /\w+\s+\w+\s*\([^)]*\)\s*{/,
        /import\s+java\./
      ],
      extensions: ['.java']
    },
    cpp: {
      keywords: ['#include', 'using namespace', 'int main', 'cout', 'cin', 'std::'],
      patterns: [
        /#include\s*<[^>]+>/,
        /using\s+namespace\s+std/,
        /int\s+main\s*\(/,
        /cout\s*<<|std::cout/,
        /cin\s*>>|std::cin/,
        /std::/,
        /#define\s+/
      ],
      extensions: ['.cpp', '.cc', '.cxx']
    },
    c: {
      keywords: ['#include', 'int main', 'printf', 'scanf', 'malloc', 'free'],
      patterns: [
        /#include\s*<[^>]+\.h>/,
        /int\s+main\s*\(/,
        /printf\s*\(/,
        /scanf\s*\(/,
        /malloc\s*\(/,
        /free\s*\(/
      ],
      extensions: ['.c', '.h']
    },
    typescript: {
      keywords: ['interface', 'type', 'enum', 'declare', 'namespace'],
      patterns: [
        /interface\s+\w+/,
        /type\s+\w+\s*=/,
        /enum\s+\w+/,
        /declare\s+/,
        /namespace\s+\w+/,
        /:\s*\w+(\[\])?(\s*\|\s*\w+)*\s*[=;]/,
        /function\s+\w+\s*\([^)]*\):\s*\w+/
      ],
      extensions: ['.ts', '.tsx']
    },
    go: {
      keywords: ['package main', 'func', 'import', 'fmt.Print', 'var', 'type'],
      patterns: [
        /package\s+main/,
        /func\s+\w+\s*\(/,
        /import\s+\(/,
        /fmt\.Print/,
        /var\s+\w+\s+\w+/,
        /type\s+\w+\s+struct/
      ],
      extensions: ['.go']
    },
    rust: {
      keywords: ['fn main', 'let', 'mut', 'println!', 'use', 'mod'],
      patterns: [
        /fn\s+main\s*\(/,
        /let\s+(mut\s+)?\w+/,
        /println!\s*\(/,
        /use\s+\w+/,
        /mod\s+\w+/,
        /impl\s+\w+/
      ],
      extensions: ['.rs']
    },
    php: {
      keywords: ['<?php', 'echo', '$', 'function', 'class', 'require'],
      patterns: [
        /<\?php/,
        /echo\s+/,
        /\$\w+/,
        /function\s+\w+\s*\(/,
        /class\s+\w+/,
        /require(_once)?\s*\(/
      ],
      extensions: ['.php']
    },
    csharp: {
      keywords: ['using System', 'namespace', 'class', 'static void Main', 'Console.Write'],
      patterns: [
        /using\s+System/,
        /namespace\s+\w+/,
        /class\s+\w+/,
        /static\s+void\s+Main/,
        /Console\.Write/,
        /\[.*\]/
      ],
      extensions: ['.cs']
    },
    ruby: {
      keywords: ['def', 'end', 'class', 'puts', 'require', 'include'],
      patterns: [
        /def\s+\w+/,
        /class\s+\w+/,
        /puts\s+/,
        /require\s+['"]/,
        /include\s+\w+/,
        /end\s*$/m
      ],
      extensions: ['.rb']
    }
  };

  const scores = {};
  
  // Initialize scores
  Object.keys(patterns).forEach(lang => {
    scores[lang] = 0;
  });

  // Check each language
  Object.entries(patterns).forEach(([language, config]) => {
    // Check keywords
    config.keywords.forEach(keyword => {
      if (cleanCode.includes(keyword.toLowerCase())) {
        scores[language] += 2;
      }
    });

    // Check patterns
    config.patterns.forEach(pattern => {
      if (pattern.test(code)) {
        scores[language] += 3;
      }
    });
  });

  // Special checks for common confusions
  
  // Distinguish between JavaScript and TypeScript
  if (scores.javascript > 0 && scores.typescript > 0) {
    if (/:\s*\w+/.test(code) || /interface\s+\w+/.test(code)) {
      scores.typescript += 5;
      scores.javascript -= 2;
    }
  }

  // Distinguish between C and C++
  if (scores.c > 0 && scores.cpp > 0) {
    if (code.includes('std::') || code.includes('using namespace') || code.includes('cout')) {
      scores.cpp += 5;
      scores.c -= 3;
    }
  }

  // Find the language with the highest score
  const detectedLanguage = Object.entries(scores).reduce((max, [lang, score]) => {
    return score > max.score ? { language: lang, score } : max;
  }, { language: 'javascript', score: 0 });

  // Return result with confidence
  return {
    language: detectedLanguage.language,
    confidence: Math.min(detectedLanguage.score / 10, 1),
    allScores: scores
  };
};

const getLanguageInfo = (language) => {
  const languageMap = {
    javascript: { name: 'JavaScript', icon: '🟨', color: '#f7df1e', monacoLanguage: 'javascript' },
    typescript: { name: 'TypeScript', icon: '🔷', color: '#3178c6', monacoLanguage: 'typescript' },
    python: { name: 'Python', icon: '🐍', color: '#3776ab', monacoLanguage: 'python' },
    java: { name: 'Java', icon: '☕', color: '#ed8b00', monacoLanguage: 'java' },
    cpp: { name: 'C++', icon: '⚡', color: '#00599c', monacoLanguage: 'cpp' },
    c: { name: 'C', icon: '🔧', color: '#a8b9cc', monacoLanguage: 'c' },
    go: { name: 'Go', icon: '🐹', color: '#00add8', monacoLanguage: 'go' },
    rust: { name: 'Rust', icon: '🦀', color: '#ce422b', monacoLanguage: 'rust' },
    php: { name: 'PHP', icon: '🐘', color: '#777bb4', monacoLanguage: 'php' },
    csharp: { name: 'C#', icon: '💜', color: '#239120', monacoLanguage: 'csharp' },
    ruby: { name: 'Ruby', icon: '💎', color: '#cc342d', monacoLanguage: 'ruby' }
  };

  return languageMap[language] || { name: 'Unknown', icon: '❓', color: '#666666', monacoLanguage: 'javascript' };
};

module.exports = {
  detectLanguage,
  getLanguageInfo
};
