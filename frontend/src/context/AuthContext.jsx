import { createContext, useContext, useState, useEffect } from "react";
import { logoutUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize user state from localStorage so page refreshes and new tabs stay logged in!
  const [user, setUserState] = useState(() => {
    try {
      const savedUser = localStorage.getItem("medassist_user");
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && typeof parsed === "object") {
          return { ...parsed, isLoggedIn: true };
        }
      }
    } catch (e) {
      console.error("Failed to parse saved user from localStorage:", e);
    }
    return null;
  });

  const setUser = (userVal) => {
    setUserState((prev) => {
      const nextUser = typeof userVal === "function" ? userVal(prev) : userVal;
      if (nextUser && typeof nextUser === "object") {
        const userObj = { ...nextUser, isLoggedIn: true };
        try {
          localStorage.setItem("medassist_user", JSON.stringify(userObj));
        } catch (e) {
          console.error("Failed to save user to localStorage:", e);
        }
        return userObj;
      } else {
        try {
          localStorage.removeItem("medassist_user");
          localStorage.removeItem("token");
        } catch (e) {
          console.error("Failed to clear user from localStorage:", e);
        }
        return null;
      }
    });
  };

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
    try {
      localStorage.setItem("medassist_user", JSON.stringify(userObj));
    } catch (e) {
      console.error("Failed to save user to localStorage:", e);
    }
    setUserState(userObj);
  };

  const logout = () => {
    try {
      localStorage.removeItem("medassist_user");
      localStorage.removeItem("token");
    } catch (e) {
      console.error("Failed to remove token from localStorage:", e);
    }
    setUserState(null);
    logoutUser();
  };

  const switchRole = (newRole) => {
    setUserState((prev) => {
      if (!prev) return null;
      const updated = {
        ...prev,
        role: newRole,
        isLoggedIn: true,
      };
      try {
        localStorage.setItem("medassist_user", JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save user to localStorage:", e);
      }
      return updated;
    });
  };

  // Sync session across browser tabs via storage event listener
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "medassist_user") {
        if (!e.newValue) {
          setUserState(null);
        } else {
          try {
            const parsed = JSON.parse(e.newValue);
            setUserState({ ...parsed, isLoggedIn: true });
          } catch (err) {
            console.error("Storage change parse error:", err);
          }
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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
