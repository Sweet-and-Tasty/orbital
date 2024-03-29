import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import PrivateRoute from "./components/routing/PrivateRoute";
import { loadUser } from "./actions/auth";
import { useEffect } from "react";

//redux
import { Provider } from "react-redux";
import store from "./store";

// added in myself
// import { Route, Switch } from 'react-router-dom';
import AllMeetupsPage from "./pages/AllMeetupsPage";
import NewMeetupPage from "./pages/NewMeetup";
import Dashboard from "./components/dashboard/Dashboard";
import Credit from "./pages/Credit";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EditMeetup from "./components/meetups/EditMeetup";
import MyMeetupsPage from "./pages/MyMeetupsPage";
import AddProfile from "./pages/AddProfile";
import FeedbackPage from "./pages/FeedbackPage";

function App() {
  useEffect(() => {
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
        <Alert />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:id" element={<ResetPassword />} />

          <Route
            exact
            path="/credit"
            element={<PrivateRoute component={Credit} />}
          />

          <Route
            exact
            path="/new-meetup"
            element={<PrivateRoute component={NewMeetupPage} />}
          />
          <Route
            exact
            path="/new-meetup/:start"
            element={<PrivateRoute component={NewMeetupPage} />}
          />
          <Route
            exact
            path="/edit-meetup/:id"
            element={<PrivateRoute component={EditMeetup} />}
          />
          <Route
            exact
            path="/my-meetups"
            element={<PrivateRoute component={MyMeetupsPage} />}
          />
          <Route
            exact
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          />
          <Route
            exact
            path="/all-meetups"
            element={<PrivateRoute component={AllMeetupsPage} />}
          />

          <Route
            exact
            path="/add-profile"
            element={<PrivateRoute component={AddProfile} />}
          />

          <Route
            exact
            path="/feedback/:id"
            element={<PrivateRoute component={FeedbackPage} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
