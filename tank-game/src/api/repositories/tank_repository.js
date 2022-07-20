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
  async tankRotateLeft(data) {
    return await axios.post("tank-rotate-left", data);
  },
  async tankRotateRight(data) {
    return await axios.post("tank-rotate-right", data);
  },
  async tankDown(data) {
    return await axios.post("tank-down", data);
  },
  async tankAttack(data) {
    return await axios.post("tank-attack", data);
  },
});
