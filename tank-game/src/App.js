import "./App.css";
// import styled from "styled-components";
import { useEffect, useState } from "react";
import Field from "./components/field";
import api from "./api";

export default function App() {
  useEffect(() => {
    getField(setField);
  }, []);

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
  var tank_movement_model = {
    owner: {
      username: "string",
    },
    tank: {
      name: "string",
    },
  };
  var create_user1_model = { name: "user1", password: "123" };
  var create_user2_model = { name: "user2", password: "123" };
  const [fieldInfo, setField] = useState(null);

  return (
    <div className="App">
      <div className="App-header">
        {fieldInfo ? (
          <>
            <Field fieldInfo={fieldInfo} />
            <div className="user-panel">
              <div className="user-info">Username</div>
              <div className="controller-container">
                <button
                  className="controller-button"
                  onClick={() => tankUp(setField, tank_movement_model)}
                >
                  ↑
                </button>
                <button
                  className="controller-button"
                  onClick={() => tankDown(setField, tank_movement_model)}
                >
                  ↓
                </button>
                <button
                  className="controller-button"
                  onClick={() => tankLeft(setField, tank_movement_model)}
                >
                  ←
                </button>
                <button
                  className="controller-button"
                  onClick={() => tankRight(setField, tank_movement_model)}
                >
                  →
                </button>
              </div>
              <button onClick={() => createUser(create_user1_model)}>
                create user1
              </button>
              <button onClick={() => createUser(create_user2_model)}>
                create user2
              </button>
              <button onClick={() => createUser(create_user1_model)}>
                add tank1 user1
              </button>
              <button onClick={() => createUser(create_user2_model)}>
                add tank2 user2
              </button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

async function getUser() {
  var response = await api.user.getUser();

  if (response.status === 200) {
    console.log(response);
  } else {
    alert(response.message);
  }
}

async function createUser(create_user_model) {
  var response = await api.user.createUser(create_user_model);

  if (response.status === 200) {
    console.log(response);
  } else {
    alert(response.message);
  }
}

async function getField(setField) {
  var response = await api.field.getField();

  if (response.status === 200) {
    setField(response.response);
  } else {
    alert(response.message);
  }
}

async function tankLeft(setField, tank_movement_model) {
  var response = await api.tank.tankLeft(tank_movement_model);

  if (response.status === 200) {
    getField(setField);
  } else {
    alert(response.message);
  }
}

async function tankRight(setField, tank_movement_model) {
  var response = await api.tank.tankRight(tank_movement_model);

  if (response.status === 200) {
    getField(setField);
  } else {
    alert(response.message);
  }
}

async function tankUp(setField, tank_movement_model) {
  var response = await api.tank.tankUp(tank_movement_model);

  if (response.status === 200) {
    getField(setField);
  } else {
    alert(response.message);
  }
}

async function tankDown(setField, tank_movement_model) {
  var response = await api.tank.tankDown(tank_movement_model);

  if (response.status === 200) {
    getField(setField);
  } else {
    alert(response.message);
  }
}
