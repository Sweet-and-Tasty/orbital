import { useNavigate } from "react-router-dom";
import axios from "axios";

import NewMeetupForm from "../components/meetups/NewMeetupForm";

const NewMeetupPage = async () => {
  const history = useNavigate();
  function addMeetupHandler(meetupData) {
    fetch(
      "https://react-getting-started-a4afb-default-rtdb.asia-southeast1.firebasedatabase.app/meetups.json",
      {
        method: "POST",
        body: JSON.stringify(meetupData),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(() => {
      // can use async await
      history.replace("/");
    });
    //const config = { headers: { "Content-Type": "application/json" } };
    // try {
    //  axios.post("api/event", meetupData, );
    //  } catch (err) {
    //   const errors = err.response.data.errors;
    //  if (errors) {
    //   errors.forEach((error) => { dispatch(setAlert(error.msg, "danger")); });
  }

  return (
    <section>
      <h1>Add New Course/ Class</h1>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </section>
  );
};

export default NewMeetupPage;
