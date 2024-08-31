import React, { useEffect, useState } from 'react';
import './App.css';
import zoomSdk from './zoomSdk';
import ApiKeyInput from './components/ApiKeyInput';
import ScheduleInterview from './components/ScheduleInterview';
import InterviewDetails from './components/InterviewDetails';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [interviewData, setInterviewData] = useState<any | null>(null);
  const [isZoomInitialized, setIsZoomInitialized] = useState(false);

  useEffect(() => {
    const initializeZoom = async () => {
      try {
        console.log('Configuring Zoom SDK...');
        const configResponse = await zoomSdk.config({
          version: '0.16.22',
          capabilities: [
            'getRunningContext',
            'connect',
            'postMessage',
            'onMessage',
            'authorize'
          ],
        });
        console.log('Zoom SDK configured:', configResponse);
        
        setIsZoomInitialized(true);
      } catch (error) {
        console.error('Failed to initialize Zoom SDK:', error);
        if (error instanceof Error) {
          console.error('Error message:', error.message);
          console.error('Error stack:', error.stack);
        }
      }
    };

    initializeZoom();
  }, []);

  if (!isZoomInitialized) {
    return <div>Initializing Zoom...</div>;
  }

  return (
    <div className="App">
      <h1>WeCP Zoom Interview Scheduler</h1>
      {!apiKey && <ApiKeyInput onApiKeySubmit={setApiKey} />}
      {apiKey && !interviewData && (
        <ScheduleInterview apiKey={apiKey} onSchedule={setInterviewData} />
      )}
      {interviewData && <InterviewDetails data={interviewData} />}
    </div>
  );
};

export default App;
