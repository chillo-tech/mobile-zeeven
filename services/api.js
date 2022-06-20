import axios from "axios";
import TokenService from "./token.services";

const instance = axios.create({
  baseURL: "http://localhost:8087/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(

  (config) => {
    const token = TokenService.getLocalAccessToken();
    condo
    if (token) {
       config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
      //config.headers["x-access-token"] = token; // for Node.js Express back-end  
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) =>  {
		return res
	}, async function (error) {
		const originalRequest = error.config;
		if ([401, 403].includes(error.response.status) && !originalRequest._retry) {
			/*
			originalRequest._retry = true;
			const newAccessToken = await refreshAccessToken();
			axios.defaults.headers.common['Cookie'] = `accessToken=${newAccessToken};`;
			axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
			return protectedAxios(originalRequest);

			 */
		}
		return Promise.reject(error);
	}
);


export default instance;