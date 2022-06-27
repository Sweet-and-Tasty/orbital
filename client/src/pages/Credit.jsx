import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadUser } from "../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";
const Credit = ({ auth: { user } }) => {
  const [credit, setCredit] = useState(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    loadUser();
    const fetchData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      };
      const res = await axios(`/api/users/${user._id}`, config);
      setCredit(res.data.credits);
      console.log(res.data.credits);
    };
    fetchData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setCredit(credit + Number(value));
    console.log(value.type);
    // const res = await axios.put(
    //     `/api/user/${localStorage.getItem("userId")}`,
    //     { credit: credit + value }
    //     );
    // setCredit(res.data.credit);
  };

  return (
    <>
      <div>
        {user.name} you have {credit} credits remaining
      </div>
      <form onSubmit={submitHandler}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button className="btn btn-ghost" type="submit">
          Top Up {value} Credits
        </button>
      </form>
    </>
  );
};

Credit.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Credit);
