import axiosInstance from "./axiosInstance";

// Login User
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/users/login", {
      email,
      password,
    });
    return response.data; // { user, token }
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.error || "Login failed. Please try again later."
      );
    } else {
      throw new Error("An error occurred. Please try again later.");
    }
  }
};

// Create User
export const registerUser = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/users/register", {
      email,
      password,
    });
    return response.data; // { user, token }
  } catch (error: any) {
    if (error.response && error.response.data) {
      throw new Error(
        error.response.data.error ||
          "Registration failed. Please try again later."
      );
    } else {
      throw new Error("An error occurred. Please try again later.");
    }
  }
};

// Logout User

export const logoutUser = async () => {
  try {
    await axiosInstance.post("/users/logout");
    localStorage.removeItem("token");
  } catch (error: any) {
    throw new Error("An error occurred. Please try again later.");
  }
};

// Logout All Devices
export const logoutAllDevices = async () => {
  try {
    await axiosInstance.post("/users/logoutAll");
    localStorage.removeItem("token");
  } catch (error: any) {
    throw new Error("An error occurred. Please try again later.");
  }
};

// Get User Data
export const getUserData = async () => {
  try {
    const response = await axiosInstance.get("/users/me");
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred. Please try again later.");
  }
};

// Update User

export const updateUser = async (userId: string, data: any) => {
  try {
    const response = await axiosInstance.patch(`/users/${userId}`, data);
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred. Please try again later.");
  }
};

// Delete User

export const deleteUser = async (userId: string) => {
  try {
    const response = await axiosInstance.delete(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    throw new Error("An error occurred. Please try again later.");
  }
};
