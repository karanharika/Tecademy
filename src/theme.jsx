// src/theme.js
// import { extendTheme } from "@chakra-ui/react";

// const theme = extendTheme({
//   config: {
//     initialColorMode: "light",
//     useSystemColorMode: false,
//   },
// });

// export default theme;


// import { createSystem, defaultConfig } from "@chakra-ui/react";

// const system = createSystem(defaultConfig, {
//   theme: {
//     tokens: {
//       colors: {
//         brand: {
//           500: { value: "#3182ce" },
//           600: { value: "#2c5282" },
//         },
//       },
//       fonts: {
//         heading: { value: "'Inter', sans-serif" },
//         body: { value: "'Inter', sans-serif" },
//       },


//       // Add more tokens like sizes, space, etc. as needed
//     },
//     // You can also define recipes, styles, etc.
//   },
// });

// export default system;

// theme.jsx
// theme.jsx
// theme.jsx
// theme.jsx

// theme.jsx
import { createSystem, defaultConfig } from "@chakra-ui/react"

const system = createSystem(defaultConfig, {
  theme: {
    colors: {
      bg: {
        DEFAULT: "#6695d1",  // light mode
        _dark: "#1a202c",    // dark mode
      },
    },
    styles: {
      global: {
        "html, body": {
          bg: "bg",   // will now use your overridden token
          color: "fg",
        },
      },
    },
    semanticTokens: {
      colors: {
        fg: {
          default: { value: "#1a202c" },
          _dark: { value: "#f0f4f9" },
        },
      },
    },
  },
})

export default system




