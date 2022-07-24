import React from 'react';
import classes from './Feedback.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FeedbackStats() {
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

  // find the average rating
  let averageRating = 0;
  let totalRating = 0;
  let numOfFeedback = feedbackArray.length;
  if (numOfFeedback > 0) {
    feedbackArray.map((feedbackItem) => {
      totalRating += feedbackItem.rating;
    });
    averageRating = totalRating / numOfFeedback;
  }

  //round off average to 1 decimal places
  averageRating = averageRating.toFixed(1).replace(/[.,]0$/, '');

  return (
    <>
      <div class="stats shadow grid place-items-center">
        <div class="stat place-items-center">
          <div class="stat-title ">Reviews</div>
          <div class="stat-value">{feedbackArray.length}</div>
        </div>

        <div class="stat place-items-center">
          <div class="stat-title ">Average Rating</div>
          <div class="stat-value text-secondary">
            {isNaN(averageRating) ? 0 : averageRating}
          </div>
        </div>
      </div>
    </>
  );
}

export default FeedbackStats;
