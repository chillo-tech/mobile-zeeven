import axios from 'axios';

const QrCodeVerification = () => {
    const defaultOptions = {
        baseURL: 'http://localhost:8087/api' ,
        headers: { 
          "Access-Control-Allow-Origin": "*",
          'Content-Type': 'application/json',
        },
    }

    const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(async (request) => {
    const token = sessionStorage.getItem("TOKEN");
    if (token && request.headers) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error)
      const {response: {status}} = error;
      if(Number(status) === 401) {

      }
      return Promise.reject(error);
    },
  );

  return instance;

}

export {QrCodeVerification}