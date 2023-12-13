import axios from "axios";

import { BACKEND_API } from "@yourapp/config-global";

const axiosInstance = axios.create({
  baseURL: BACKEND_API,
});

axiosInstance.interceptors.request.use(
  (response) => response,
  (error) => {
    Promise.reject(error);
  }
);

const cancelToken = axios.CancelToken;

export default axiosInstance;
export { cancelToken };
