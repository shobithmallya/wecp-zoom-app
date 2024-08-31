import React, { useState } from 'react';

interface Props {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<Props> = ({ onApiKeySubmit }) => {
  const [inputApiKey, setInputApiKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApiKeySubmit(inputApiKey);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputApiKey}
        onChange={(e) => setInputApiKey(e.target.value)}
        placeholder="Enter your WeCP API key"
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApiKeyInput;
