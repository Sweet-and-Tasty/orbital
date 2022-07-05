import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import moment from "moment";
import { useState, useEffect } from "react";
import { loadUser } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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

  useEffect(() => {
    loadUser();
    setUserId(user._id);
    setIsCreator(creator === user._id);
  }, []);
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
          <button>Join Course/ Class</button>
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
