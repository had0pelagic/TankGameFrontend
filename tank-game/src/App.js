import "./App.css";
import styled from "styled-components";

function App() {
  var field = [
    [1, 2, 3],
    [3, 4, 3],
    [3, 4, 3],
  ];

  return (
    <div className="App">
      <div className="App-header">{Field(field)}</div>
    </div>
  );
}

const Field = (field) => {
  return (
    <div className="field">
      {field.map((x, xIndex) =>
        x.map((y, yIndex) =>
          (xIndex === 0 && yIndex === 2) ||
          (xIndex === 1 && yIndex === 2) ||
          (xIndex === 1 && yIndex === 1) ? (
            <Square color="red" />
          ) : (
            <Square />
          )
        )
      )}
    </div>
  );
};

const Square = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.color !== undefined ? props.color : "rgb(8, 42, 97)"};
  width: 100px;
  height: 100px;
  margin: 6px;
`;

export default App;
