// import axios from "axios";
// import { config } from "../config";

// export async function registerUser(data) {
//   return await axios.post(`${config.api_host}/auth/register`, data);
// }

// export async function login(formData) {
//   return await axios.post(`${config.api_host}/api/login`, formData);
// }

// export async function logout() {
//   let { token } = localStorage.getItem("auth")
//     ? JSON.parse(localStorage.getItem("auth"))
//     : {};
//   return await axios
//     .post(`${config.api_host}/api/logout`, null, {
//       header: {
//         authorization: `Bearer ${token}`,
//       },
//     })
//     .then((response) => {
//       localStorage.removeItem("auth");
//       return response;
//     });
// }
