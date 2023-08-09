import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Services/firebaseConfig";
import "../CSS/click.css";
export default function Rank(level) {
  const [rank, setRank] = useState([]);
  const selectLevel = level.levelSelect;

  useEffect(() => {
    async function Data() {
      const q = query(collection(db, selectLevel), orderBy("scores"));

      const querySnap = await getDocs(q);

      querySnap.forEach((doc) => {
        setRank(
          querySnap.docs.map((item) => ({
            id: item.id,
            data: item.data(),
          }))
        );
      });
    }
    Data();
  }, [selectLevel]);

  const sortedRank = [...rank].sort((a, b) => b.data.scores - a.data.scores);

  const levelType = (levelNum) => {
    switch (levelNum) {
      case "1000":
        return "1x speed";
      case "800":
        return "2x speed";
      case "600":
        return "3x speed";
      case "400":
        return "4x speed";
      case "100":
        return "5x speed";
      default:
        return "No level selected";
    }
  };

  if (sortedRank) {
    return (
      <div>
        <div className="history-scores">
          <label id="lvl-parent">
            Top Players in
            <label id="level">{levelType(selectLevel)}</label>{" "}
          </label>

          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Scores</th>
              </tr>
            </thead>
            <tbody>
              {sortedRank.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.data.name}</td>
                  <td>{item.data.scores}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className="history-scores">
          <label id="lvl-parent">
            Top Players in
            <label id="level">{levelType(selectLevel)}</label>{" "}
          </label>

          <label>Loading...</label>
        </div>
      </div>
    );
  }
}
