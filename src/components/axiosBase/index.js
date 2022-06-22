import axios from "axios";

const instance = axios.create({
  baseURL: "https://api-fig.herokuapp.com/figfinance",
});

instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = JSON.parse(localStorage.getItem("FigToken"));
  config.headers["Authorization"] = "Bearer " + token;
  return config;
});

export default instance;
