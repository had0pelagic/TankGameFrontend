import { useEffect } from "react";
import Api from "../../api";
import useSession from "../../api/hooks/session";

export default function Controller({
  userValid,
  userData,
  setField,
  getField,
  setAttackInfo,
  userModel,
  setUserValid,
  removeUser,
  createUser,
  setKeyDown,
  keyDown,
}) {
  const [saveUserData, removeUserData, getUserData] = useSession();

  useEffect(() => {
    onKeyPress(
      keyDown,
      setKeyDown,
      setField,
      getField,
      getUserData,
      setAttackInfo
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
              onClick={() => tankUp(setField, getField, getUserData)}
            >
              ↑
            </button>
            <button
              className="controller-button"
              onClick={() => tankDown(setField, getField, getUserData)}
            >
              ↓
            </button>
            <button
              className="controller-button"
              onClick={() => tankLeft(setField, getField, getUserData)}
            >
              ←
            </button>
            <button
              className="controller-button"
              onClick={() => tankRight(setField, getField, getUserData)}
            >
              →
            </button>
            <button
              className="controller-button"
              onClick={() => tankRotateLeft(setField, getField, getUserData)}
            >
              ↺
            </button>
            <button
              className="controller-button"
              onClick={() => tankRotateRight(setField, getField, getUserData)}
            >
              ↻
            </button>
          </div>

          <p className="control-guide">arr_u arr_d arr_l arr_r q r space</p>

          <button
            className="action-button"
            onClick={() => removeUser(setField, removeUserData, getUserData)}
          >
            REMOVE MY TANK
          </button>
          <button
            className="action-button"
            onClick={() =>
              tankAttack(setField, getField, getUserData, setAttackInfo)
            }
          >
            ATTACK
          </button>
        </>
      ) : (
        <>
          <button
            style={{ margin: "20%" }}
            className="action-button"
            onClick={() =>
              createUser(
                userModel,
                setField,
                saveUserData,
                getUserData,
                setUserValid
              )
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
  getField,
  getUserData,
  setAttackInfo
) {
  switch (keyDown) {
    case 32: //space
      setKeyDown(null);
      await tankAttack(setField, getField, getUserData, setAttackInfo);
      break;
    case 37: //left arrow
      setKeyDown(null);
      await tankLeft(setField, getField, getUserData);
      break;
    case 39: //right arrow
      setKeyDown(null);
      await tankRight(setField, getField, getUserData);
      break;
    case 40: //down arrow
      setKeyDown(null);
      await tankDown(setField, getField, getUserData);
      break;
    case 38: //up arrow
      setKeyDown(null);
      await tankUp(setField, getField, getUserData);
      break;
    case 81: //q
      setKeyDown(null);
      await tankRotateLeft(setField, getField, getUserData);
      break;
    case 82: //r
      setKeyDown(null);
      await tankRotateRight(setField, getField, getUserData);
      break;
    default:
  }
}

async function tankLeft(setField, getField, getUserData) {
  var data = getUserData();
  var tankMovementModel = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tankName,
    },
  };
  var response = await Api.tank.tankLeft(tankMovementModel);

  if (response.status === 200) {
    await getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankRight(setField, getField, getUserData) {
  var data = getUserData();
  var tankMovementModel = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tankName,
    },
  };
  var response = await Api.tank.tankRight(tankMovementModel);

  if (response.status === 200) {
    await getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankUp(setField, getField, getUserData) {
  var data = getUserData();
  var tankMovementModel = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tankName,
    },
  };
  var response = await Api.tank.tankUp(tankMovementModel);

  if (response.status === 200) {
    await getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankDown(setField, getField, getUserData) {
  var data = getUserData();
  var tankMovementModel = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tankName,
    },
  };
  var response = await Api.tank.tankDown(tankMovementModel);

  if (response.status === 200) {
    await getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankRotateLeft(setField, getField, getUserData) {
  var data = getUserData();
  var tankMovementModel = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tankName,
    },
  };
  var response = await Api.tank.tankRotateLeft(tankMovementModel);

  if (response.status === 200) {
    await getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankRotateRight(setField, getField, getUserData) {
  var data = getUserData();
  var tankMovementModel = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tankName,
    },
  };
  var response = await Api.tank.tankRotateRight(tankMovementModel);

  if (response.status === 200) {
    await getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankAttack(setField, getField, getUserData, setAttackInfo) {
  var data = getUserData();
  var tankMovementModel = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tankName,
    },
  };
  var response = await Api.tank.tankAttack(tankMovementModel);

  if (response.status === 200) {
    var attackModel = {
      x: response.response.xPosition,
      y: response.response.yPosition,
      rotation: response.response.rotation,
    };
    setAttackInfo(attackModel);
    await getField(setField);
  } else {
    console.log(response.message);
  }
}
