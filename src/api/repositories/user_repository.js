export default (axios) => ({
  async isUserValid(data) {
    return await axios.post("user-valid", data);
  },
  async createUser(data) {
    return await axios.post("user", data);
  },
  async removeUser(data) {
    return await axios.post("user-remove", data);
  },
});
