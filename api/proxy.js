const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { apiKey, action, ...body } = req.body;
  let apiUrl;

  if (action === 'create') {
    apiUrl = 'https://api.wecreateproblems.com/ats/wecp/createInterview';
  } else if (action === 'schedule') {
    const { orgName, groupId, interviewId } = body;
    apiUrl = `https://api.wecreateproblems.com/orgs/${orgName}/groups/${groupId}/interviews/${interviewId}/scheduleInterviews`;
  } else {
    return res.status(400).json({ error: 'Invalid action' });
  }

  console.log(`Making ${action} request to: ${apiUrl}`);
  console.log('Request body:', body);

  try {
    const response = await axios.post(apiUrl, body, {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
    });

    console.log(`${action} API response:`, response.data);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(`Error in ${action} API:`, error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'API request failed', details: error.response ? error.response.data : error.message });
  }
};
