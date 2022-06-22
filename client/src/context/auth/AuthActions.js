import { useContext } from "react";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import setAlert from "../alert/AlertActions";

//load user
export const loadUser = () => async (dispatch) => {
  console.log("loaduser called");
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("/api/auth");

    dispatch({
      type: "USER_LOADED",
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: "AUTH_ERROR",
    });
  }
};

//register user
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    try {
      const res = await axios.post("/api/users", { name, email, password });
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert(error.msg, "danger"));
      }
      dispatch({
        type: "REGISTER_FAIL",
      });
    }
  };

//login user
export const login = (email, password) => async (dispatch) => {
  try {
    console.log("login called");
    const res = await axios.post("/api/auth", { email, password });

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type: "LOGIN_FAIL",
    });
  }
};

//logout user
export const logout = () => (dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
};
