import React, { useState } from 'react';
import axios from 'axios';

interface ScheduleInterviewProps {
  apiKey: string;
  onSchedule: (interviewData: any) => void;
}

const ScheduleInterview: React.FC<ScheduleInterviewProps> = ({ apiKey, onSchedule }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSchedule = async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Step 1: Create Interview
      console.log('Creating interview...');
      const createResponse = await axios.post('/api/proxy', {
        action: 'create',
        apiKey,
        interviewName: "Zoom Interview",
        groupId: "11ee0f93-d7c4-4eed-8def-e5ae47ac63ae",
        recordInterview: true,
        scorecard: [
          // ... your scorecard data
        ]
      });

      if (createResponse.data && createResponse.data.interviewId) {
        console.log('Interview created successfully:', createResponse.data);

        // Step 2: Schedule Interview
        console.log('Scheduling interview...');
        const scheduleData = {
          action: 'schedule',
          apiKey,
          orgName: 'wecreateproblems-shobith', // Replace with your org name
          groupId: "11ee0f93-d7c4-4eed-8def-e5ae47ac63ae",
          interviewId: createResponse.data.interviewId,
          sendEmail: false,
          schedules: [
            {
              emailId: "user@example.com", // Replace with actual email
              interviewDuration: 30,
              interviewer: "admin@wecreateproblems.com", // Replace with actual interviewer email
              interviewTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Schedule for tomorrow
            }
          ]
        };
        console.log('Schedule request data:', scheduleData);

        const scheduleResponse = await axios.post('/api/proxy', scheduleData);

        console.log('Schedule API response:', scheduleResponse.data);

        if (scheduleResponse.data && scheduleResponse.data.length > 0) {
          console.log('Interview scheduled successfully:', scheduleResponse.data);
          onSchedule({
            ...createResponse.data,
            scheduleDetails: scheduleResponse.data[0]
          });
        } else {
          console.error('Invalid response from schedule API:', scheduleResponse.data);
          setError('Failed to schedule interview. Please check the console for details.');
        }
      } else {
        console.error('Invalid response from create API:', createResponse.data);
        setError('Failed to create interview. Please check the console for details.');
      }
    } catch (error) {
      console.error('Error scheduling interview:', error);
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', error.response?.data);
        console.error('Axios error status:', error.response?.status);
        console.error('Axios error headers:', error.response?.headers);
        setError(`Error: ${error.response?.data?.errorMessage || error.message}`);
      } else {
        setError('An unexpected error occurred. Please check the console for details.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleSchedule} disabled={isLoading}>
        {isLoading ? 'Scheduling...' : 'Schedule Interview'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ScheduleInterview;