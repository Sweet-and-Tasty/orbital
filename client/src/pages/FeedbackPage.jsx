import React from 'react';
import FeedbackList from '../components/meetups/FeedbackList';
import FeedbackForm from '../components/meetups/FeedbackForm';

function FeedbackPage() {
  return (
    <>
      <FeedbackForm />
      <FeedbackList />
    </>
  );
}

export default FeedbackPage;
