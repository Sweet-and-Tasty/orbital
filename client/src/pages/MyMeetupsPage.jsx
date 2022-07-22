import { useState, useEffect } from "react";
import axios from "axios";
import { loadUser } from "../actions/auth";
import PropTypes from "prop-types";
import MyMeetupList from "../components/meetups/MyMeetupList";
import { connect } from "react-redux";

const MyMeetupsPage = ({ auth: { user } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [myLoadedMeetups, setMyLoadedMeetups] = useState([]);
  const [myLoadedProfiles, setMyLoadedProfiles] = useState([]);
  let profilesChecked = [];
  const [checked, setChecked] = useState([]);
  let eventsId = [];
  let profiles = [];

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const fetchData = async (dispatch) => {
      const res = await axios.get(`/api/users/find/${user._id}`);
      if (res.data.events.length > 0) {
        res.data.events.map((event) => {
          eventsId.push({ event });
        });

        //const eventsId = [Object.assign({}, res.data.events)];
        setMyLoadedMeetups(eventsId);
      } else {
        setMyLoadedMeetups([]);
      }

      if (res.data.profiles.length > 0) {
        res.data.profiles.map((profile) => {
          const response = axios.get(`/api/profiles/${profile}`, config);
          profiles.push(response.data);
        });
        setMyLoadedProfiles(profiles);
      }

      setIsLoading(false);
    };
    loadUser();
    fetchData();
    console.log(myLoadedMeetups);
    console.log(myLoadedProfiles);
  }, []);

  const handleClick = async (e, profileId) => {
    if (e.target.checked) {
      const res = await axios.get(`/api/users/find/${profileId}`);
      if (res.data.events.length > 0) {
        console.log(res.data.events);
        res.data.events.map((event) => {
          eventsId.push({ event });
        });

        setMyLoadedMeetups(eventsId);
      }
    }
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div>
      <div className="form-control absolute right-5 grid grid-rows-3 grid-flow-col ">
        <label className="label">
          <span className="label-text pr-2"> {user.name}</span>
          <input
            type="checkbox"
            className="checkbox checkbox-secondary checked:bg-white-100"
            onClick={(e) => handleClick(e, user._id)}
          />
        </label>

        {myLoadedProfiles.length > 0 &&
          myLoadedProfiles.map((profile, index) => (
            <label className="label" key={index}>
              <span className="label-text pr-2">{profile.name}</span>
              <input
                type="checkbox"
                className="checkbox checkbox-secondary checked:bg-white-100"
                onClick={(e) => handleClick(e, profile._id)}
              />
            </label>
          ))}
      </div>

      <p className="page-title">My Courses/ Classes</p>

      <MyMeetupList meetups={myLoadedMeetups} />
    </div>
  );
};

MyMeetupsPage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MyMeetupsPage);
