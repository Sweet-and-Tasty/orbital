import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classes from './FeedbackList.module.css';
import FeedbackCard from '../ui/FeedbackCard';
import { Card } from '@mui/material';

function FeedbackList() {
  let { id } = useParams();
  let tempFeedback = [];
  const [feedbackArray, setFeedbackArray] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/event/${id}`);
      if (res.data.feedback.length > 0) {
        res.data.feedback.map((feedbackItem) => {
          tempFeedback.push(feedbackItem);
        });
      }
      console.log(tempFeedback);
      setFeedbackArray(tempFeedback);
    };
    fetchData();
    console.log(feedbackArray);
  }, []);

  return (
    <>
      {/* if there is no feedback */}
      {feedbackArray.length === 0 ? (
        <div className={classes.list}>
          <div className={classes.noFeedback}>No feedback yet</div>
        </div>
      ) : (
        <div className={classes.FeedbackList}>
          {feedbackArray.map((feedbackItem) => (
            <ul className={classes.list}>
              <FeedbackCard>{feedbackItem.text}</FeedbackCard>
            </ul>
          ))}
        </div>
      )}
    </>
  );
}

export default FeedbackList;
