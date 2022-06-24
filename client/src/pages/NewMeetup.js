import { useNavigate } from "react-router-dom";
import axios from "axios";

import NewMeetupForm from "../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  return (
    <section>
      <h1>Add New Course/ Class</h1>
      <NewMeetupForm />
    </section>
  );
};

export default NewMeetupPage;
