import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import moment from "moment";

function MeetupItem({
  image,
  title,
  id,
  startDateTime,
  endDateTime,
  address,
  description,
}) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          {/* <h4>Course Start {todayStr(props.startDateTime)}</h4>
          <h4>Course End Date: {todayStr(props.endDateTime)}</h4> */}
          <h4>
            Course Start Date:{" "}
            {moment(startDateTime).format("MMMM Do YYYY, h:mm a")}
          </h4>
          <h4>
            Course End Date:{" "}
            {moment(endDateTime).format("MMMM Do YYYY, h:mm a")}
          </h4>
          <address>{address}</address>
          <p>{description}</p>
        </div>
        <div className={classes.actions}>
          <button>Join Course/ Class</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
