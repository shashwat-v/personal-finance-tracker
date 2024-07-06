import axios from "axios";

// instance of Axios with default settings
const apiClient = axios.create({
  baseURL: "http://localhost:3000", //backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});
interface userDataType {
  fullname: string;
  email: string;
  password: string;
  phoneNumber: string;
}
// User registration
export const registerUser = async (userData: userDataType) => {
  try {
    const response = await apiClient.post("/api/user/register", userData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

interface loginDataType {
  email: string;
  password: string;
}
// User login
export const loginUser = async (loginData: loginDataType) => {
  try {
    const response = await apiClient.post("/api/user/login", loginData);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
