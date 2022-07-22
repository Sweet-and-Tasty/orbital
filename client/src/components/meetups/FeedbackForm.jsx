import React from 'react';
import { useState, useEffect } from 'react';
import FeedbackFormCard from './feedbackstuff/FeedbackFormCard';
import FeedbackCard from '../ui/FeedbackCard';
import Button from './feedbackstuff/Button';
import axios from 'axios';

function FeedbackForm() {
  const [text, setText] = useState('');
  //   const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  const handleTextChange = (e) => {
    if (text === '') {
      setBtnDisabled(true);
      setMessage(null);
    } else if (text !== '' && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMessage('Feedback must be at least 10 characters long');
    } else {
      //if text is not empty and is more than 10 characters long
      setBtnDisabled(false);
      setMessage(null);
    }

    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/event/feedback/:id', {
      text
    });
  };

  return (
    <FeedbackCard>
      <form onSubmit={handleSubmit}>
        <h2>how would you rate your service w us?</h2>
        {/* <RatingSelect select={(rating) => setRating(rating)} /> */}
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="Write a review"
            value={text}
          />
          <Button type="submit" isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {/* if theres a message then the div message */}
        {message && <div className="message">{message}</div>}
      </form>
    </FeedbackCard>
  );
}

export default FeedbackForm;
