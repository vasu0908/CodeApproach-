const { detectLanguage, getLanguageInfo } = require('../utils/languageDetector');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests'
    });
  }

  try {
    const { code } = req.body;
    
    if (!code || typeof code !== 'string') {
      return res.status(400).json({
        error: 'Invalid input',
        message: 'Code is required and must be a string'
      });
    }
    
    const languageDetection = detectLanguage(code);
    const languageInfo = getLanguageInfo(languageDetection.language);
    
    res.json({
      success: true,
      detection: {
        detectedLanguage: languageDetection.language,
        confidence: languageDetection.confidence,
        name: languageInfo.name,
        icon: languageInfo.icon,
        color: languageInfo.color,
        monacoLanguage: languageInfo.monacoLanguage,
        allScores: languageDetection.allScores
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Language detection error:', error);
    res.status(500).json({
      success: false,
      error: 'Language detection failed',
      message: error.message
    });
  }
};
