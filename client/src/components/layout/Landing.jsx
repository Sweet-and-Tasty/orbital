import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Landing = () => {
  return (
    <div className="custom-landing ">
      <div className="container mx-auto h-full ">
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-6xl text-bold text-white">
            Sweet and Tasty Academy
          </h1>
          <p className="text-3xl text-white">
            Log in to receive news about the class and your child's progress!
          </p>

          <div className="buttons">
            <Link to="/register" className="btn btn-outline">
              <FaUserPlus className="inline pr-2 text-3xl" />
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-outline">
              <FaSignInAlt className="inline pr-2 text-3xl" />
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
