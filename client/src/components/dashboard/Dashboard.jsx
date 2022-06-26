// this file should no longer be here and should be using calendar instead

import React from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import axios from "axios";
import Calendar from "./Calendar";

const Dashboard = (props) => {
  return (
    <div className="container mx-auto my-auto ">
      <h1>Welcome to dashboard,</h1>
      <Calendar className="scale-75" />
    </div>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
