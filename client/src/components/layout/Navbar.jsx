import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import {
  FaSwimmer,
  FaSignInAlt,
  FaBattleNet,
  FaSignOutAlt,
  FaWallet,
  FaCalendarAlt,
  FaRebel,
  FaJediOrder
} from 'react-icons/fa';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  //span is used to hide the navbar when the screen is too small
  const authLinks = (
    <div className="flex-1 px-2 mx-2">
      <div className="flex justify-end">
        <Link to="/dashboard" className="btn btn-ghost btn-sm rounded-btn">
          <FaCalendarAlt className="inline pr-2 text-3xl" />
          Dashboard
        </Link>
        <Link to="/my-meetups" className="btn btn-ghost btn-sm rounded-btn">
          <FaBattleNet className="inline pr-2 text-3xl" />
          My Classes
        </Link>

        <Link to="/all-meetups" className="btn btn-ghost btn-sm rounded-btn">
          <FaRebel className="inline pr-2 text-3xl" />
          All Courses/ Classes
        </Link>

        <Link to="/new-meetup" className="btn btn-ghost btn-sm rounded-btn">
          <FaJediOrder className="inline pr-2 text-3xl" />
          Add New Course/ Class
        </Link>

        <Link to="/credit" className="btn btn-ghost btn-sm rounded-btn">
          <FaWallet className="inline pr-2 text-3xl" />
          Credit
        </Link>

        <Link
          to="/"
          className="btn btn-ghost btn-sm rounded-btn"
          onClick={logout}
        >
          <FaSignOutAlt className="inline pr-2 text-3xl" /> Logout
        </Link>

        <Link to="/feedback" className="btn btn-ghost btn-sm rounded-btn">
          <FaCalendarAlt className="inline pr-2 text-3xl" /> Feedback
        </Link>
      </div>
    </div>
  );

  const guestLinks = (
    <>
      <div className="flex-1 px-2 mx-2">
        <div className="flex justify-end">
          <Link to="/register" className="btn btn-ghost btn-sm rounded-btn">
            <FaBattleNet className="inline pr-2 text-3xl" />
            Register
          </Link>

          <Link to="/login" className="btn btn-ghost btn-sm rounded-btn">
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
            <FaSwimmer className="inline pr-2 text-5xl" />
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
  auth: PropTypes.object.isRequired
};
const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
