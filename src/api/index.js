import axios from "axios";
import field_repository from "./repositories/field_repository";
import tank_repository from "./repositories/tank_repository";
import user_repository from "./repositories/user_repository";

const instance = axios.create({ baseURL: "https://localhost:7270/" });

const handleSuccessResponse = (response) => {
  return {
    response: response.data,
    status: response.status,
  };
};

const handleErrorResponse = (response) => {
  return {
    message: response.response.data,
    status: response.response.status,
  };
};

const api = {
  get: async (path) => {
    return instance
      .get(path)
      .then(async function (response) {
        return handleSuccessResponse(response);
      })
      .catch(async function (response) {
        return handleErrorResponse(response);
      });
  },

  post: async (path, data) => {
    return instance
      .post(path, data)
      .then(async function (response) {
        return handleSuccessResponse(response);
      })
      .catch(async function (response) {
        return handleErrorResponse(response);
      });
  },
};

const repositories = {
  user: user_repository(api),
  field: field_repository(api),
  tank: tank_repository(api),
};

export default { ...repositories };
