// src/theme.js
// theme.js
import { createSystem, defaultConfig, defineRecipe, defineSlotRecipe } from "@chakra-ui/react"

const buttonRecipe = defineRecipe({
  base: {
    borderRadius: "md",
    fontWeight: "bold",
    color: "red",
  },
  variants: {
    solid: {
      bg: { base: "yellow.400", _dark: "teal.400" },
      color: { base: "green", _dark: "yellow" },
      _hover: {
        bg: { base: "yellow.200", _dark: "teal.700" },
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
        base: "teal.100",
        _dark: "teal.900",
      },
      color: {
        base: "gray.900",
        _dark: "whiteAlpha.950",
      },
    },
  },
  theme: {
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
          default: { value: "#6695d1" },
          _dark: { value: "#1a202c" },
        },
      },
    },
  },
})


export default system







