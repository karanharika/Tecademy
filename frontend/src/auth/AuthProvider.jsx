import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => { },
  logout: async () => { },
  register: async () => { },
  deductToken: async () => { },
});

// Configure axios to send cookies
axios.defaults.withCredentials = true;
const API_URL = "http://localhost:3000"; // Backend URL

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session on mount
  useEffect(() => {
    async function checkUser() {
      try {
        const response = await axios.get(`${API_URL}/me`);
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, []);

  // LOGIN
  async function login(username, password) {
    try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error("Login failed:", error);
      return { error: error.response?.data?.message || "Login failed" };
    }
  }

  // LOGOUT
  async function logout() {
    try {
      await axios.post(`${API_URL}/logout`);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  // REGISTER
  const register = async (username, password, email, FirstName, LastName, subjects = []) => {
    try {
      await axios.post(`${API_URL}/register`, { username, password, email, FirstName, LastName, subjects });
      // After register, we can auto-login or redirect to login
      // For now, let's just return success
      return true;
    } catch (error) {
      console.error("Registration failed", error);
      throw error;
    }
  };

  // DEDUCT TOKEN
  async function deductToken() {
    try {
      const response = await axios.post(`${API_URL}/users/deduct-token`);
      if (response.data.success) {
        // Update local user state with new token count
        setUser(prev => ({ ...prev, tokens: response.data.tokens }));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Token deduction failed:", error);
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register, deductToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
