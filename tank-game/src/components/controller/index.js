import { useEffect } from "react";
import useApiMethods from "../../api/hooks/api_methods";
import "./style.css";

export default function Controller({
  userValid,
  userData,
  setField,
  setAttackInfo,
  userModel,
  setUserValid,
  setKeyDown,
  keyDown,
}) {
  const apiMethod = useApiMethods();

  useEffect(() => {
    onKeyPress(
      keyDown,
      setKeyDown,
      setField,
      setAttackInfo,
      apiMethod.tankAttack,
      apiMethod.tankLeft,
      apiMethod.tankRight,
      apiMethod.tankDown,
      apiMethod.tankUp,
      apiMethod.tankRotateLeft,
      apiMethod.tankRotateRight
    );
  }, [keyDown]);

  return (
    <div className="user-panel">
      {userValid ? (
        <>
          <div className="user-info">{userData.username}</div>

          <div className="controller-container">
            <button
              className="controller-button"
              onClick={() => apiMethod.tankRotateLeft(setField)}
            >
              ↺
            </button>
            <button
              className="controller-button"
              onClick={() => apiMethod.tankUp(setField)}
            >
              ↑
            </button>
            <button
              className="controller-button"
              onClick={() => apiMethod.tankRotateRight(setField)}
            >
              ↻
            </button>
            <button
              className="controller-button"
              onClick={() => apiMethod.tankLeft(setField)}
            >
              ←
            </button>
            <button
              className="controller-button"
              onClick={() => apiMethod.tankDown(setField)}
            >
              ↓
            </button>

            <button
              className="controller-button"
              onClick={() => apiMethod.tankRight(setField)}
            >
              →
            </button>
          </div>

          <button
            className="action-button"
            onClick={() => apiMethod.tankAttack(setField, setAttackInfo)}
          >
            ATTACK
          </button>

          <button
            className="action-button"
            onClick={() => apiMethod.removeUser(setField)}
          >
            REMOVE MY TANK
          </button>
        </>
      ) : (
        <>
          <button
            style={{ margin: "20%" }}
            className="action-button"
            onClick={() =>
              apiMethod.createUser(userModel, setField, setUserValid)
            }
          >
            ADD TANK
          </button>
        </>
      )}
    </div>
  );
}

async function onKeyPress(
  keyDown,
  setKeyDown,
  setField,
  setAttackInfo,
  tankAttack,
  tankLeft,
  tankRight,
  tankDown,
  tankUp,
  tankRotateLeft,
  tankRotateRight
) {
  switch (keyDown) {
    case 32: //space
      setKeyDown(null);
      await tankAttack(setField, setAttackInfo);
      break;
    case 37: //left arrow
      setKeyDown(null);
      await tankLeft(setField);
      break;
    case 39: //right arrow
      setKeyDown(null);
      await tankRight(setField);
      break;
    case 40: //down arrow
      setKeyDown(null);
      await tankDown(setField);
      break;
    case 38: //up arrow
      setKeyDown(null);
      await tankUp(setField);
      break;
    case 81: //q
      setKeyDown(null);
      await tankRotateLeft(setField);
      break;
    case 82: //r
      setKeyDown(null);
      await tankRotateRight(setField);
      break;
    default:
  }
}
