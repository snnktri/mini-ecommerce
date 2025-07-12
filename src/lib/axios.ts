import axios from "axios";

const api = axios.create({
  baseURL: "https://api.freeapi.app/api/v1/public",
  headers: {
    "Content-Type": "application/json",
  }
});

export default api;