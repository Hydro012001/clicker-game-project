import "./App.css";
import ClickScreen from "./Components/clickscreen";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import Signup from "./Pages/Signup";
import Level from "./Components/level";
import NotAllowed from "./Components/notAllowed";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/error" exact element={<NotAllowed />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/dashboard" exact element={<Dashboard />}>
          <Route index element={<Level />} />
          <Route path=":level" element={<ClickScreen />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
