import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: true, // optional, use if dealing with cookies/sessions
});

export default api;
