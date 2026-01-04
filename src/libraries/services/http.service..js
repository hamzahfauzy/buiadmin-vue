import axios from "axios";
import Swal from "sweetalert2";

const HttpService = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
  // timeout: 10000,
});

// request interceptor (tambah token)
HttpService.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// response interceptor (tangani error global)
HttpService.interceptors.response.use(
  (response) => response,
  (error) => {
    // if (error.response?.status === 401) {
    //   window.location.href = "/auth/login";
    // }
    if (error.response?.status === 403) {
      // window.location.href = "/auth/login";
      Swal.fire({
        title: 'Unauthorize',
        text: 'Mohon maaf request tidak dapat dilakukan!',
        icon: 'warning',
        confirmButtonText: 'OK'
      })
    }
    return Promise.reject(error);
  }
);

export default HttpService;