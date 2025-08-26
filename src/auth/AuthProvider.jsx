// src/auth/AuthProvider.jsx
import { createContext, useContext, useState, useEffect } from "react";
// import { Auth } from "aws-amplify/auth"; // ✅ Amplify v6 import
import * as Auth from "aws-amplify/auth";


// Create React Context
// const AuthContext = createContext(null);
// Create React Context with safe defaults
const AuthContext = createContext({
    user: null,
    loading: true,
    login: async () => {},
    register: async () => {},
    logout: async () => {},
  });


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current user when app starts
  useEffect(() => {
    async function checkUser() {
      try {
        const currentUser = await Auth.getCurrentAuthenticatedUser();
        setUser(currentUser);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, []);

  // Login function
  async function login(username, password) {
    const loggedInUser = await Auth.signIn({ username, password });
    setUser(loggedInUser);
    return loggedInUser;
  }

  // Register function
  async function register(username, password, email) {
    return await Auth.signUp({
      username,
      password,
      attributes: { email },
    });
  }

  // Logout function
  async function logout() {
    await Auth.signOut();
    setUser(null);
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Hook to use context
export function useAuthContext() {
  return useContext(AuthContext);
}
