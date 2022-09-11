import Api from "../../api";

export default function useField() {
  async function getField(setField) {
    var response = await Api.field.getField();

    if (response.status === 200) {
      setField(response.response);
    } else {
      console.log("no players");
    }
  }

  return {
    getField,
  };
}
