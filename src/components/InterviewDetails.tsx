import React from 'react';

interface InterviewDetailsProps {
  data: any;
}

const InterviewDetails: React.FC<InterviewDetailsProps> = ({ data }) => {
  return (
    <div>
      <h2>Interview Scheduled Successfully</h2>
      <p>Interview ID: {data.interviewId}</p>
      <p>Name: {data.name}</p>
      <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
      <p>Record Interview: {data.recordInterview ? 'Yes' : 'No'}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default InterviewDetails;
