// src/theme.js
// theme.js
import { createSystem, defaultConfig, defineRecipe, defineSlotRecipe } from "@chakra-ui/react"

const buttonRecipe = defineRecipe({
  base: {
    borderRadius: "md",
    fontWeight: "bold",
    color: "white",
  },
  variants: {
    solid: {
      bg: { base: "pink.500", _dark: "teal.500" },
      color: { base: "white", _dark: "white" },
      _hover: {
        bg: { base: "pink.600", _dark: "teal.600" },
      },
    },
  },
  defaultVariants: {
    variant: "solid",
  },
})

const system = createSystem(defaultConfig, {
  globalCss: {
    "html, body, #root,": {
      margin: 0,
      padding: 0,
      backgroundColor: {
        base: "orange.50",
        _dark: "teal.900",
      },
      color: {
        base: "gray.900",
        _dark: "whiteAlpha.950",
      },
    },
  },
  theme: {
    tokens: {
      colors: {
        floatingBg: { value: "#fb923c" },      // orange.400 Light
        floatingBgDark: { value: "#0c5d56" },  // teal.700 Dark
        floatingLabelColor: { value: "#9a3412" },     // orange.800 Light
        floatingLabelColorDark: { value: "#99f6e4" }, // teal.200 Dark
      },
    },
    recipes: {
      button: buttonRecipe,
    },
    semanticTokens: {
      colors: {
        fg: {
          default: { value: "#1a202c" },
          _dark: { value: "#f0f4f9" },
        },
        bg: {
          default: { value: "#fff7ed" }, // orange.50
          _dark: { value: "#134e4a" },   // teal.900
        },
        floatingBg: {
          value: { base: "{colors.orange.400}", _dark: "{colors.teal.700}" },
        },
        floatingLabelColor: {
          value: { base: "{colors.floatingLabelColor}", _dark: "{colors.floatingLabelColorDark}" },
        },
      },
    },
  },
})


export default system







