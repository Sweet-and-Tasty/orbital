import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) => (
  <div className="absolute left-0  z-9999 text-white-100 text-xl bg-red-500">
    {alerts.map((alert) => (
      <div key={alert.id}>{alert.msg}</div>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
