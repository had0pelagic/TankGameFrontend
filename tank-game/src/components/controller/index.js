import { useEffect } from "react";
import useTank from "../../hooks/tank";
import useUser from "../../hooks/user";
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
  const tankMethods = useTank();
  const userMethods = useUser();

  useEffect(() => {
    onKeyPress(
      keyDown,
      setKeyDown,
      setField,
      setAttackInfo,
      tankMethods.tankAttack,
      tankMethods.tankLeft,
      tankMethods.tankRight,
      tankMethods.tankDown,
      tankMethods.tankUp,
      tankMethods.tankRotateLeft,
      tankMethods.tankRotateRight
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
              onClick={() => tankMethods.tankRotateLeft(setField)}
            >
              ↺
            </button>
            <button
              className="controller-button"
              onClick={() => tankMethods.tankUp(setField)}
            >
              ↑
            </button>
            <button
              className="controller-button"
              onClick={() => tankMethods.tankRotateRight(setField)}
            >
              ↻
            </button>
            <button
              className="controller-button"
              onClick={() => tankMethods.tankLeft(setField)}
            >
              ←
            </button>
            <button
              className="controller-button"
              onClick={() => tankMethods.tankDown(setField)}
            >
              ↓
            </button>

            <button
              className="controller-button"
              onClick={() => tankMethods.tankRight(setField)}
            >
              →
            </button>
          </div>

          <button
            className="action-button"
            onClick={() => tankMethods.tankAttack(setField, setAttackInfo)}
          >
            ATTACK
          </button>

          <button
            className="action-button"
            onClick={() => userMethods.removeUser(setField)}
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
              userMethods.createUser(userModel, setField, setUserValid)
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
