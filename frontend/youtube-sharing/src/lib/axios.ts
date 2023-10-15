import axios from "axios";

export const axiosClient = axios.create({
  // baseURL: process.env.REACT_APP_API_URL,
  baseURL: "https://api-local.youtubesharing.com:3001/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
