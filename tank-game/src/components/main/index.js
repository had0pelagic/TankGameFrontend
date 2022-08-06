import "./style.css";
import { useEffect, useState } from "react";
import Field from "../field/index";
import Api from "../../api/index";
import useSession from "../../api/hooks/session";
import { Randomizer } from "../../util/randomizer";
import Controller from "../controller";

export default function Main() {
  const [userValid, setUserValid] = useState(null);
  const [userData, setUserData] = useState(null);
  const [started, setStarted] = useState(false);
  const [fieldInfo, setField] = useState(null);
  const [attackInfo, setAttackInfo] = useState(null);
  const [keyDown, setKeyDown] = useState(null);
  const [saveUserData, removeUserData, getUserData] = useSession();
  var userModel = {
    name: Randomizer.randomizeUsername(),
    password: Randomizer.randomizeUsername(),
  };

  useEffect(() => {
    mainFlow(
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
      tabIndex={-1}
      onKeyDown={(e) => onKeyPress(e, fieldInfo, userValid, setKeyDown)}
    >
      <div className="App-header">
        {fieldInfo ? (
          <>
            <Field fieldInfo={fieldInfo} attackInfo={attackInfo} />
            <Controller
              userValid={userValid}
              userData={userData}
              setField={setField}
              getField={getField}
              setAttackInfo={setAttackInfo}
              userModel={userModel}
              setUserValid={setUserValid}
              removeUser={removeUser}
              createUser={createUser}
              setKeyDown={setKeyDown}
              keyDown={keyDown}
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

async function onKeyPress(e, fieldInfo, userValid, setKeyDown) {
  if (fieldInfo && userValid) {
    switch (e.keyCode) {
      case 32: //space
        setKeyDown(32);
        break;
      case 37: //left arrow
        setKeyDown(37);
        break;
      case 39: //right arrow
        setKeyDown(39);
        break;
      case 40: //down arrow
        setKeyDown(40);
        break;
      case 38: //up arrow
        setKeyDown(38);
        break;
      case 81: //q
        setKeyDown(81);
        break;
      case 82: //r
        setKeyDown(82);
        break;
      default:
    }
  }
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

function mainFlow(
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
    console.log("no players");
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
