import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loadUser } from "../actions/auth";
import axios from "axios";
import { FaUserPlus, FaWindows } from "react-icons/fa";
import DisplayProfile from "./DisplayProfile";

function AddProfile({ auth: { user } }) {
  const [formData, setFromData] = useState({
    name: "",
    avatar: "",
  });
  const [profilesId, setProfilesId] = useState([]);

  const { name, avatar } = formData;

  const onChange = (e) =>
    setFromData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/profiles", formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    };
    const res = await axios.post(
      `/api/users/profiles/${user._id}`,
      response.data,
      config
    );
    console.log(formData);
    window.location.reload(true);
  };

  useEffect(() => {
    setProfilesId([]);
    loadUser();
    user.profiles.map((profile) => {
      setProfilesId((prev) => [...prev, { Id: profile }]);
    });
  }, []);

  return (
    <>
      <div className="flex justify-center mt-20 pt-5 relative -z-9999">
        {profilesId.map((profile, index) => (
          <DisplayProfile _id={profile.Id} key={index} />
        ))}
      </div>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Add Profile
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={(e) => onSubmit(e)}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => onChange(e)}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                />
              </div>

              <div>
                <label htmlFor="name" className="sr-only">
                  Avatar Link
                </label>
                <input
                  id="avatar"
                  name="avatar"
                  type="avatar"
                  autoComplete="avatar"
                  value={avatar}
                  onChange={(e) => onChange(e)}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Avatar Link"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                value="Login"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <FaUserPlus
                    className="h-5 w-5 text-grey-500 group-hover:text-grey-400"
                    aria-hidden="true"
                  />
                </span>
                Add Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

AddProfile.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AddProfile);
