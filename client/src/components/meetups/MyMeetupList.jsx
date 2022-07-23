import MyMeetupItem from "./MyMeetupItem";
import classes from "./MeetupList.module.css";
import { Link } from "react-router-dom";

function MyMeetupList({ meetups }) {
  if (meetups.length === 0) {
    return (
      <>
        <div className="container mx-auto text-5xl text-bold text-center mt-10 hover:text-blue-500">
          <Link to="/all-meetups">Join some Classes now!</Link>
        </div>
      </>
    );
  }
  return (
    <ul className={classes.list}>
      {/* <ul className="list"> */}
      {meetups.map((meetup, index) => (
        <MyMeetupItem
          key={index}
          _id={meetup.event}
          name={meetup.name}
          hidden={meetup.hidden}
        />
      ))}
    </ul>
  );
}

export default MyMeetupList;
