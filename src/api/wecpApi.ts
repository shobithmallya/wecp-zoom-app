import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const createInterview = async (apiKey: string) => {
  const url = `${API_BASE_URL}/ats/wecp/createInterview`;
  console.log('Creating interview with URL:', url);
  try {
    const response = await axios.post(url, {
      interviewName: "Zoom Interview",
      groupId: "11ee0f93-d7c4-4eed-8def-e5ae47ac63ae",
      recordInterview: true,
      scorecard: [
        {
          question: "Technical Skills and Domain Knowledge",
          required: true,
          type_of_question: "star"
        },
        {
          question: "Communication Skills",
          required: true,
          type_of_question: "star"
        },
        {
          option: ["Selected", "Rejected", "On Hold"],
          question: "Interview Outcome / Decision",
          required: false,
          type_of_question: "objective"
        },
        {
          question: "Overall observations",
          required: false,
          type_of_question: "text"
        }
      ]
    }, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    console.log('Create interview response:', JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error) {
    console.error('Error creating interview:', error);
    throw error;
  }
};

export const scheduleInterview = async (apiKey: string, interviewId: string) => {
  const url = `${API_BASE_URL}/ats/wecp/scheduleInterviews`;
  console.log('Scheduling interview with URL:', url);
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0); // Set to 10:00 AM tomorrow

  const requestBody = {
    sendEmail: false,
    interviewId: interviewId,
    schedules: [
      {
        emailId: "candidate@example.com",
        interviewDuration: 30,
        interviewer: "interviewer@example.com",
        interviewTime: tomorrow.toISOString()
      }
    ]
  };
  
  console.log('Schedule interview request body:', JSON.stringify(requestBody, null, 2));

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json'
      }
    });
    console.log('Schedule interview response:', JSON.stringify(response.data, null, 2));
    if (Array.isArray(response.data) && response.data.length === 0) {
      throw new Error('API returned an empty array');
    }
    return response.data;
  } catch (error) {
    console.error('Error scheduling interview:', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
};
