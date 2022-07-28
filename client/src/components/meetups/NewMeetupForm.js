import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import AddNewFormCard from "../ui/AddNewFormCard";
import classes from "./NewMeetupForm.module.css";
import { Navigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { loadUser } from "../../actions/auth";
import PropTypes from "prop-types";

function NewMeetupForm({ auth: { user } }) {
  const { start } = useParams();
  const [startDateTime, setStartDateTime] = useState(
    start ? new Date(start) : new Date()
  );
  const [endDateTime, setEndDateTime] = useState(new Date());
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  useEffect(() => {
    loadUser();
  }, []);

  const submitHandler = async () => {
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };
    try {
      const res = await axios.post("api/event", meetupData);
      if (res.status === 200) {
        await axios.post(`api/users/event/${user._id}`, res.data);
        setAlert("Meetup added successfully", "success");
        //return <Navigate to="/dashboard" />;
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

  const handleChangeStartDateTime = (newValue) => {
    setStartDateTime(newValue);
  };

  const handleChangeEndDateTime = (newValue) => {
    setEndDateTime(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <AddNewFormCard>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={(classes.control, "mb-5")}>
            <DateTimePicker
              label="Start Time"
              value={startDateTime}
              onChange={handleChangeStartDateTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className={(classes.control, "mb-1")}>
            <DateTimePicker
              className="text-xl font-bold pb-2 mt-2"
              label="End Time"
              value={endDateTime}
              onChange={handleChangeEndDateTime}
              renderInput={(params) => <TextField {...params} />}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="title">Title</label>
            <input type="text" required id="title" ref={titleInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="image">Image</label>
            <input type="url" id="image" ref={imageInputRef} />
            {/* <input type="file" accept="image/png, image/jpeg" /> */}
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
      </AddNewFormCard>
    </LocalizationProvider>
  );
}

NewMeetupForm.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(NewMeetupForm);
