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
  AddObstacles(fieldInfo, field);
  return (
    <StyledField column={fieldInfo.Height} row={fieldInfo.Width}>
      {field.map((xItems) =>
        xItems.map((yItems, y) => <div key={y}>{yItems}</div>)
      )}
    </StyledField>
  );
};

const AddObstacles = (fieldInfo, field) => {
  if (fieldInfo.Obstacles.length === 0) return;

  fieldInfo.Obstacles.map((item) => {
    field[item.XPosition][item.YPosition] = (
      <StyledSquare color="black">#</StyledSquare>
    );
  });
};

const AddTanks = (fieldInfo, field) => {
  if (fieldInfo.Tanks.length === 0) return;

  fieldInfo.Tanks.map((item) => {
    field[item.XPosition][item.YPosition] = (
      <StyledSquare color="red">{item.Name}</StyledSquare>
    );
  });
};

const FillField = (fieldInfo, field) => {
  if (fieldInfo.Width === 0 || fieldInfo.Height === 0) return;

  for (let x = 0; x < fieldInfo.Width; x++) {
    var column = [];
    for (let y = 0; y < fieldInfo.Height; y++) {
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
