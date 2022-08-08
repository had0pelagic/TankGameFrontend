import "./style.css";
import { useEffect, useState } from "react";
import Field from "../field/index";
import useApiMethods from "../../api/hooks/api_methods";
import useSession from "../../api/hooks/session";
import { Randomizer } from "../../util/randomizer";
import Controller from "../controller";
import Lobby from "../lobby";

export default function Main() {
  const [userValid, setUserValid] = useState(null);
  const [userData, setUserData] = useState(null);
  const [started, setStarted] = useState(false);
  const [fieldInfo, setField] = useState(null);
  const [attackInfo, setAttackInfo] = useState(null);
  const [keyDown, setKeyDown] = useState(null);

  const session = useSession();
  const apiMethod = useApiMethods();

  var userModel = {
    name: Randomizer.randomizeUsername(),
    password: Randomizer.randomizeUsername(),
  };

  useEffect(() => {
    mainFlow(
      started,
      setStarted,
      setField,
      session.getUserData,
      setUserValid,
      setUserData,
      setAttackInfo,
      apiMethod.getField,
      apiMethod.isUserValid
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
              setAttackInfo={setAttackInfo}
              userModel={userModel}
              setUserValid={setUserValid}
              setKeyDown={setKeyDown}
              keyDown={keyDown}
            />
          </>
        ) : (
          <Lobby
            userModel={userModel}
            setField={setField}
            setUserValid={setUserValid}
          />
        )}
      </div>
    </div>
  );
}

function onKeyPress(e, fieldInfo, userValid, setKeyDown) {
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

function mainFlow(
  started,
  setStarted,
  setField,
  getUserData,
  setUserValid,
  setUserData,
  setAttackInfo,
  getField,
  isUserValid
) {
  if (!started) {
    getField(setField);
    setStarted(true);
  } else {
    setInterval(() => {
      getField(setField);
      var data = getUserData();
      if (data !== null) {
        isUserValid(data.username, setUserValid, setUserData);
      }
      setAttackInfo(null);
    }, 500);
  }
}
