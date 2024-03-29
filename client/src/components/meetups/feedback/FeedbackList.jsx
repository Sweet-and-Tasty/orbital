import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import classes from "./Feedback.module.css";
import FeedbackCard from "../../ui/FeedbackCard";
// import FaTimes from 'react-icons/fa/FaTimes';
// import FaEdit from 'react-icons/fa/FaEdit';
import { FaTimes } from "react-icons/fa";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function FeedbackList({ auth: { user } }) {
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

  // deleteFeedback only if youre the creator of the feedback
  const deleteFeedback = async (feedbackId) => {
    if (window.confirm("Are you sure you want to delete this feedback?")) {
      await axios.delete(`/api/event/feedback/${id}/${feedbackId}`);
      window.location.reload();
    }
  };

  return (
    <>
      {/* if there is no feedback */}
      {feedbackArray.length === 0 ? (
        <div className={classes.list}>
          <div className={classes.noFeedback}>No feedback yet</div>
        </div>
      ) : (
        <div className={classes.FeedbackList}>
          {feedbackArray.map((feedbackItem, index) => (
            <ul className={classes.list} key={index}>
              <FeedbackCard>
                <div className={classes.numDisplay}>{feedbackItem.rating}</div>
                {feedbackItem.poster === user._id && (
                  <button
                    className={classes.close}
                    onClick={() => deleteFeedback(feedbackItem._id)}
                  >
                    <FaTimes color="#bb13bb" />
                  </button>
                )}
                {/* <button onClick={() => editFeedback(item)} className="edit">
                  <FaEdit color="purple" />
                </button> */}
                <div className={classes.message}>{feedbackItem.text}</div>
              </FeedbackCard>
            </ul>
          ))}
        </div>
      )}
    </>
  );
}

FeedbackList.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(FeedbackList);
