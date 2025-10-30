import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Pantry from "./pages/Pantry/Pantry";
import Alerts from "./pages/Alerts/Alerts";
import Home from "./components/Home/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>} />
       <Route path="/dashboard" element={ <Dashboard/>} />
       <Route path="/pantry" element={<Pantry/>} />
       <Route path="/alerts" element={ <Alerts/>} />

      
      <Route path="/" element={<Home/>} /> {/* Default route */}
    </Routes>
  );
};

export default App;
