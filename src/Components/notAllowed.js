import { useNavigate } from "react-router-dom";
import "../CSS/click.css";
export default function NotAllowed() {
  const navigate = useNavigate();
  const redirectLogin = () => {
    navigate("/");
  };
  return (
    <div className="not-Allowed">
      <h1>Oppppssss.... Login sa hahaha</h1>
      <button className="btn" onClick={redirectLogin}>
        Okay
      </button>
    </div>
  );
}
