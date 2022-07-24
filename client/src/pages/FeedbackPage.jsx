import React from 'react';
import FeedbackList from '../components/meetups/feedback/FeedbackList';
import FeedbackForm from '../components/meetups/feedback/FeedbackForm';
import FeedbackStats from '../components/meetups/feedback/FeedbackStats';
import { useCallback, useState } from 'react';

function FeedbackPage() {
  //import in the event id from the url

  return (
    <>
      <FeedbackForm />
      <FeedbackStats />
      <FeedbackList />
    </>
  );
}

export default FeedbackPage;
