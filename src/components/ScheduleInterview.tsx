import React from 'react';
import axios from 'axios';

interface ScheduleInterviewProps {
  apiKey: string;
  onSchedule: (link: string) => void;
}

const ScheduleInterview: React.FC<ScheduleInterviewProps> = ({ apiKey, onSchedule }) => {
  const handleSchedule = async () => {
    try {
      console.log('Creating interview...');
      
      const response = await axios.post(
        '/api/proxy',
        {
          apiKey,
          interviewName: "Zoom Interview",
          groupId: "11ee0f93-d7c4-4eed-8def-e5ae47ac63ae",
          recordInterview: true,
          scorecard: [
            // ... your scorecard data
          ]
        }
      );

      if (response.data && response.data.interviewLink) {
        onSchedule(response.data.interviewLink);
      } else {
        console.error('Invalid response from API:', response.data);
      }
    } catch (error) {
      console.error('Error scheduling interview:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response?.data);
        console.error('Axios error status:', error.response?.status);
        console.error('Axios error headers:', error.response?.headers);
      }
    }
  };

  return (
    <div>
      <button onClick={handleSchedule}>Schedule Interview</button>
    </div>
  );
};

export default ScheduleInterview;