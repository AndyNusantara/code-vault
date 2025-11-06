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
          // Primary colors (your accent colors)
          primary: "#3b82f6", // --accent-color
          "primary-darken-1": "#2563eb", // --accent-hover

          // Surface colors (backgrounds)
          background: "#ffffff", // --app-bg
          surface: "#f8fafc", // --primary-bg
          "surface-bright": "#ffffff", // --card-bg
          "surface-variant": "#f1f5f9", // --tag-bg

          // Text colors
          "on-surface": "#1a202c", // --text-primary
          "on-background": "#1a202c", // --text-primary
          "on-surface-variant": "#4a5568", // --text-secondary

          // State colors
          "on-primary": "#ffffff", // Text on primary buttons
          outline: "#e2e8f0", // --border-color
          "outline-variant": "#edf2f7", // --border-light

          // Custom colors for specific use cases
          "input-bg": "#ffffff", // --input-bg
          "hover-bg": "#e2e8f0", // --hover-bg
          "accent-bg": "#eff6ff", // --accent-bg
        },
      },
      dark: {
        colors: {
          // Primary colors
          primary: "#60a5fa", // --accent-color
          "primary-darken-1": "#3b82f6", // --accent-hover

          // Surface colors
          background: "#0f172a", // --app-bg
          surface: "#1e293b", // --primary-bg
          "surface-bright": "#1e293b", // --card-bg
          "surface-variant": "#374151", // --tag-bg

          // Text colors
          "on-surface": "#f1f5f9", // --text-primary
          "on-background": "#f1f5f9", // --text-primary
          "on-surface-variant": "#cbd5e1", // --text-secondary

          // State colors
          "on-primary": "#0f172a", // Text on primary buttons
          outline: "#334155", // --border-color
          "outline-variant": "#475569", // --border-light

          // Custom colors
          "input-bg": "#334155", // --input-bg
          "hover-bg": "#334155", // --hover-bg
          "accent-bg": "#1e3a8a", // --accent-bg
        },
      },
    },
  },
});
