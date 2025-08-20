// import './HomePage.css';

// function HomePage() {
//   return (
//     <div className="home">
//       <h1>Welcome to Homepage</h1>
//       <p>This is the homepage.</p>

//       <div>
//         <a href='/about'><button>About Page</button></a>
//       </div>
//     </div>


//   );
// }

// export default HomePage;


import { Box, Text } from "@chakra-ui/react";

export default function HomePage() {
  return (
    <Box>
      <Text fontSize="xl">This is HomePage 🏠</Text>
    </Box>
  );
}
