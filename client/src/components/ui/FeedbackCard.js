import classes from './Card.module.css';

function FeedbackCard(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default FeedbackCard;
