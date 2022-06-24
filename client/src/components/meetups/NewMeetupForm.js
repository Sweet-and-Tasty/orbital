import { useRef } from "react";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import { Navigate } from "react-router-dom";

function NewMeetupForm(props) {
  const startDateTimeInputRef = useRef();
  const endDateTimeInputRef = useRef();
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  const submitHandler = async () => {
    //event.preventDefault();
    const enteredStartDateTime = startDateTimeInputRef.current.value;
    const enteredEndDateTime = endDateTimeInputRef.current.value;
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      startDateTime: enteredStartDateTime,
      endDateTime: enteredEndDateTime,
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };
    try {
      const res = axios.post("api/event", meetupData);
      if (res.status === 200) {
        setAlert("Meetup added successfully", "success");
        return <Navigate to="/" />;
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => {
          setAlert(error.msg, "danger");
        });
      }
    }
  };
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="startDateTime">Start Time</label>
          <input
            type="text"
            required
            id="startDateTime"
            ref={startDateTimeInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="endDateTime">End Time</label>
          <input
            type="text"
            required
            id="endDateTime"
            ref={endDateTimeInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="title">Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Image</label>
          <input type="url" id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Location</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            rows="5"
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Course/ Class</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
