import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("medassist_user");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Failed to parse saved user", e);
      }
    }
    return {
      name: "Alex Morgan",
      email: "alex@example.com",
      role: "patient", // "patient" or "institute"
      isLoggedIn: true,
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("medassist_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("medassist_user");
    }
  }, [user]);

  const login = (role = "patient", userData = {}) => {
    const newUser = {
      name: userData.name || (role === "institute" ? "City Central Hospital" : "Alex Morgan"),
      email: userData.email || (role === "institute" ? "contact@citycentral.org" : "alex@example.com"),
      role: role,
      isLoggedIn: true,
      ...userData,
    };
    setUser(newUser);
    localStorage.setItem("medassist_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("medassist_user");
  };

  const switchRole = (newRole) => {
    setUser((prev) => {
      const updated = {
        ...prev,
        role: newRole,
        name: newRole === "institute" ? "City Central Hospital" : "Alex Morgan",
        email: newRole === "institute" ? "contact@citycentral.org" : "alex@example.com",
      };
      localStorage.setItem("medassist_user", JSON.stringify(updated));
      return updated;
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
    // Fallback if context is not wrapped yet
    return {
      user: { role: localStorage.getItem("userRole") || "patient", name: "Alex Morgan" },
      login: () => {},
      logout: () => {},
      switchRole: () => {},
    };
  }
  return context;
};

export default AuthContext;
