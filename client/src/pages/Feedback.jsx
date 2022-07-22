import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { STATES } from "mongoose";

function Feedback() {
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
        <li key={index}>
          <p>{feedbackItem.text}</p>
        </li>
      ))}
    </>
  );
}

export default Feedback;
