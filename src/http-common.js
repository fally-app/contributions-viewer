import axios from "axios";

export default axios.create({
  baseURL: "https://s-collector.herokuapp.com/",
  headers: {
    "Content-type": "application/json",
  },
});
