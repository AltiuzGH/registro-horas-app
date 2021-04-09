import { fetchWrapper } from "../fetch-wrapper.";

const getAll = () => {
  return fetchWrapper.get("/projects?offset=0&max_results=100");
};

const get = (id) => {
  return fetchWrapper.get(`/projects/${id}`);
};

const create = (data) => {
  return fetchWrapper.post("/projects", data);
};

export default {
  getAll,
  get,
  create,
};
