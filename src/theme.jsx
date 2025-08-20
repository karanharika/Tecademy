// src/theme.js
// import { extendTheme } from "@chakra-ui/react";

// const theme = extendTheme({
//   config: {
//     initialColorMode: "light",
//     useSystemColorMode: false,
//   },
// });

// export default theme;


import { createSystem, defaultConfig } from "@chakra-ui/react";

const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      colors: {
        brand: {
          500: { value: "#3182ce" },
          600: { value: "#2c5282" },
        },
      },
      fonts: {
        heading: { value: "'Inter', sans-serif" },
        body: { value: "'Inter', sans-serif" },
      },
      // Add more tokens like sizes, space, etc. as needed
    },
    // You can also define recipes, styles, etc.
  },
});

export default system;