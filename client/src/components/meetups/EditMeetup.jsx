import { useState } from "react";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import Card from "../ui/Card";
import classes from "./NewMeetupForm.module.css";
import { Navigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function EditMeetup(props) {
  let { id } = useParams();

  const [startDateTime, setStartDateTime] = useState();
  const [endDateTime, setEndDateTime] = useState();
  const [title, setTitle] = useState();
  const [image, setImage] = useState();
  const [address, setAddress] = useState();
  const [description, setDescription] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/event/${id}`);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setStartDateTime(res.data.startDateTime);
      setEndDateTime(res.data.endDateTime);
      setAddress(res.data.address);
      setImage(res.data.image);
    };
    fetchData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const meetupData = {
      startDateTime: startDateTime,
      endDateTime: endDateTime,
      title: title,
      image: image,
      address: address,
      description: description,
    };

    console.log(meetupData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = axios.post(`/api/event/${id}`, meetupData, config);
      if (res.status === 200) {
        setAlert("Meetup Edited successfully", "success");
        return <Navigate to="/all-meetups" />;
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

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeImage = (e) => {
    setImage(e.target.value);
  };

  const handleChangeAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Card>
        <form className={classes.form} onSubmit={(e) => submitHandler(e)}>
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
            <input
              type="text"
              required
              id="title"
              value={title}
              onChange={(e) => handleChangeTitle(e)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="image">Image</label>
            <input
              type="url"
              id="image"
              value={image}
              onChange={(e) => handleChangeImage(e)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="address">Location</label>
            <input
              type="text"
              required
              id="address"
              value={address}
              onChange={(e) => handleChangeAddress(e)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              rows="5"
              value={description}
              onChange={(e) => handleChangeDescription(e)}
            ></textarea>
          </div>
          <div className={classes.actions}>
            <button>Edit Course/ Class</button>
          </div>
        </form>
      </Card>
    </LocalizationProvider>
  );
}

export default EditMeetup;
