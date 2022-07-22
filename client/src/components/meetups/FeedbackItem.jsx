import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FormCard from '../ui/FormCard';

function FeedbackItem() {
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
      {feedbackArray.map((feedbackItem, index) => (
        <FormCard key={index}>
          <p>{feedbackItem.text}</p>
        </FormCard>
      ))}
    </>
  );
}

export default FeedbackItem;
