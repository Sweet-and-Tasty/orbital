import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import PrivateRoute from "./components/routing/PrivateRoute";
import { useEffect, useContext } from "react";
import setAuthToken from "./utils/setAuthToken";
import { AlertProvider } from "./context/alert/AlertContext";
import { AuthProvider } from "./context/auth/AuthContext";
import AuthContext from "./context/auth/AuthContext";
import { loadUser } from "./context/auth/AuthActions";

function App() {
  const { isAuthenticated, token, dispatch } = useContext(AuthContext);
  useEffect(() => {
    // try to fetch a user, if no token or invalid token we
    // will get a 401 response from our API
    loadUser();
  }, []);
  return (
    <AlertProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Alert />
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route
              path="dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </AlertProvider>
  );
}

export default App;
