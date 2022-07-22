import React from 'react';
import FeedbackList from '../components/meetups/FeedbackList';
import FeedbackForm from '../components/meetups/FeedbackForm';
import { useCallback, useState } from 'react';

function FeedbackPage() {
  // const [, updateState] = useState();
  // const forceUpdate = useCallback(() => updateState({}), []);

  return (
    <>
      <FeedbackForm />
      <FeedbackList />
    </>
  );
}

export default FeedbackPage;
