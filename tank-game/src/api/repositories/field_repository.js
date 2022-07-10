export default (axios) => ({
  async getField() {
    return await axios.get("field");
  },
});
