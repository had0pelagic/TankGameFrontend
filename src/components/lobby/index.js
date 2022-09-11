import useUser from "../../hooks/user";
import "./style.css";

export default function Lobby({ userModel, setField, setUserValid }) {
  const userMethods = useUser();

  return (
    <div className="field-start">
      <p className="field-start-paragraph">No game in progress</p>
      <p className="field-start-tip">Add tank to start playing</p>
      <button
        className="field-start-button"
        onClick={() =>
          userMethods.createUser(userModel, setField, setUserValid)
        }
      >
        ADD TANK
      </button>
    </div>
  );
}
