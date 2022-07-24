import React from 'react';
import FeedbackList from '../components/meetups/feedback/FeedbackList';
import FeedbackForm from '../components/meetups/feedback/FeedbackForm';
import FeedbackStats from '../components/meetups/feedback/FeedbackStats';
// import { useCallback, useState } from 'react';

function FeedbackPage() {
  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}), []);

  return (
    <>
      <FeedbackForm />
      <FeedbackStats />
      <FeedbackList />
    </>
  );
}

export default FeedbackPage;
