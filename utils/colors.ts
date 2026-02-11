// src/utils/colors.ts

export const colors = {
  // Rose
  rose50: "#FFF1F2",
  rose100: "#FFE4E6",
  rose200: "#FECDD3",
  rose300: "#FDA4AF",
  rose400: "#FB7185",
  rose500: "#F43F5E",
  rose600: "#E11D48",

  // Pink
  pink50: "#FDF2F8",
  pink100: "#FCE7F3",
  pink200: "#FBCFE8",
  pink300: "#F9A8D4",
  pink400: "#F472B6",
  pink500: "#EC4899",
  pink600: "#DB2777",

  // Amber
  amber50: "#FFFBEB",
  amber100: "#FEF3C7",

  // Stone
  stone50: "#FAFAF9",
  stone100: "#F5F5F4",
  stone200: "#E7E5E4",
  stone300: "#D6D3D1",
  stone400: "#A8A29E",
  stone500: "#78716C",
  stone600: "#57534E",
  stone700: "#44403C",
  stone800: "#292524",

  // Emerald
  emerald100: "#D1FAE5",
  emerald500: "#10B981",
  emerald600: "#059669",

  // yellow
  yellow50: "#FFFBEB",
  yellow100: "#FEF3C7",
  yellow200: "#FDE68A",
  yellow300: "#FCD34D",
  yellow400: "#FBBF24",
  yellow500: "#F59E0B",
  yellow600: "#D97706",

  // White & Black
  white: "#FFFFFF",
  black: "#000000",

  // Opacity
  whiteOpacity80: "rgba(255, 255, 255, 0.8)",
  blackOpacity10: "rgba(0, 0, 0, 0.1)",
  blackOpacity20: "rgba(0, 0, 0, 0.2)",
};

export type ColorKey = keyof typeof colors;
