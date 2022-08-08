export default function useSession() {
  function saveUserData(data) {
    sessionStorage.setItem("user", JSON.stringify(data));
  }
  function removeUserData() {
    sessionStorage.removeItem("user");
  }
  function getUserData() {
    return JSON.parse(sessionStorage.getItem("user"));
  }

  return {saveUserData, removeUserData, getUserData};
}
