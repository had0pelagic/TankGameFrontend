import "./App.css";
import { useEffect, useState } from "react";
import Field from "./components/field";
import Api from "./api";
import useSession from "./api/hooks/session";
import { Randomizer } from "./util/randomizer";

export default function App() {
  const [userData, setUserData] = useState();
  const [saveUserData, removeUserData, getUserData] = useSession();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) {
      getField(setField);
      setStarted(true);
    } else {
      setInterval(() => {
        getField(setField);
        var data = getUserData("user");
        if (data === undefined) {
          console.log("no user data lol");
        } else {
          console.log();
          setUserData(data);
        }
      }, 500);
    }
  }, [started]);

  // var fieldInfo = {
  //   Width: 4,
  //   Height: 4,
  //   LeftBorder: 0,
  //   RightBorder: 100,
  //   TopBorder: 0,
  //   BottomBorder: 100,
  //   Tanks: [
  //     {
  //       Owner: { Username: "user1" },
  //       Name: "tank1",
  //       XPosition: 0,
  //       YPosition: 1,
  //     },
  //     {
  //       Owner: { Username: "user2" },
  //       Name: "tank2",
  //       XPosition: 2,
  //       YPosition: 2,
  //     },
  //   ],
  //   Obstacles: [
  //     {
  //       XPosition: 3,
  //       YPosition: 3,
  //     },
  //     {
  //       XPosition: 1,
  //       YPosition: 2,
  //     },
  //   ],
  // };
  var user_model = {
    name: Randomizer.randomizeUsername(),
    password: Randomizer.randomizeUsername(),
  };
  const [fieldInfo, setField] = useState(null);

  return (
    <div className="App">
      <div className="App-header">
        {fieldInfo ? (
          <>
            {/* <div className="rot">^</div> */}
            <Field fieldInfo={fieldInfo} />
            <div className="user-panel">
              {userData ? (
                <div className="user-info">{userData.username}</div>
              ) : (
                <></>
              )}

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
              </div>
              <button
                onClick={() => createUser(user_model, setField, saveUserData)}
              >
                ADD MY TANK
              </button>
              <button
                className="controller-button"
                onClick={() =>
                  removeUser(setField, removeUserData, getUserData)
                }
              >
                REMOVE MY TANK
              </button>
              <button
                className="controller-button"
                onClick={() => tankAttack(setField, getUserData)}
              >
                ATTACK
              </button>
              <button
                className="controller-button"
                onClick={() => tankRotateLeft(setField, getUserData)}
              >
                ROTATE LEFT
              </button>
              <button
                className="controller-button"
                onClick={() => tankRotateRight(setField, getUserData)}
              >
                ROTATE RIGHT
              </button>
            </div>
          </>
        ) : (
          <div style={{ color: "gray" }}>
            FIELD DOES NOT EXIST
            <button
              onClick={() => createUser(user_model, setField, saveUserData)}
            >
              CREATE USER
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

async function getUser() {
  var response = await Api.user.getUser();

  if (response.status === 200) {
    console.log(response);
  } else {
    console.log(response.message);
  }
}

async function createUser(create_user_model, setField, saveUserData) {
  var response = await Api.user.createUser(create_user_model);
  var local_user_info = {
    username: create_user_model.name,
    tank_name: create_user_model.name + "_tank",
  };

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
    getField(setField);
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
