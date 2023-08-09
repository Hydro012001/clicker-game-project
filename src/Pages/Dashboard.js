import { Outlet, useNavigate } from "react-router-dom";
import "../CSS/click.css";
import { auth } from "../Services/firebaseConfig";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/error");
      }
    });
  }, [navigate]);
  return (
    <div>
      <ul>
        <li onClick={handleLogout}>
          <p>Logout</p>
        </li>
      </ul>

      <Outlet />
    </div>
  );
}
