import { useNavigate } from "react-router-dom";
import "../CSS/click.css";
import thinking from "../Pictures/Woman thinking.gif";
export default function Level() {
  const navigate = useNavigate();
  const handleStartCount = (second) => {
    navigate(`${second}`);
  };
  return (
    <div className="level-container">
      <div className="timer-container">
        <h3>Choose a level speed</h3>

        <div className="timer-btn">
          <div className="timer" onClick={() => handleStartCount(1000)}>
            1x speed
          </div>
          <div className="timer" onClick={() => handleStartCount(800)}>
            2x speed
          </div>
          <div className="timer" onClick={() => handleStartCount(600)}>
            3x speed
          </div>
          <div className="timer" onClick={() => handleStartCount(400)}>
            4x speed
          </div>
          <div className="timer" onClick={() => handleStartCount(100)}>
            5x speed
          </div>
        </div>
      </div>
      <img src={thinking} alt="thinking" id="thinking" />
    </div>
  );
}
