import React from 'react';
import { useCallback, useState, useEffect } from 'react';
import classes from './FeedbackRating.module.css';

function FeedbackRating({ select }) {
  const [selected, setSelected] = useState(10);

  const handleChange = (e) => {
    //change string to number with +
    setSelected(+e.currentTarget.value);
    select(+e.currentTarget.value);
  };

  const radioButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <ul className={classes.rating}>
      {radioButtons.map((num, index) => (
        <li key={index}>
          <input
            type="radio"
            id={`num${num}`}
            name="rating"
            value={`${num}`}
            onChange={handleChange}
            checked={selected === num}
          />
          <label htmlFor={`num${num}`}>{`${num}`}</label>
        </li>
      ))}
    </ul>
  );
}

export default FeedbackRating;
