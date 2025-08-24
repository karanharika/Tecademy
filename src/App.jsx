import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from './components/Navbar';
import HomePage from "./Pages/Home/HomePage";
import About from "./Pages/About/About.jsx";

function App() {
  return (
    <Box p={6}>

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
      </Routes>

    </Box>
  );
}

export default App;
