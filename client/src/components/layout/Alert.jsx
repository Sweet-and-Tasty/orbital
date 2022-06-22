import React from "react";
import { useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";

function Alert() {
  const { alert } = useContext(AlertContext);
  return (
    <div className="alert-wrapper">
      {" "}
      <strong>{alert?.msg}</strong>
    </div>
  );
}

export default Alert;
