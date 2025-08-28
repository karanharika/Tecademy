// // src/auth/AuthProvider.jsx

// import { createContext, useContext, useState, useEffect } from "react";
// import * as Auth from "aws-amplify/auth";
// import { getCurrentUser, signIn, signOut } from "aws-amplify/auth";

// // Create React Context
// // const AuthContext = createContext(null);
// // Create React Context with safe defaults
// const AuthContext = createContext({
//     user: null,
//     loading: true,
//     login: async () => {},
//     register: async () => {},
//     logout: async () => {},
//   });


// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch current user when app starts
//   useEffect(() => {
//     async function checkUser() {
//       try {
//         const currentUser = await Auth.getCurrentAuthenticatedUser();
//         setUser(currentUser);

//         // const { username, signInDetails } = await getCurrentUser();
//         // setUser({ username, ...signInDetails });
//         console.log("user: ");
//         console.log(user);

//       } catch {
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     }
//     checkUser();
//   }, []);

//   // Login function
//   async function login(username, password) {
//     try {
//       // If someone is already signed in, sign them out first
//       try {
//         await getCurrentUser();
//         await signOut();
//       } catch {
//         // No user signed in, safe to continue
//       }

//       // v6 signIn
//       const { isSignedIn, nextStep } = await signIn({ username, password });

//       if (isSignedIn) {
//         const currentUser = await getCurrentUser(); // ✅ fetch full user details
//         setUser(currentUser);
//         return currentUser;
//       } else {
//         console.log("⚡ Further action required:", nextStep);
//         return { nextStep };
//       }
//     } catch (error) {
//       console.error("❌ Login error:", error);
//       throw error;
//     }
//   }


//   async function register({ username, password, email, firstName, lastName, birthdate }) {
//       return await Auth.signUp({
//         username,
//         password,
//         options: {
//           userAttributes: {
//             email,
//             given_name: firstName,
//             family_name: lastName,
//             birthdate, // "YYYY-MM-DD"
//           },
//         },
//       });
//     }

//   // Logout function
//   async function logout() {
//     await Auth.signOut();
//     setUser(null);
//   }

//   const value = {
//     user,
//     loading,
//     login,
//     register,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//     {children}
//   </AuthContext.Provider>
//   );
// }

// // Hook to use context
// export function useAuthContext() {
//   return useContext(AuthContext);
// }

// src/auth/AuthProvider.jsx
// src/auth/AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signIn,
  signOut,
  signUp,
  confirmSignUp,
  resendSignUpCode,
  getCurrentUser,
  fetchAuthSession,
  fetchUserAttributes,
} from "aws-amplify/auth";


const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => { },
  logout: async () => { },
  register: async () => { },
  confirm: async () => { },
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session on mount
  useEffect(() => {
    async function checkUser() {
      try {
        const u = await getCurrentUser();
        const attributes = await fetchUserAttributes();
        console.log("User attributes:", attributes);
        console.log("user: ", u);

        const fullUser = { ...u, attributes };
        // setUser({ ...currentUser, attributes }); // CHECK here!!!!!
        // setUser(u);
        setUser(fullUser);

        console.log("Printing User: ", fullUser);
      } catch {
        setUser(null); // no user
      } finally {
        setLoading(false);
      }
    }
    checkUser();
  }, []);

  // LOGIN
  async function login(username, password) {
    const result = await signIn({ username, password });

    if (result.isSignedIn) {
      const u = await getCurrentUser();
      setUser(u);
      return u;
    } else {
      return { nextStep: result.nextStep };
    }
  }

  // LOGOUT
  async function logout() {
    await signOut();
    setUser(null);
  }

  // REGISTER
  async function register({ username, password, email, firstName, lastName, birthdate }) {
    return await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
          given_name: firstName,
          family_name: lastName,
          birthdate,
        },
      },
    });
  }

  async function confirm({ username, confirmationCode }) {
    return await confirmSignUp({ username, confirmationCode });
  }

  async function resend(username) {
    return await resendSignUpCode({ username });
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, register, confirm, resend }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
