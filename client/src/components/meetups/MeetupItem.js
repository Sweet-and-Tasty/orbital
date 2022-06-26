import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

let todayStr = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

function MeetupItem(props) {
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          {/* <h4>Course Start {todayStr(props.startDateTime)}</h4>
          <h4>Course End Date: {todayStr(props.endDateTime)}</h4> */}
          <h4>Course Start Date: {props.startDateTime}</h4>
          <h4>Course End Date: {props.endDateTime}</h4>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button>Join Course/ Class</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
