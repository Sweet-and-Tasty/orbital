import React from 'react';
import PropTypes from 'prop-types';

function FeedbackFormCard({ children, reverse }) {
  //   return <div className={`card ${reverse && `reverse`}`}>{children}</div>;

  return (
    <div
      className="card"
      style={{
        backgroundColor: reverse ? 'rgba(0,0,0, 0.4)' : '#fff',
        color: reverse ? '#fff' : '#000'
      }}
    >
      {children}
    </div>
  );
}

FeedbackFormCard.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool
};

export default FeedbackFormCard;
