import Card from "../ui/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { loadUser } from "../../actions/auth";
import classes from "./MeetupItem.module.css";
import moment from "moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function MyMeetupItem({ _id, name, hidden, userId, auth: { user } }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDateTime, setStartDateTime] = useState(Date.now());
  const [endDateTime, setEndDateTime] = useState(Date.now());
  const [address, setAddress] = useState("");
  const [isCreator, setIsCreator] = useState(false);
  const [image, setImage] = useState("");
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const fetchData = async (dispatch) => {
      const res = await axios.get(`api/event/${_id}`);

      setIsCreator(res.data.creator === user._id);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setStartDateTime(res.data.startDateTime);
      setEndDateTime(res.data.endDateTime);
      setAddress(res.data.address);
      setImage(res.data.image);
    };
    loadUser();
    fetchData();
  }, []);

  const handleAdd = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    try {
      await axios.post(`/api/users/event/${user._id}`, { _id }, config);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemove = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    userId === user._id
      ? await axios.post(`/api/users/remove-event/${user._id}`, { _id }, config)
      : await axios.post(
          `/api/profiles/remove-event/${userId}`,
          { _id },
          config
        );
    setRemoved(true);
  };
  if (!removed && !hidden) {
    return (
      <li className={classes.item}>
        <Card>
          <div className={classes.image}>
            <img src={image} alt={title} />
          </div>
          <div className={classes.content}>
            <h2>{name}</h2>
            <h3>{title}</h3>
            <h4>
              Course Start Date:{" "}
              {moment(startDateTime).format("MMMM Do YYYY, h:mm a")}
            </h4>
            <h4>
              Course End Date:{" "}
              {moment(endDateTime).format("MMMM Do YYYY, h:mm a")}
            </h4>
            <address>{address}</address>
            <p>{description}</p>
          </div>
          <div className={classes.actions}>
            <button onClick={handleRemove}>Remove Course/ Class</button>

            {isCreator && (
              <Link to={`/edit-meetup/${_id}`}>
                <button className="ml-4"> Edit </button>
              </Link>
            )}
            {/* make a feedback button */}
            <Link to={`/feedback/${_id}`}>
              <button className="ml-4"> Feedback </button>
            </Link>
          </div>
        </Card>
      </li>
    );
  }
}

MyMeetupItem.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MyMeetupItem);
