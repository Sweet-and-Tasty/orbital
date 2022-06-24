import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import { useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import Calendar from './components/dashboard/Calendar';
//redux
import { Provider } from 'react-redux';
import store from './store';

// added in myself
// import { Route, Switch } from 'react-router-dom';
import AllMeetupsPage from './pages/AllMeetups';
import NewMeetupPage from './pages/NewMeetup';
import DashboardPage from './pages/Dashboard';

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
          {/* <Route exact path="/dashboard" element={<DashboardPage />} /> */}
          {/* 
          <Route
            exact
            path="/dashboard"
            element={<PrivateRoute component={Dashboard} />}
          /> */}

          <Route
            exact
            path="/new-meetup"
            element={<PrivateRoute component={NewMeetupPage} />}
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
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
