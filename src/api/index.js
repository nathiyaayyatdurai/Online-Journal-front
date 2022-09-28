import axios from "axios";

const URL = "https://app4-backend.herokuapp.com";

export default axios.create({
  baseURL: URL,
});
