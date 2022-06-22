import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import {
  FaSwimmer,
  FaSignInAlt,
  FaBattleNet,
  FaInfo,
  FaChalkboard,
  FaSignOutAlt,
} from "react-icons/fa";

export const Navbar = () => {
  //span is used to hide the navbar when the screen is too small
  const authLinks = (
    <div className="flex-1 px-2 mx-2">
      <div className="flex justify-end">
        <Link to="/dashboard" className="btn btn-ghost btn-sm rounded-btn">
          <FaChalkboard className="inline pr-2 text-3xl" />
          Dashboard
        </Link>

        <Link to="/" className="btn btn-ghost btn-sm rounded-btn">
          <FaSignOutAlt className="inline pr-2 text-3xl" /> Logout
        </Link>
      </div>
    </div>
  );

  const { isAuthenticated, loading, dispatch } = useContext(AuthContext);

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

export default Navbar;
