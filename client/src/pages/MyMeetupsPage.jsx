import { useState, useEffect } from "react";
import axios from "axios";
import { loadUser } from "../actions/auth";
import PropTypes from "prop-types";
import MyMeetupList from "../components/meetups/MyMeetupList";
import { connect } from "react-redux";

const MyMeetupsPage = ({ auth: { user } }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [myLoadedMeetups, setMyLoadedMeetups] = useState([]);

  useEffect(() => {
    const fetchData = async (dispatch) => {
      const res = await axios.get(`api/users/find/${user._id}`);
      if (res.data.events.length > 0) {
        const eventsId = [Object.assign({}, res.data.events)];
        setMyLoadedMeetups(eventsId);
      } else {
        setMyLoadedMeetups([]);
      }
      console.log(res.data.events);
      setIsLoading(false);
    };
    loadUser();
    fetchData();
    console.log(myLoadedMeetups);
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <section>
      <p className="page-title">My Courses/ Classes</p>
      <MyMeetupList meetups={myLoadedMeetups} />
    </section>
  );
};

MyMeetupsPage.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(MyMeetupsPage);
