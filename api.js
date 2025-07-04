import axios from "axios";

// Flask backend base URL
const BASE_URL = "http://localhost:5000/api";

// Get all users
export const getUsers = () => axios.get(`${BASE_URL}/users`);

// Create new user
export const createUser = (user) => axios.post(`${BASE_URL}/users`, user);

// Download sample Excel file
export const downloadSample = () =>
  axios.get(`${BASE_URL}/sample`, { responseType: "blob" });

// Upload Excel file for bulk user creation
export const uploadExcel = (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${BASE_URL}/upload`, formData);
};
