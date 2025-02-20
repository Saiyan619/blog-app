import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [loader, setloader] = useState(false);

  // Configure axios defaults with token
  useEffect(() => {
    if (!tokens.access) {
      setloader(true);
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

  const notify = () => toast.success('Wow so easy !');
  const notifyError = () => toast.error('Error, Something went wrong!!');

const postNotify = () => toast.success('Blog posted successfully');
  const postNotifyError = () => toast.error('Error, Something went wrong!!, Fill out the inputs');

  const DeleteNotify = () => toast.success('Blog Deleted successfully');
  
const editNotify = () => toast.success('Blog Updated successfully');
const editNotifyError = () => toast.error('Something went wrong, Make sure to fill the required inputs');


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
    //   setloader(false);
    //   return;
    // }

    try {
      const response = await axios.get("/api/user");
      // console.log(user)
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      // if (error.response?.status === 401) {
      //   await refreshAccessToken();
      // }
    } 
  };


  // Register function
  //Unnecessary code(for now, keeping for later)
  const register = async (userData) => {
    try {
      const response = await axios.post("api/user/register", userData);
      console.log(response.data)
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
    loader,
    notify,
    notifyError,
    postNotify,
    postNotifyError,
    DeleteNotify,
    editNotify,
editNotifyError,
    setloader,
    login,
    register,
    logout,
    fetchUserData,
    isAuthenticated: tokens.access,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
