const { GoogleGenerativeAI } = require('@google/generative-ai');
const { detectLanguage, getLanguageInfo } = require('../utils/languageDetector');

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Validation function
const validateCodeInput = (code) => {
  if (!code || typeof code !== 'string' || code.trim().length === 0) {
    return { valid: false, error: 'Code is required and must be a non-empty string' };
  }
  
  if (code.length > 50000) {
    return { valid: false, error: 'Code must be less than 50,000 characters' };
  }
  
  return { valid: true };
};

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
    const { code, problemStatement = '' } = req.body;
    
    // Validate input
    const validation = validateCodeInput(code);
    if (!validation.valid) {
      return res.status(400).json({
        error: 'Invalid input',
        message: validation.error
      });
    }
    
    // Detect programming language
    const languageDetection = detectLanguage(code);
    const languageInfo = getLanguageInfo(languageDetection.language);
    
    console.log(`Detected language: ${languageInfo.name} (confidence: ${(languageDetection.confidence * 100).toFixed(1)}%)`);
    
    // Construct the prompt for Gemini
    const prompt = `
You are an expert software engineer and computer science tutor. Analyze the following ${languageInfo.name} code and provide a comprehensive analysis.

${problemStatement ? `Problem Statement: ${problemStatement}` : ''}

Programming Language: ${languageInfo.name}
Code to analyze:
\`\`\`${languageDetection.language}
${code}
\`\`\`

Please provide your analysis in the following JSON format (return ONLY valid JSON, no additional text):

{
  "approach": "brute force" | "better" | "optimal",
  "timeComplexity": "Big O notation (e.g., O(n^2))",
  "spaceComplexity": "Big O notation (e.g., O(1))",
  "weaknesses": "Detailed explanation of inefficiencies and issues in the current code",
  "optimalCode": "If not already optimal, provide clean, optimized code. If already optimal, return the same code with minor improvements if any.",
  "explanation": "Step-by-step teaching explanation of why the optimal solution works, including complexity analysis and key insights"
}

Analysis Guidelines:
1. **Approach Classification**:
   - "brute force": Inefficient, straightforward approach with high time/space complexity
   - "better": Improved but not optimal approach
   - "optimal": Best possible approach for the given problem

2. **Complexity Analysis**: Consider both average and worst-case scenarios

3. **Weaknesses**: Be specific about:
   - Unnecessary iterations or computations
   - Inefficient data structures
   - Redundant operations
   - Memory usage issues

4. **Optimal Code**: 
   - Use appropriate data structures
   - Minimize time and space complexity
   - Include clear variable names and comments
   - Follow best practices

5. **Explanation**: 
   - Explain the algorithmic approach
   - Justify complexity analysis
   - Highlight key optimizations
   - Use teaching-friendly language

Return only the JSON object, no additional formatting or text.
`;

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Parse the JSON response
    let analysisResult;
    try {
      // Clean the response text to extract JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      console.error('Raw Response:', text);
      
      // Fallback response if parsing fails
      analysisResult = {
        approach: "analysis_failed",
        timeComplexity: "Unable to determine",
        spaceComplexity: "Unable to determine",
        weaknesses: "Analysis could not be completed due to parsing error. Please try again.",
        optimalCode: code,
        explanation: "The AI analysis encountered an error. Please verify your code syntax and try again."
      };
    }
    
    // Validate the response structure
    const requiredFields = ['approach', 'timeComplexity', 'spaceComplexity', 'weaknesses', 'optimalCode', 'explanation'];
    for (const field of requiredFields) {
      if (!analysisResult[field]) {
        analysisResult[field] = 'Not provided';
      }
    }
    
    res.json({
      success: true,
      analysis: analysisResult,
      languageDetection: {
        detectedLanguage: languageDetection.language,
        confidence: languageDetection.confidence,
        name: languageInfo.name,
        icon: languageInfo.icon,
        color: languageInfo.color,
        monacoLanguage: languageInfo.monacoLanguage
      },
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Analysis Error:', error);
    
    // Handle different types of errors
    let errorMessage = 'Failed to analyze code';
    let statusCode = 500;
    
    if (error.message.includes('API key')) {
      errorMessage = 'AI service configuration error';
      statusCode = 503;
    } else if (error.message.includes('quota') || error.message.includes('limit')) {
      errorMessage = 'Service temporarily unavailable due to rate limits';
      statusCode = 429;
    } else if (error.message.includes('timeout')) {
      errorMessage = 'Analysis request timed out';
      statusCode = 408;
    }
    
    res.status(statusCode).json({
      success: false,
      error: errorMessage,
      message: 'Please try again later or contact support if the issue persists',
      timestamp: new Date().toISOString()
    });
  }
};
