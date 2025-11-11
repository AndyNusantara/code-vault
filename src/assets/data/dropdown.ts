import type { Framework, Language, StylingTool } from "@/types/snippet";

export const FRAMEWORK_DATA: Framework[] = [
  "svelte",
  "vue",
  "reactjs",
  "express",
  "nextjs",
  "angular",
  "nuxt",
];

export const LANGUAGE_DATA: Language[] = [
  "cpp",
  "csharp",
  "css",
  "go",
  "html",
  "java",
  "javascript",
  "less",
  "markdown",
  "php",
  "python",
  "ruby",
  "rust",
  "scss",
  "sql",
  "typescript",
];

export const FRAMEWORK_COMPATIBILITY: Record<Language, Framework[]> = {
  javascript: [
    "reactjs",
    "vue",
    "angular",
    "svelte",
    "nextjs",
    "nuxt",
    "express",
    "nestjs",
    "none",
  ],
  typescript: [
    "reactjs",
    "vue",
    "angular",
    "svelte",
    "nextjs",
    "nuxt",
    "express",
    "nestjs",
    "none",
  ],
  python: ["django", "flask", "fastapi", "none"],
  php: ["laravel", "symfony", "none"],

  css: ["none"],
  scss: ["none"],
  less: ["none"],
  html: ["none"],
  sql: ["none"],
  markdown: ["none"],
  java: ["none"],
  csharp: ["none"],
  cpp: ["none"],
  rust: ["none"],
  go: ["none"],
  ruby: ["none"],
};

export const STYLING_TOOL_COMPATIBILITY: Record<Language, StylingTool[]> = {
  css: ["tailwind", "bootstrap", "sass", "less", "postcss", "none"],
  scss: ["tailwind", "bootstrap", "sass", "less", "postcss", "none"],
  less: ["tailwind", "bootstrap", "sass", "less", "postcss", "none"],

  javascript: [
    "tailwind",
    "bootstrap",
    "material-ui",
    "chakra-ui",
    "styled-components",
    "emotion",
    "css-modules",
    "vanilla-extract",
    "sass",
    "less",
    "postcss",
    "none",
  ],
  typescript: [
    "tailwind",
    "bootstrap",
    "material-ui",
    "chakra-ui",
    "styled-components",
    "emotion",
    "css-modules",
    "vanilla-extract",
    "sass",
    "less",
    "postcss",
    "none",
  ],
  html: ["tailwind", "bootstrap", "sass", "less", "postcss", "none"],

  python: ["none"],
  php: ["none"],
  sql: ["none"],
  markdown: ["none"],
  java: ["none"],
  csharp: ["none"],
  cpp: ["none"],
  rust: ["none"],
  go: ["none"],
  ruby: ["none"],
};

export const LANGUAGES_WITH_FRAMEWORKS: Language[] = [
  "javascript",
  "typescript",
  "python",
  "php",
];

export const LANGUAGES_WITH_STYLING_TOOLS: Language[] = [
  "javascript",
  "typescript",
  "css",
  "scss",
  "less",
  "html",
];
