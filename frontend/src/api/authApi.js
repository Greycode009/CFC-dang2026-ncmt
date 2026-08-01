import API from "./axiosInstance";

/**
 * Auth API — /api/auth
 * 1.1 Register User  — POST /api/auth/register
 * 1.2 Login User     — POST /api/auth/login
 */

// 1.1 Register (Patient or Institution)
// role must be "patient" or "institution"
export const registerUser = async (userData) => {
  const res = await API.post("/auth/register", {
    fullName: userData.fullName,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
    password: userData.password,
    confirmPassword: userData.confirmPassword,
    role: userData.role, // "patient" | "institution"
  });
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data; // { message, token, user }
};

// 1.2 Login
export const loginUser = async ({ email, password }) => {
  const res = await API.post("/auth/login", { email, password });
  if (res.data?.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res.data; // { message, token, user }
};

// Logout helper — clears token from storage
export const logoutUser = () => {
  localStorage.removeItem("token");
};
