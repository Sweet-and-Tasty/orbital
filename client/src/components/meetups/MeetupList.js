import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList({ meetups }) {
  return (
    <ul className={classes.list}>
      {meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          _id={meetup._id}
          image={meetup.image}
          startDateTime={meetup.startDateTime}
          endDateTime={meetup.endDateTime}
          title={meetup.title}
          address={meetup.address}
          description={meetup.description}
          creator={meetup.creator}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
