import { useEffect, useState } from "react";
import "../CSS/click.css";
import myGif from "../Pictures/mouse.gif";
import confitte from "../Pictures/confitte.gif";
import { useParams } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Services/firebaseConfig";

import Rank from "./rank";
export default function ClickScreen() {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(20);
  const [btnDisable, setbtnDisable] = useState(false);
  const [handleCount, setHandleCount] = useState(false);

  const [timesUp, setTimesUp] = useState(false);
  const [startClick, setStartClick] = useState(false);
  const { level } = useParams();
  const levelSelect = level;
  const timerCount = () => {
    setTimer((prevTime) => prevTime - 1);
  };
  const formatTimer = (seconds) => {
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  useEffect(() => {
    const levelSelected = level;
    let interval;
    if (handleCount) {
      interval = setInterval(() => {
        if (timer <= 0) {
          setbtnDisable(true);
          setHandleCount(false);
          clearInterval(interval);
          setTimesUp(true);
        } else {
          timerCount();
        }
      }, levelSelected);
    }

    return () => clearInterval(interval);
  }, [level, handleCount, timer]);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleShowTimesUp = () => {
    setTimesUp(false);
    setCount(0);
    setbtnDisable(false);
    handleUploadScorestoFirbase();
  };
  const handleUploadScorestoFirbase = async () => {
    const levelSelected = level;
    const user = auth.currentUser;
    if (user !== null) {
      const displayName = user.displayName;
      await setDoc(doc(db, levelSelected, displayName), {
        scores: count,
        name: displayName,
      })
        .then(() => {
          alert("Score Save");
          window.location.reload();
        })
        .catch((error) => alert(error.message));
    }
  };

  const handleStartClicking = () => {
    setStartClick(!startClick);
    setHandleCount(true);
  };

  return (
    <div className="contianer">
      {timesUp ? (
        <>
          <div className="times-up">
            <h3>Times Up!!!</h3>
            <img src={confitte} alt="icons" id="confite" />
            <h3>Your Score is : {count}</h3>
            <button onClick={handleShowTimesUp} className="btn">
              Okay
            </button>
          </div>
        </>
      ) : (
        ""
      )}
      <div className="content">
        <div className="timer-count">
          <h1 className="mint">{formatTimer(timer)}</h1>
        </div>

        <br />
        <div className="click-count">
          <h1> {count}</h1>
        </div>
        <div className="btn-contianer">
          {startClick ? (
            <button onClick={handleClick} disabled={btnDisable} className="btn">
              <img src={myGif} alt="icons" />
              Click Me
            </button>
          ) : (
            <button onClick={handleStartClicking} className="btn">
              <img src={myGif} alt="icons" />
              Click Here to start
            </button>
          )}
        </div>
      </div>

      <Rank levelSelect={levelSelect} />
    </div>
  );
}
