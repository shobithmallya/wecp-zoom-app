const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { apiKey, ...body } = req.body;
  const apiUrl = 'https://api.wecreateproblems.com/ats/wecp/createInterview';

  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to create interview', details: error.response ? error.response.data : error.message });
  }
};
