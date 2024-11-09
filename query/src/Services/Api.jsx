// import axios from "axios";

// // Create Axios instance
// const api = axios.create({
//   baseURL: "https://fakestoreapi.com/",
// });

// // Add a request interceptor
// api.interceptors.request.use(
//   (req) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       req.headers.Authorization = `Bearer ${token}`;
//     }
//     return req;
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// export default api;
import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "https://fakestoreapi.com/",
});

export default api;
