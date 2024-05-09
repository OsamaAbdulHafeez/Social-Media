import { useContext } from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Navigate,
  Link
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { user } = useContext(AuthContext)
  const user1 = JSON.parse(localStorage.getItem('LoginUser'))
  console.log(user)
  return (  
    <Router>
      <Routes>
        <Route path="/" element={user || user1 ? <Home /> : <Register />} />
        <Route path="/login" element={user || user1 ? <Navigate to="/"/> :<Login />} />
        <Route path="/register" element={user || user1 ? <Navigate to="/"/> : <Register />} />
        <Route path="/profile/:username" element={user || user1 ? <Profile /> : <Navigate to="/"/>} />
      </Routes>
    </Router>
  );
}

export default App;
