import classes from './AddNewFormCard.module.css';

function AddNewFormCard(props) {
  return <div className={classes.card}>{props.children}</div>;
}

export default AddNewFormCard;
