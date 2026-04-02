import axios from "axios";
export const api = axios.create({
  // baseURL: `http://localhost:7780/api`,
   baseURL: `/api`,
});
// export const host = "http://localhost:7780";
 export const host = "/";
