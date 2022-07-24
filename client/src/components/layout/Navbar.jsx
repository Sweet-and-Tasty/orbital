import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import {
  FaSwimmer,
  FaSignInAlt,
  FaBattleNet,
  FaSignOutAlt,
  FaWallet,
  FaCalendarAlt,
  FaRebel,
  FaJediOrder,
  FaUserFriends,
  FaSith,
  FaDragon,
} from "react-icons/fa";

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  //span is used to hide the navbar when the screen is too small
  const authLinks = (
    <div className="flex-1 px-2 mx-2">
      <div className="flex justify-end">
        <Link
          to="/dashboard"
          className="btn btn-ghost btn-sm rounded-btn flex-1"
        >
          <FaCalendarAlt className="inline pr-2 text-3xl" />
          Dashboard
        </Link>

        <div class="dropdown dropdown-hover inline btn btn-ghost btn-sm rounded-btn flex-1 relative z-9999 ">
          <label className="m-1">
            <FaDragon className="inline pr-2 text-3xl" />
            Classes
          </label>

          <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-9999 ">
            <Link
              to="/my-meetups"
              className="btn btn-ghost btn-sm rounded-btn flex-1 "
            >
              <FaSith className="inline pr-2 text-3xl" />
              My Classes
            </Link>

            <Link
              to="/all-meetups"
              className="btn btn-ghost btn-sm rounded-btn flex-1"
            >
              <FaRebel className="inline pr-2 text-3xl" />
              All Classes
            </Link>

            <Link
              to="/new-meetup"
              className="btn btn-ghost btn-sm rounded-btn flex-1"
            >
              <FaJediOrder className="inline pr-2 text-3xl" />
              Add New Class
            </Link>
          </ul>
        </div>

        <Link to="/credit" className="btn btn-ghost btn-sm rounded-btn flex-1">
          <FaWallet className="inline pr-2 text-3xl" />
          Credit
        </Link>

        <Link
          to="/"
          className="btn btn-ghost btn-sm rounded-btn flex-1"
          onClick={logout}
        >
          <FaSignOutAlt className="inline pr-2 text-3xl" /> Logout
        </Link>

        <Link
          to="/add-profile"
          className="btn btn-ghost btn-sm rounded-btn flex-1"
        >
          <FaUserFriends className="inline pr-2 text-3xl" /> Profiles
        </Link>
      </div>
    </div>
  );

  const guestLinks = (
    <>
      <div className="flex-1 px-2 mx-2">
        <div className="flex justify-end">
          <Link
            to="/register"
            className="btn btn-ghost btn-sm rounded-btn flex-1"
          >
            <FaBattleNet className="inline pr-2 text-3xl" />
            Register
          </Link>

          <Link to="/login" className="btn btn-ghost btn-sm rounded-btn flex-1">
            <FaSignInAlt className="inline pr-2 text-3xl" /> Login
          </Link>
        </div>
      </div>
    </>
  );
  return (
    <nav class="navbar shadow-lg bg-neutral text-neutral-content">
      <div className="container mx-auto">
        <div className="flex-none px-2 mx-2">
          <Link to="/" className="text-lg font-bold align-middle">
            <FaSwimmer className="inline pr-2 text-5xl md: text-2xl" />
            S&T Academy
          </Link>
        </div>
        {!loading && (isAuthenticated ? authLinks : guestLinks)}
      </div>
    </nav>
  );
};
Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
