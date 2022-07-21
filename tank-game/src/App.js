import "./App.css";
import { useEffect, useState } from "react";
import Field from "./components/field";
import Api from "./api";
import useSession from "./api/hooks/session";
import { Randomizer } from "./util/randomizer";

export default function App() {
  const [userValid, setUserValid] = useState();
  const [userData, setUserData] = useState();
  const [started, setStarted] = useState(false);
  const [fieldInfo, setField] = useState();
  const [saveUserData, removeUserData, getUserData] = useSession();
  var user_model = {
    name: Randomizer.randomizeUsername(),
    password: Randomizer.randomizeUsername(),
  };

  useEffect(() => {
    if (!started) {
      getField(setField);
      setStarted(true);
    } else {
      setInterval(() => {
        getField(setField);
        var data = getUserData("user");
        if (data !== null) {
          isUserValid(
            data.username,
            setUserValid,
            setUserData,
            removeUserData,
            getUserData
          );
        }
      }, 500);
    }
  }, [started]);

  const onKeyPress = (e) => {
    console.log(e.keyCode);
    if (fieldInfo && userValid) {
      switch (e.keyCode) {
        case 32: //space
          tankAttack(setField, getUserData);
          break;
        case 37: //left arrow
          tankLeft(setField, getUserData);
          break;
        case 39: //right arrow
          tankRight(setField, getUserData);
          break;
        case 40: //down arrow
          tankDown(setField, getUserData);
          break;
        case 38: //up arrow
          tankUp(setField, getUserData);
          break;
        case 81: //q
          tankRotateLeft(setField, getUserData);
          break;
        case 82: //r
          tankRotateRight(setField, getUserData);
          break;
        default:
      }
    }
  };

  return (
    <div className="App" tabIndex={0} onKeyDown={(e) => onKeyPress(e)}>
      <div className="App-header">
        {fieldInfo ? (
          <>
            <Field fieldInfo={fieldInfo} />
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
                  <p className="control-guide">
                    arr_u arr_d arr_l arr_r q r space
                  </p>
                  <button
                    className="action-button"
                    onClick={() =>
                      removeUser(setField, removeUserData, getUserData)
                    }
                  >
                    REMOVE MY TANK
                  </button>
                  <button
                    className="action-button"
                    onClick={() => tankAttack(setField, getUserData)}
                  >
                    ATTACK
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      createUser(
                        user_model,
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
          </>
        ) : (
          <div style={{ color: "gray" }}>
            FIELD DOES NOT EXIST
            <button
              onClick={() =>
                createUser(
                  user_model,
                  setField,
                  saveUserData,
                  getUserData,
                  setUserValid
                )
              }
            >
              CREATE USER
            </button>
          </div>
        )}
      </div>
    </div>
  );
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
      await removeUserData("user");
    } else {
      var user_data = getUserData("user");
      setUserData(user_data);
    }
  } else {
    console.log(response.message);
  }
}

async function createUser(
  create_user_model,
  setField,
  saveUserData,
  getUserData,
  setUserValid
) {
  var response = await Api.user.createUser(create_user_model);
  var local_user_info = {
    username: create_user_model.name,
    tank_name: create_user_model.name + "_tank",
  };
  var user_data = getUserData("user");

  if (user_data !== null) {
    await isUserValid(user_data.username, setUserValid);
  }

  if (response.status === 200) {
    await createTank(setField, create_user_model);
    saveUserData("user", local_user_info);
  } else {
    console.log(response.message);
  }
}

async function removeUser(setField, removeUserData, getUserData) {
  var data = getUserData("user");
  var local_user_info = {
    username: data.username,
  };
  var response = await Api.user.removeUser(local_user_info);

  if (response.status === 200) {
    removeUserData("user");
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
    getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankLeft(setField, getUserData) {
  var data = getUserData("user");
  var tank_movement_model = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tank_name,
    },
  };
  var response = await Api.tank.tankLeft(tank_movement_model);

  if (response.status === 200) {
    getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankRight(setField, getUserData) {
  var data = getUserData("user");
  var tank_movement_model = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tank_name,
    },
  };
  var response = await Api.tank.tankRight(tank_movement_model);

  if (response.status === 200) {
    getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankUp(setField, getUserData) {
  var data = getUserData("user");
  var tank_movement_model = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tank_name,
    },
  };
  var response = await Api.tank.tankUp(tank_movement_model);

  if (response.status === 200) {
    getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankDown(setField, getUserData) {
  var data = getUserData("user");
  var tank_movement_model = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tank_name,
    },
  };
  var response = await Api.tank.tankDown(tank_movement_model);

  if (response.status === 200) {
    getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankRotateLeft(setField, getUserData) {
  var data = getUserData("user");
  var tank_movement_model = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tank_name,
    },
  };
  var response = await Api.tank.tankRotateLeft(tank_movement_model);

  if (response.status === 200) {
    getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankRotateRight(setField, getUserData) {
  var data = getUserData("user");
  var tank_movement_model = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tank_name,
    },
  };
  var response = await Api.tank.tankRotateRight(tank_movement_model);

  if (response.status === 200) {
    getField(setField);
  } else {
    console.log(response.message);
  }
}

async function tankAttack(setField, getUserData) {
  var data = getUserData("user");
  var tank_movement_model = {
    owner: {
      username: data.username,
    },
    tank: {
      name: data.tank_name,
    },
  };
  var response = await Api.tank.tankAttack(tank_movement_model);

  if (response.status === 200) {
    getField(setField);
  } else {
    console.log(response.message);
  }
}
