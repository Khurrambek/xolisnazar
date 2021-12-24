import axios from "axios";

export default axios.create({
  baseURL:
    // "http://localhost:8080/index",
    "http://xolisnazar.uz/api/index",
  headers: {
    "Content-type": "application/json",
  },
});
