import React from 'react';

interface Props {
  link: string;
}

const InterviewLink: React.FC<Props> = ({ link }) => {
  return (
    <div>
      <p>Interview scheduled successfully!</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        Open Interview
      </a>
    </div>
  );
};

export default InterviewLink;
