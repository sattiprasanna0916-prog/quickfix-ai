import axios from "axios";

const API = axios.create({
  baseURL: "https://quickfix-ai-ayf3.onrender.com"
});

export default API;