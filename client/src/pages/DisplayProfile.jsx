import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserMinus } from "react-icons/fa";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser } from "../actions/auth";

function DisplayProfile({ _id, auth: { user } }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    const fetchData = async (dispatch) => {
      const res = await axios.get(`/api/profiles/${_id}`);
      setName(res.data.name);
      setAvatar(res.data.avatar);
    };
    loadUser();
    fetchData();
  }, []);

  const handleClick = async (e) => {
    await axios.post(`/api/users/remove-profile/${user._id}`, { _id });
    await axios.delete(`/api/profiles/${_id}`);
    window.location.reload(true);
  };

  return (
    <div className="pr-10 pl-10 -z-9999">
      <div className="avatar -z-9999">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 -z-9999">
          {avatar ? (
            <img src={avatar} />
          ) : (
            <img src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" />
          )}
        </div>
      </div>
      <div className="info">
        <div className="name">
          <h1 className="text-center">{name}</h1>
        </div>
      </div>
      <button
        onClick={(e) => handleClick(e)}
        className="group relative w-full flex justify-center py-2 px-4 border
        border-transparent text-sm font-sm rounded-md text-white bg-blue-600
        hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-indigo-500"
      >
        <FaUserMinus className="inline pr-2 text-2xl " />
        delete
      </button>
    </div>
  );
}

DisplayProfile.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(DisplayProfile);
