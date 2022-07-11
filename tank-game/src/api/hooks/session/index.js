export default function useSession() {
  function saveUserData(key, data) {
    sessionStorage.setItem(key, JSON.stringify(data));
  }
  function removeUserData(key) {
    sessionStorage.removeItem(key);
  }
  function getUserData(key) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  return [saveUserData, removeUserData, getUserData];
}
