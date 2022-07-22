import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import classes from './FeedbackList.module.css';
import FeedbackCard from '../ui/FeedbackCard';

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
      {feedbackArray.map((feedbackItem) => (
        <ul className={classes.list}>
          <FeedbackCard>{feedbackItem.text}</FeedbackCard>
        </ul>
      ))}
    </>
  );
}

export default FeedbackList;
