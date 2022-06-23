import React from 'react';
import PropTypes from 'prop-types';

const Dashboard = (props) => {
  return (
    <div className="container">
      <h1>Welcome to dashboard,</h1>
      <p>
        you have reached the end of this demonstration, please pay 5 dollars to
        unlock the next dlc
      </p>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
