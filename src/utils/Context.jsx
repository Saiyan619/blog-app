import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

// Create the context
const AuthContext = createContext(null);

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [tokens, setTokens] = useState(() => ({
    access: localStorage.getItem("accessToken") || "",
    refresh: localStorage.getItem("refreshToken") || "",
  }));

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure axios defaults with token
  useEffect(() => {
    if (!tokens.access) {
      setLoading(false);
      return;
    }

    const interceptor = axios.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${tokens.access}`;
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Load user data when access token is available
    fetchUserData();

    return () => axios.interceptors.request.eject(interceptor);
  }, [tokens.access]);

  
  // ✅ Refresh Access Token
//   const refreshAccessToken = async () => {
//     const refreshToken = tokens.refresh;
//     if (!refreshToken) {
//       console.log("No refresh token found. Logging out...");
//       logout();
//       return;
//     }

//     try {
//       const response = await axios.post(`api/user/token/refresh/`, {
//         refresh: refreshToken,
//       });

//       const newAccessToken = response.data.access;

//       localStorage.setItem("accessToken", newAccessToken);
//       setTokens((prevTokens) => ({
//         ...prevTokens,
//         access: newAccessToken,
//       }));

//       console.log("Access token refreshed. Fetching user data...");
//       fetchUserData();
//     } catch (error) {
//       console.error("Failed to refresh token:", error);
//       logout();
//     }
//   };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post("/api/user/login", { email, password });

      if (response.data?.access && response.data?.refresh) {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);

        setTokens({
          access: response.data.access,
          refresh: response.data.refresh,
        });

        console.log("Logged in successfully");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  // Fetch user data
  const fetchUserData = async () => {
    console.log(tokens.access)
    // if (!tokens.access) {
    //   console.log("No access token available.");
    //   setLoading(false);
    //   return;
    // }

    try {
      // setLoading(true);
      const response = await axios.get("/api/user");
      // console.log(user)
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // if (error.response?.status === 401) {
      //   await refreshAccessToken();
      // }
    } finally {
      setLoading(false);
    }
  };


  // Register function
  const register = async (userData) => {
    try {
      const response = await axios.post("api/user/register", userData);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setTokens({ access: "", refresh: "" });
    setUser(null);
  };

  // Auth context value
  const value = {
    tokens,
    user,
    loading,
    login,
    register,
    logout,
    fetchUserData,
    isAuthenticated: !!tokens.access,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
