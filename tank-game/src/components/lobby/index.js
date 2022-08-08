import useApiMethods from "../../api/hooks/api_methods";
import "./style.css";

export default function Lobby({ userModel, setField, setUserValid }) {
  const apiMethod = useApiMethods();

  return (
    <div className="field-start">
      <p className="field-start-paragraph">No game in progress</p>
      <p className="field-start-tip">Add tank to start playing</p>
      <button
        className="field-start-button"
        onClick={() => apiMethod.createUser(userModel, setField, setUserValid)}
      >
        ADD TANK
      </button>
    </div>
  );
}
