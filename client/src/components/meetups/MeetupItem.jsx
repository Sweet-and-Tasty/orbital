import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { loadUser } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setAlert } from '../../actions/alert';

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
  setAlert
}) => {
  const [isCreator, setIsCreator] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [profileId, setProfileId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let profilesId = [];

  useEffect(() => {
    setProfiles([]);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      }
    };
    async function fetchProfile(profile) {
      const res = await axios.get(`/api/profiles/${profile}`, config);
      setProfiles((prev) => [
        ...prev,
        { name: res.data.name, Id: res.data._id }
      ]);
    }

    const fetchData = async (dispatch) => {
      const res = await axios.get(`/api/users/find/${user._id}`);
      setProfiles((prev) => [
        ...prev,
        { name: res.data.name, Id: res.data._id }
      ]);
      if (res.data.profiles.length > 0) {
        res.data.profiles.map((profile) => {
          fetchProfile(profile);
        });
      } else {
        setProfiles([]);
      }
    };

    loadUser();
    fetchData();

    setIsCreator(creator === user._id);
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    setProfileId(e.target.value);
  };

  const handleAdd = async () => {
    console.log(profileId);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      }
    };
    if (profileId === '' || profileId === `${user._id}`) {
      try {
        await axios.post(`/api/users/event/${user._id}`, { _id }, config);
        setAlert('Event added to your profile', 'success');
      } catch (error) {
        setAlert(error.response.data.msg, 'danger');
        console.log(error.response.data.msg);
      }
    } else {
      try {
        await axios.post(`/api/profiles/event/${profileId}`, { _id }, config);
        setAlert('Event added to your profile', 'success');
      } catch (error) {
        setAlert(error.response.data.msg, 'danger');
        console.log(error.response.data.msg);
      }
    }
  };

  // const handleRemove = async () => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-auth-token": localStorage.getItem("token"),
  //     },
  //   };
  //   try {
  //     await axios.post(`/api/users/remove-event/${user._id}`, { _id }, config);
  //     setAdded(false);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <li className={classes.item}>
      <Card>
        {console.log(profiles)}
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <h4>
            Course Start Date:{' '}
            {moment(startDateTime).format('MMMM Do YYYY, h:mm a')}
          </h4>
          <h4>
            Course End Date:{' '}
            {moment(endDateTime).format('MMMM Do YYYY, h:mm a')}
          </h4>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        <div className={classes.actions}>
          {/* {added && (
            <button onClick={handleRemove}>Remove Course/ Class</button>
          )} */}

          <div>
            Add Class For
            <select
              className="select select-ghost w-full max-w-xs"
              onClick={(e) => handleClick(e)}
            >
              {profiles.length > 0 &&
                profiles.map((profile, index) => (
                  <option key={index} value={profile.Id}>
                    {profile.name}
                  </option>
                ))}
            </select>
            <button onClick={handleAdd}>Add</button>
          </div>

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
};

MeetupItem.propTypes = {
  auth: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { setAlert })(MeetupItem);
