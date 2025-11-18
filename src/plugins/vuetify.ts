/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

export default createVuetify({
  theme: {
    defaultTheme: "dark",
    themes: {
      light: {
        colors: {
          // Core colors (only 3 main colors)
          primary: "#3b82f6", // Brand blue
          background: "#ffffff", // App background
          surface: "#f8fafc", // Card backgrounds

          // Text colors (only 2 levels)
          "on-background": "#1a202c", // Primary text
          "on-surface": "#4a5568", // Secondary text

          // Borders (just 1 color)
          outline: "#979797ff",
        },
      },
      dark: {
        colors: {
          // Core colors (same structure, different values)
          primary: "#60a5fa", // Lighter brand blue
          background: "#0f172a", // Dark app background
          surface: "#1e293b", // Dark card backgrounds

          // Text colors
          "on-background": "#f1f5f9", // Primary text (white)
          "on-surface": "#cbd5e1", // Secondary text (light gray)

          // Borders
          outline: "#94a3b8",
        },
      },
    },
  },
});
