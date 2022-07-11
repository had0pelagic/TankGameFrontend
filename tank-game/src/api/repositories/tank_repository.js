export default (axios) => ({
  async createTank(data) {
    return await axios.post("tank", data);
  },
  async tankLeft(data) {
    return await axios.post("tank-left", data);
  },
  async tankRight(data) {
    return await axios.post("tank-right", data);
  },
  async tankUp(data) {
    return await axios.post("tank-up", data);
  },
  async tankDown(data) {
    return await axios.post("tank-down", data);
  },
});
