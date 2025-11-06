export type Language =
  | "javascript"
  | "typescript"
  | "python"
  | "php"
  | "css"
  | "scss"
  | "less"
  | "html"
  | "sql"
  | "markdown"
  | "java"
  | "csharp"
  | "cpp"
  | "rust"
  | "go"
  | "ruby";

export type Framework =
  | "reactjs"
  | "vue"
  | "angular"
  | "svelte"
  | "nextjs"
  | "nuxt"
  | "django"
  | "flask"
  | "fastapi"
  | "laravel"
  | "symfony"
  | "express"
  | "nestjs"
  | "none";

export type StylingTool =
  | "tailwind"
  | "bootstrap"
  | "material-ui"
  | "chakra-ui"
  | "sass"
  | "less"
  | "styled-components"
  | "emotion"
  | "css-modules"
  | "vanilla-extract"
  | "postcss"
  | "none";

export type SortOrder = "asc" | "desc";

export type Snippet = SnippetFormData & {
  id: string;
};

export type SnippetFormData = {
  title: string;
  description: string;
  code: string;
  language: Language;
  framework: Framework | null;
  stylingTool: StylingTool | null;
  tags: string[];
  isFavorite: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type FilterState = {
  searchQuery: string;
  selectedLanguage: Language | null;
  selectedFramework: Framework | null;
  selectedStylingTool: StylingTool | null;
  showFavorites: boolean;
};
