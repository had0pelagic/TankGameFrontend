import "./App.css";
import styled from "styled-components";

function App() {
  var oldfield = [
    [<StyledSquare color="red" />, <StyledSquare />, <StyledSquare />],
    [<StyledSquare />, <StyledSquare />, <StyledSquare />],
    [<StyledSquare />, <StyledSquare />, <StyledSquare />],
  ];

  var fieldInfo = {
    Width: 3,
    Height: 3,
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
  };

  var field = [];

  return (
    <div className="App">
      <div className="App-header">{Field(fieldInfo, field)}</div>
    </div>
  );
}

const UpdateField = (fieldInfo, field) => {
  fieldInfo.Tanks.map((item) => {
    field[item.XPosition][item.YPosition] = <StyledSquare color="red" />;
  });
};

const FillField = (fieldInfo, field) => {
  for (let x = 0; x < fieldInfo.Width; x++) {
    var col = [];
    for (let y = 0; y < fieldInfo.Height; y++) {
      col.push(<StyledSquare />);
    }
    field.push(col);
  }
};

const Field = (fieldInfo, field) => {
  FillField(fieldInfo, field);
  UpdateField(fieldInfo, field);
  return (
    <div className="field">
      {field.map((xItems, x) => xItems.map((yItems, y) => yItems))}
    </div>
  );
};

const Square = ({ x, y, item }) => {
  return (
    <div>
      {/* {console.log(`${x} -- ${y} --  ${item}`)} */}
      {item === "c" ? <StyledSquare color="red" /> : <StyledSquare />}
    </div>
    // <div>
    //   {x !== null && y !== null ? (
    //     <StyledSquare color="red" />
    //   ) : (
    //     <StyledSquare />
    //   )}
    // </div>
  );
};

const StyledSquare = styled.div`
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
