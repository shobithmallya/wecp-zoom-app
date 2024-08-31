import React from 'react';

interface InterviewDetailsProps {
  data: any;
}

const InterviewDetails: React.FC<InterviewDetailsProps> = ({ data }) => {
  return (
    <div>
      <h2>Interview Scheduled Successfully</h2>
      <h3>Interview Details:</h3>
      <p>Interview ID: {data.interviewId}</p>
      <p>Name: {data.name}</p>
      <p>Created At: {new Date(data.createdAt).toLocaleString()}</p>
      <p>Record Interview: {data.recordInterview ? 'Yes' : 'No'}</p>
      
      <h3>Schedule Details:</h3>
      <p>Schedule ID: {data.scheduleDetails._id}</p>
      <p>User Email: {data.scheduleDetails.user}</p>
      <p>Interview Duration: {data.scheduleDetails.interviewDuration} minutes</p>
      <p>Interviewer: {data.scheduleDetails.interviewer}</p>
      <p>Interview Time: {new Date(data.scheduleDetails.interviewTime).toLocaleString()}</p>
      <p>Interview Link: <a href={data.scheduleDetails.link} target="_blank" rel="noopener noreferrer">{data.scheduleDetails.link}</a></p>
    </div>
  );
};

export default InterviewDetails;
