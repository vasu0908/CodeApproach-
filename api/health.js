module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'This endpoint only accepts GET requests'
    });
  }

  const hasApiKey = !!process.env.GEMINI_API_KEY;

  res.status(200).json({
    status: 'OK',
    message: 'CodeApproach Analyzer API is running on Vercel',
    geminiConfigured: hasApiKey,
    timestamp: new Date().toISOString(),
    environment: 'vercel'
  });
};
