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
      bg: { base: "yellow.400", _dark: "teal.800" },
      color: { base: "green", _dark: "yellow" },
      _hover: {
        bg: { base: "yellow.200", _dark: "teal.800" },
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
    tokens: {
      colors: {
        floatingBg: { value: "#0c5d56" },      // teal.400 Light
        floatingBgDark: { value: "#0c5d56" },  // teal.700 Dark
        floatingLabelColor: { value: "#0c5d56" },     // teal.700 Light
        floatingLabelColorDark: { value: "#0c5d56" }, // teal.200 Dark
      },
    },
    recipes: {
      button: buttonRecipe,
    },
    semanticTokens: {
      colors: {
        fg: {
          default: { value: "#0c5d56" },
          _dark: { value: "#0c5d56" },
        },
        bg: {
          default: { value: "#0c5d56" },
          _dark: { value: "#0c5d56" },
        },
        floatingBg: {
          value: { base: "{colors.teal.800}", _dark: "{colors.teal.700}" },
        },
        floatingLabelColor: {
          value: { base: "{colors.floatingLabelColor}", _dark: "{colors.floatingLabelColorDark}" },
        },
      },
    },
  },
})


export default system







