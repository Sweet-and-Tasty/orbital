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

  useEffect(() => {
    setMyLoadedMeetups([]);
    setMyLoadedProfiles([]);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    let profiles = [];
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    async function fetchProfile(profile) {
      const res = await axios.get(`/api/profiles/${profile}`, config);
      profiles.push(res.data);
      res.data.events.map((event) => {
        setMyLoadedMeetups((prev) => [
          ...prev,
          { event, hidden: false, name: res.data.name, Id: res.data._id },
        ]);
      });

      setMyLoadedProfiles((prev) => [...prev, res.data]);
    }

    const fetchData = async (dispatch) => {
      const res = await axios.get(`/api/users/find/${user._id}`);
      if (res.data.events.length > 0) {
        res.data.events.map((event) => {
          setMyLoadedMeetups((prev) => [
            ...prev,
            { event, hidden: false, name: res.data.name, Id: res.data._id },
          ]);
        });

        //const eventsId = [Object.assign({}, res.data.events)];
      } else {
        setMyLoadedMeetups([]);
      }

      if (res.data.profiles.length > 0) {
        res.data.profiles.map((profile) => {
          fetchProfile(profile);
        });
      } else {
        setMyLoadedProfiles([]);
      }
    };
    loadUser();
    fetchData();
  }, []);

  const handleClick = async (e, profileId) => {
    let tempArray = [];
    console.log(profileId);
    const res = await axios.get(`/api/users/find/${profileId}`);
    if (e.target.checked) {
      myLoadedMeetups.map((meetup) => {
        console.log(meetup);
        if (meetup.name === res.data.name) {
          meetup.hidden = false;
        }
        tempArray.push(meetup);
      });
    } else {
      myLoadedMeetups.map((meetup) => {
        console.log(meetup);
        if (meetup.name === res.data.name) {
          meetup.hidden = true;
        }
        tempArray.push(meetup);
      });
    }
    console.log(tempArray);
    setMyLoadedMeetups(tempArray);
  };

  const handleClickProfile = async (e, profileId) => {
    let tempArray = [];
    console.log(profileId);
    const res = await axios.get(`/api/profiles/${profileId}`);
    if (e.target.checked) {
      myLoadedMeetups.map((meetup) => {
        console.log(meetup);
        if (meetup.name === res.data.name) {
          meetup.hidden = false;
        }
        tempArray.push(meetup);
      });
    } else {
      myLoadedMeetups.map((meetup) => {
        console.log(meetup);
        if (meetup.name === res.data.name) {
          meetup.hidden = true;
        }
        tempArray.push(meetup);
      });
    }
    console.log(tempArray);
    setMyLoadedMeetups(tempArray);
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
            defaultChecked={true}
          />
        </label>
        {console.log(myLoadedMeetups)}
        {console.log(myLoadedProfiles)}
        {myLoadedProfiles.length > 0 &&
          myLoadedProfiles.map((profile, index) => (
            <label className="label" key={index}>
              <span className="label-text pr-2">{profile.name}</span>
              <input
                type="checkbox"
                className="checkbox checkbox-secondary checked:bg-white-100"
                onClick={(e) => handleClickProfile(e, profile._id)}
                defaultChecked={true}
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
