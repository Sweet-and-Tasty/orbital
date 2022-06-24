// this file should no longer be here and should be using calendar instead

import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import axios from "axios";
import Calendar from "./Calendar";

const handleClick = async () => {
  const res = await axios.get("api/event");
  console.log(res.data);
};

const Dashboard = (props) => {
  return (
    <div className="container">
      <h1>Welcome to dashboard,</h1>
      <p>
        you have reached the end of this demonstration, please pay 5 dollars to
        unlock the next dlc
      </p>
      <button onClick={handleClick}>press me!</button>
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
