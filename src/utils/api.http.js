import axios from 'axios';
import { getToken } from '../helpers/common';
const API_ROOT = process.env.REACT_APP_API_URL;

const http = axios.create ({
    baseURL: API_ROOT,
    timeout: 259200,
    headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use (
  function (config) {
    const token = getToken();
    if (token) config.headers.common['x-auth-token'] = token;
    // console.log(token)
    return config;
  },
  function (error) {
    return Promise.reject (error);
  }
);

http.interceptors.response.use((response) => {
    return response;
}, function (error) {
    console.log(error.response);
    if(error.response)
    {
      return Promise.reject(error.response);
    }
    
});

export default http;