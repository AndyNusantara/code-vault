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
          primary: "#3b82f6",
          background: "#f1f5f9",
          surface: "#ffffff",

          "on-background": "#1e293bff",
          "on-surface": "#1a1f26ff",
        },
      },
      dark: {
        colors: {
          primary: "#60a5fa",
          background: "#0f172a",
          surface: "#1e293b",

          "on-background": "#f1f5f9",
          "on-surface": "#cbd5e1",
        },
      },
    },
  },
});
