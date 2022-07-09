import "./App.css";
import styled from "styled-components";
import { useEffect } from "react";
import Field from "./components/field";

export default function App() {
  useEffect(() => {}, [fieldInfo]);

  var fieldInfo = {
    Width: 4,
    Height: 4,
    LeftBorder: 0,
    RightBorder: 100,
    TopBorder: 0,
    BottomBorder: 100,
    Tanks: [
      {
        Owner: { Username: "user1" },
        Name: "tank1",
        XPosition: 0,
        YPosition: 1,
      },
      {
        Owner: { Username: "user2" },
        Name: "tank2",
        XPosition: 2,
        YPosition: 2,
      },
    ],
    Obstacles: [
      {
        XPosition: 3,
        YPosition: 3,
      },
      {
        XPosition: 1,
        YPosition: 2,
      },
    ],
  };

  return (
    <div className="App">
      <div className="App-header">
        <Field fieldInfo={fieldInfo} />
      </div>
    </div>
  );
}
