import "./style.css";
import { useEffect, useState } from "react";
import Field from "../field/index";
import Api from "../../api/index";
import useSession from "../../api/hooks/session";
import { Randomizer } from "../../util/randomizer";

export default function Main() {
  const [userValid, setUserValid] = useState(null);
  const [userData, setUserData] = useState(null);
  const [started, setStarted] = useState(false);
  const [fieldInfo, setField] = useState(null);
  const [attackInfo, setAttackInfo] = useState(null);
  const [saveUserData, removeUserData, getUserData] = useSession();
  var userModel = {
    name: Randomizer.randomizeUsername(),
    password: Randomizer.randomizeUsername(),
  };

  useEffect(() => {
    MainFlow(
      started,
      setField,
      setStarted,
      getUserData,
      setUserValid,
      setUserData,
      removeUserData,
      setAttackInfo
    );
  }, [started]);

  return (
    <div
      className="App"
      tabIndex={0}
      onKeyDown={(e) =>
        onKeyPress(
          e,
          fieldInfo,
          userValid,
          setField,
          getUserData,
          setAttackInfo
        )
      }
    >
      <div className="App-header">
        {fieldInfo ? (
          <>
            <Field fieldInfo={fieldInfo} attackInfo={attackInfo} />
            <Controller
              userValid={userValid}
              userData={userData}
              setField={setField}
              getUserData={getUserData}
              removeUserData={removeUserData}
              setAttackInfo={setAttackInfo}
              userModel={userModel}
              saveUserData={saveUserData}
              setUserValid={setUserValid}
            />
          </>
        ) : (
          <FieldStart
            userModel={userModel}
            setField={setField}
            saveUserData={saveUserData}
            getUserData={getUserData}
            setUserValid={setUserValid}
          />
        )}
      </div>
    </div>
  );
}

function FieldStart({
  userModel,
  setField,
  saveUserData,
  getUserData,
  setUserValid,
}) {
  return (
    <div className="field-start">
      <p className="field-start-paragraph">No game in progress</p>
      <p className="field-start-tip">Add tank to start playing</p>
      <button
        className="field-start-button"
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
    </div>
  );
}

function MainFlow(
  started,
  setField,
  setStarted,
  getUserData,
  setUserValid,
  setUserData,
  removeUserData,
  setAttackInfo
) {
  if (!started) {
    getField(setField);
    setStarted(true);
  } else {
    setInterval(() => {
      getField(setField);
      var data = getUserData();
      if (data !== null) {
        isUserValid(
          data.username,
          setUserValid,
          setUserData,
          removeUserData,
          getUserData
        );
      }
      setAttackInfo(null);
    }, 500);
  }
}

function Controller({
  userValid,
  userData,
  setField,
  getUserData,
  removeUserData,
  setAttackInfo,
  userModel,
  saveUserData,
  setUserValid,
}) {
  return (
    <div className="user-panel">
      {userValid ? (
        <>
          <div className="user-info">{userData.username}</div>
          <div className="controller-container">
            <button
              className="controller-button"
              onClick={() => tankUp(setField, getUserData)}
            >
              ↑
            </button>
            <button
              className="controller-button"
              onClick={() => tankDown(setField, getUserData)}
            >
              ↓
            </button>
            <button
              className="controller-button"
              onClick={() => tankLeft(setField, getUserData)}
            >
              ←
            </button>
            <button
              className="controller-button"
              onClick={() => tankRight(setField, getUserData)}
            >
              →
            </button>
            <button
              className="controller-button"
              onClick={() => tankRotateLeft(setField, getUserData)}
            >
              ↺
            </button>
            <button
              className="controller-button"
              onClick={() => tankRotateRight(setField, getUserData)}
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
            onClick={() => tankAttack(setAttackInfo)}
          >
            ATTACK
          </button>
        </>
      ) : (
        <>
          <button
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
            ADD MY TANK
          </button>
        </>
      )}
    </div>
  );
}

async function onKeyPress(
  e,
  fieldInfo,
  userValid,
  setField,
  getUserData,
  setAttackInfo
) {
  if (fieldInfo && userValid) {
    switch (e.keyCode) {
      case 32: //space
        await tankAttack(setField, getUserData, setAttackInfo);
        break;
      case 37: //left arrow
        await tankLeft(setField, getUserData);
        break;
      case 39: //right arrow
        await tankRight(setField, getUserData);
        break;
      case 40: //down arrow
        await tankDown(setField, getUserData);
        break;
      case 38: //up arrow
        await tankUp(setField, getUserData);
        break;
      case 81: //q
        await tankRotateLeft(setField, getUserData);
        break;
      case 82: //r
        await tankRotateRight(setField, getUserData);
        break;
      default:
    }
  }
}

async function isUserValid(
  username,
  setUserValid,
  setUserData,
  removeUserData,
  getUserData
) {
  var model = {
    username: username,
  };
  var response = await Api.user.isUserValid(model);

  if (response.status === 200) {
    setUserValid(response.response);
    if (!response.response) {
      await removeUserData();
    } else {
      var data = getUserData();
      setUserData(data);
    }
  } else {
    console.log(response.message);
  }
}

async function createUser(
  createUserModel,
  setField,
  saveUserData,
  getUserData,
  setUserValid
) {
  var response = await Api.user.createUser(createUserModel);
  var localUserInfo = {
    username: createUserModel.name,
    tankName: createUserModel.name + "_tank",
  };
  var data = getUserData();

  if (data !== null) {
    await isUserValid(data.username, setUserValid);
  }

  if (response.status === 200) {
    await createTank(setField, createUserModel);
    saveUserData(localUserInfo);
  } else {
    console.log(response.message);
  }
}

async function removeUser(setField, removeUserData, getUserData) {
  var data = getUserData();
  var localUserInfo = {
    username: data.username,
  };
  var response = await Api.user.removeUser(localUserInfo);

  if (response.status === 200) {
    removeUserData();
    await getField(setField);
    window.location.reload();
  } else {
    console.log(response.message);
  }
}

async function getField(setField) {
  var response = await Api.field.getField();

  if (response.status === 200) {
    setField(response.response);
  } else {
    console.log("nofield");
  }
}

async function createTank(setField, data) {
  var model = { owner: { username: data.name }, Name: data.name + "_tank" };
  var response = await Api.tank.createTank(model);

  if (response.status === 200) {
    await getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankLeft(setField, getUserData) {
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

async function tankRight(setField, getUserData) {
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

async function tankUp(setField, getUserData) {
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

async function tankDown(setField, getUserData) {
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

async function tankRotateLeft(setField, getUserData) {
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

async function tankRotateRight(setField, getUserData) {
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

async function tankAttack(setField, getUserData, setAttackInfo) {
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
