import { useState, useEffect } from "react";
import axios from "axios";

import MeetupList from "../components/meetups/MeetupList";

const AllMeetupsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    const fetchData = async (dispatch) => {
      const res = await axios.get("api/event");
      setLoadedMeetups(res.data);

      await console.log(loadedMeetups);
      console.log(res.data);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div className="-z-50">
      <p className="page-title">All Courses/ Classes</p>
      <MeetupList meetups={loadedMeetups} />
    </div>
  );
};

export default AllMeetupsPage;
