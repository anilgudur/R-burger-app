import axios from "axios";

const axiosOrderInstance = axios.create({
  baseURL: "https://r-burger-app.firebaseio.com"
});

export default axiosOrderInstance;
