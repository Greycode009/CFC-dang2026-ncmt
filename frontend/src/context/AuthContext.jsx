import { createContext, useContext, useState } from "react";
import { logoutUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Pure React memory state — no mock data or user objects in localStorage
  const [user, setUser] = useState(null);

  const login = (roleOrUser = "patient", userData = {}) => {
    let userObj = {};
    if (typeof roleOrUser === "object" && roleOrUser !== null) {
      userObj = {
        ...roleOrUser,
        isLoggedIn: true,
      };
    } else {
      userObj = {
        role: roleOrUser,
        isLoggedIn: true,
        ...userData,
      };
    }
    setUser(userObj);
  };

  const logout = () => {
    setUser(null);
    logoutUser();
  };

  const switchRole = (newRole) => {
    setUser((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        role: newRole,
      };
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return {
      user: null,
      login: () => {},
      logout: () => {},
      switchRole: () => {},
    };
  }
  return context;
};

export default AuthContext;
