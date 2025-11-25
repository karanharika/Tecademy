// import { Routes, Route } from "react-router-dom";
// import { Box } from "@chakra-ui/react";
// import Navbar from './components/Navbar';
// import HomePage from "./Pages/Home/HomePage";
// import About from "./Pages/About/About.jsx";

// function App() {
//   return (
//     <Box p={6}>

//       <Navbar />

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<About />} />
//       </Routes>

//     </Box>
//   );
// }

// export default App;

// app.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/Home/HomePage";
import About from "./Pages/About/About.jsx";
import Dashboard from "./Pages/Dashboard/Dashboard.jsx"; // <-- add dashboard page
import LoginForm from "./auth/LoginForm.jsx";
import RegisterForm from "./auth/RegisterForm.jsx";
import { useAuth } from "./auth/useAuth";  // custom hook - MAIN
// import { useAuth } from "./auth/authContext";  // TESTING
import FAQ from "./Pages/FAQ/FAQ.jsx";   // 👈 new import
import Host from "./Pages/Host/host.jsx";



// Wrapper for protected routes
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" replace />;
  return children;

  // const { user } = useAuth();
  // if (!user) return <Navigate to="/login" />; // redirect if not logged in
  // return children; // render the page if logged in
}

function App() {
  return (
    <Box p={6}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/FAQ" element={<FAQ/>} /> 
        {/* Protected route example */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/host"
          element={
            <ProtectedRoute>
              <Host />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Box>
  );
}

export default App;
