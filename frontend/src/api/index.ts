import axios from "axios";

export const apiAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
  });

  apiAxios.interceptors.response.use(
    response => response,
    async error => {
      if (error.response?.status === 401) {
        // window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );