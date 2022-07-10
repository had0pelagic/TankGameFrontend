import styled from "styled-components";
import "./style.css";

export default function Field({ fieldInfo }) {
  var field = [];

  return <>{RenderedField(fieldInfo, field)}</>;
}

const RenderedField = (fieldInfo, field) => {
  if (fieldInfo === null || fieldInfo === undefined) return;

  FillField(fieldInfo, field);
  AddTanks(fieldInfo, field);
  // AddObstacles(fieldInfo, field);
  return (
    <StyledField column={fieldInfo.height} row={fieldInfo.width}>
      {field.map((xItems) =>
        xItems.map((yItems, y) => <div key={y}>{yItems}</div>)
      )}
    </StyledField>
  );
};

const AddObstacles = (fieldInfo, field) => {
  if (fieldInfo.obstacles.length === 0) return;

  fieldInfo.Obstacles.map((item) => {
    field[item.yPosition][item.xPosition] = (
      <StyledSquare color="black">#</StyledSquare>
    );
  });
};

const AddTanks = (fieldInfo, field) => {
  if (fieldInfo.tanks.length === 0) return;

  fieldInfo.tanks.map((item) => {
    field[item.yPosition][item.xPosition] = (
      <StyledSquare color="red">{item.name}</StyledSquare>
    );
  });
};

const FillField = (fieldInfo, field) => {
  if (fieldInfo.width === 0 || fieldInfo.height === 0) return;

  for (let x = 0; x < fieldInfo.width; x++) {
    var column = [];
    for (let y = 0; y < fieldInfo.height; y++) {
      column.push(<StyledSquare />);
    }
    field.push(column);
  }
};

const StyledSquare = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.color !== undefined ? props.color : "rgb(10, 42, 97)"};
  width: 100px;
  height: 100px;
  margin: 6px;
`;

const StyledField = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  align-content: center;
  grid-template-columns: repeat(${(props) => props.column}, auto);
  grid-template-rows: repeat(${(props) => props.row}, auto);
  grid-gap: 0px 0px;
`;
