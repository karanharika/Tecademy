import { Routes, Route } from "react-router-dom";
import { Box, Heading, Button } from "@chakra-ui/react";
import Navbar from './components/Navbar';
import HomePage from "./Pages/Home/HomePage";
import About from "./Pages/About/About";

function App() {
  return (
    <Box p={6}>
      
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Button colorScheme="teal" mt={4}>Test Button</Button>
    </Box>
  );
}

export default App;


// import { Routes, Route, Link } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import HomePage from './Pages/Home/HomePage';
// import About from './Pages/About/About';

// function App() {
//   return (
//     <div>
//       {/* <Navbar></Navbar> */}


//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/about" element={<About />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;