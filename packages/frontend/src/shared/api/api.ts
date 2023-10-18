import axios from "axios";

export const $api = axios.create({
  baseURL: __API__,
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`
  },
});
