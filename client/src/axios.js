import axios from "axios";

export default axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://audiophile-e-commerce.herokuapp.com/"
      : "http://localhost:5010",
  withCredentials: true,
});
