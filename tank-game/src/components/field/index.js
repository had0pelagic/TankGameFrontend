import styled from "styled-components";
import "./style.css";

export default function Field({ fieldInfo, attackInfo }) {
  var field = [];

  return <>{RenderedField(fieldInfo, field, attackInfo)}</>;
}

const RenderedField = (fieldInfo, field, attackInfo) => {
  if (fieldInfo === null || fieldInfo === undefined) return;

  FillField(fieldInfo, field);
  AddTanks(fieldInfo, field);
  AddObstacles(fieldInfo, field);
  AddAttack(fieldInfo, field, attackInfo);

  return (
    <StyledField column={fieldInfo.height} row={fieldInfo.width}>
      {field.map((xItems) =>
        xItems.map((yItems, y) => <div key={y}>{yItems}</div>)
      )}
    </StyledField>
  );
};

const AddAttack = (fieldInfo, field, attackInfo) => {
  if (attackInfo === null || fieldInfo === null || field === undefined) return;

  switch (attackInfo.rotation) {
    case 0:
      for (var i = attackInfo.y - 1; i >= 0; i--) {
        field[i][attackInfo.x] = <StyledSquare color="orange">*</StyledSquare>;
      }
      break;

    case 180:
      for (var i = attackInfo.y + 1; i <= fieldInfo.height - 1; i++) {
        field[i][attackInfo.x] = <StyledSquare color="orange">*</StyledSquare>;
      }
      break;

    case 90:
      for (var i = attackInfo.x + 1; i <= fieldInfo.width - 1; i++) {
        field[attackInfo.y][i] = <StyledSquare color="orange">*</StyledSquare>;
      }
      break;

    case 270:
      for (var i = attackInfo.x - 1; i >= 0; i--) {
        field[attackInfo.y][i] = <StyledSquare color="orange">*</StyledSquare>;
      }
      break;

    default:
      return;
  }
};

const AddObstacles = (fieldInfo, field) => {
  if (fieldInfo.obstacles.length === 0) return;

  fieldInfo.obstacles.map((item) => {
    field[item.yPosition][item.xPosition] = (
      <StyledSquare color="black">#</StyledSquare>
    );
  });
};

const AddTanks = (fieldInfo, field) => {
  if (fieldInfo.tanks.length === 0) return;

  fieldInfo.tanks.map((item) => {
    field[item.yPosition][item.xPosition] = (
      <StyledSquare color="red" rotation={item.rotation}>
        {item.name[0] + "T^"}
      </StyledSquare>
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
  -webkit-transform: rotate(
    ${(props) =>
      props.rotation !== undefined ? props.rotation + "deg" : "0deg"}
  );
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
