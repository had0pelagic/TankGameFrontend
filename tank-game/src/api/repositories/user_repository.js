export default (axios) => ({
  async getUser() {
    return await axios.get("get-user");
  },
  async createUser(data) {
    return await axios.post("user", data);
  },
});
