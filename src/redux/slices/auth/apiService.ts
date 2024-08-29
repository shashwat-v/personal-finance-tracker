import axios from "axios";

// Instance of Axios with default settings
const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Backend base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Allow sending cookies with requests
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
    const response = await apiClient.post("/api/user/register", userData, {
      withCredentials: true,
    });
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
    const response = await apiClient.post("/api/user/login", loginData, {
      withCredentials: true,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

// Check if user is authenticated
export const checkAuth = async () => {
  try {
    const response = await apiClient.get("/api/user/check-auth");
    console.log("User is authenticated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

export const logoutUser = async () => {
  try {
    // Make a POST request to the logout endpoint
    const response = await apiClient.post("/api/user/logout");

    // Optionally handle response if needed
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};
