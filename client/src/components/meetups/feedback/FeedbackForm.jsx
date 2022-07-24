import React, { useEffect } from 'react';
import { useState } from 'react';
import Button from './feedbackstuff/Button';
import axios from 'axios';
import { setAlert } from '../../../actions/alert';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import FeedbackRating from './FeedbackRating';
import FeedbackFormCard from './feedbackstuff/FeedbackFormCard';
import FeedbackCard from '../../ui/FeedbackCard';
import classes from './Feedback.module.css';

function FeedbackForm() {
  const [count, setCount] = useState(0);
  const { id } = useParams();
  const [text, setText] = useState('');
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {}, [count]);

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

  //   const [, updateState] = useState();
  //   const forceUpdate = useCallback(() => updateState({}), []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = {
      text,
      rating
    };
    // console.log(feedbackData);
    try {
      const res = axios.post(`/api/event/feedback/${id}`, feedbackData);
      setCount(count + 1);
      if (res.status === 200) {
        setAlert('Feedback added successfully', 'success');
        return <Navigate to="/api/event/feedback/:id" />;
        // forceUpdate();
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          setAlert(error.msg, 'danger');
        });
      }
    }

    setText('');
    setRating(10);
    setBtnDisabled(true);
    setMessage('Feedback submitted successfully!');

    window.location.reload();
  };

  return (
    <FeedbackCard>
      <form onSubmit={handleSubmit}>
        <h1 className={classes.centerText}>how would you rate this class?</h1>
        <FeedbackRating select={(rating) => setRating(rating)} />
        <div className={classes.inputGroup}>
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
        {message && <div className={classes.message}>{message}</div>}
      </form>
    </FeedbackCard>
  );
}

FeedbackForm.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default FeedbackForm;
