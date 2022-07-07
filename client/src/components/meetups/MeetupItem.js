import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import moment from "moment";
import { useState, useEffect } from "react";
import { loadUser } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const MeetupItem = ({
  image,
  title,
  _id,
  startDateTime,
  endDateTime,
  address,
  description,
  creator,
  auth: { user },
}) => {
  const [userId, setUserId] = useState(null);
  const [isCreator, setIsCreator] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/users/${user._id}`);
      setAdded(res.data.events.includes(_id));
    };

    fetchData();
    loadUser();
    setUserId(user._id);
    setIsCreator(creator === user._id);
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
      setAdded(true);
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
    try {
      await axios.post(`/api/users/remove-event/${user._id}`, { _id }, config);
      setAdded(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          {/* <h4>Course Start {todayStr(props.startDateTime)}</h4>
          <h4>Course End Date: {todayStr(props.endDateTime)}</h4> */}
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
          {added && (
            <button onClick={handleRemove}>Remove Course/ Class</button>
          )}
          {!added && <button onClick={handleAdd}>Add Course/ Class</button>}
          {isCreator && (
            <Link to={`/edit-meetup/${_id}`}>
              <button className="ml-4"> Edit </button>
            </Link>
          )}
        </div>
      </Card>
    </li>
  );
};

MeetupItem.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MeetupItem);
