import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const Landing = () => {
  return (
    <div className="custom-landing -z-50">
      <div className="container mx-auto h-full -z-50">
        <div className="flex flex-col items-center justify-center h-full -z-50">
          <h1 className="text-6xl text-bold text-white">
            Sweet and Tasty Academy
          </h1>
          <p className="text-3xl text-white">
            Log in to receive news about the class and your child's progress!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
