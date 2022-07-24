import classes from './FeedbackCard.module.css';

function FeedbackCard(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default FeedbackCard;
