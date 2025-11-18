import type { FilterState, Snippet, SnippetFormData } from "@/types/snippet";
import { defineStore } from "pinia";
import { computed, readonly, ref, watch } from "vue";
import { generateDevSnippets } from "@/utils/devSnippets";

export const useSnippetStore = defineStore("snippets", () => {
  const snippets = ref<Snippet[]>([]);
  const filterState = ref<FilterState>({
    searchQuery: "",
    selectedLanguage: null,
    selectedFramework: null,
    selectedStylingTool: null,
    showFavorites: false,
  });

  const loadFromStorage = () => {
    try {
      const stored = localStorage.getItem("snippets");
      if (stored) {
        const parsedData: Snippet[] = JSON.parse(stored);
        snippets.value = parsedData;
      } else {
        snippets.value = generateDevSnippets();
      }
    } catch (error) {
      console.error("Failed to load snippets from storage:", error);
      snippets.value = [];
    }
  };

  const saveToStorage = () => {
    try {
      localStorage.setItem("snippets", JSON.stringify(snippets.value));
    } catch (error) {
      console.error("Failed to save snippets to storage:", error);
    }
  };

  const addSnippet = (formData: SnippetFormData) => {
    const newSnippet: Snippet = {
      ...formData,
      id: generateId(),
      isFavorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    snippets.value.unshift(newSnippet);
    return newSnippet.id;
  };

  const updateSnippet = (id: string, updates: Partial<SnippetFormData>) => {
    const index = snippets.value.findIndex((s) => s.id === id);
    if (index !== -1) {
      snippets.value[index] = {
        ...snippets.value[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      } as Snippet;
    }
  };

  const deleteSnippet = (id: string) => {
    const index = snippets.value.findIndex((s) => s.id === id);
    if (index !== -1) {
      snippets.value.splice(index, 1);
    }
  };

  const toggleFavorite = (id: string) => {
    const snippet = snippets.value.find((s) => s.id === id);
    if (snippet) {
      snippet.isFavorite = !snippet.isFavorite;
    }
  };

  const updateFilter = (updates: Partial<FilterState>) => {
    Object.assign(filterState.value, updates);
  };

  const clearFilters = () => {
    filterState.value = {
      searchQuery: "",
      selectedLanguage: null,
      selectedFramework: null,
      selectedStylingTool: null,
      showFavorites: false,
    };
  };

  const filteredSnippets = computed(() => {
    let result = snippets.value;

    if (filterState.value.searchQuery) {
      const query = filterState.value.searchQuery.toLowerCase();
      result = result.filter(
        (snippet) =>
          snippet.title.toLowerCase().includes(query) ||
          snippet.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          snippet.code.toLowerCase().includes(query)
      );
    }

    if (filterState.value.selectedLanguage) {
      result = result.filter(
        (snippet) => snippet.language === filterState.value.selectedLanguage
      );
    }

    if (
      filterState.value.selectedFramework &&
      filterState.value.selectedFramework !== "none"
    ) {
      result = result.filter(
        (snippet) => snippet.framework === filterState.value.selectedFramework
      );
    }

    if (
      filterState.value.selectedStylingTool &&
      filterState.value.selectedStylingTool !== "none"
    ) {
      result = result.filter(
        (snippet) =>
          snippet.stylingTool === filterState.value.selectedStylingTool
      );
    }

    if (filterState.value.showFavorites) {
      result = result.filter((snippet) => snippet.isFavorite);
    }

    return result;
  });

  const favoriteSnippets = computed(() => {
    return snippets.value.filter((s) => s.isFavorite);
  });

  const totalSnippets = computed(() => snippets.value.length);

  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  };

  loadFromStorage();
  watch(snippets, saveToStorage, { deep: true });

  return {
    snippets: readonly(snippets),
    filteredSnippets: filteredSnippets,
    favoriteSnippets: readonly(favoriteSnippets),
    totalSnippets: readonly(totalSnippets),
    filterState: readonly(filterState),
    addSnippet,
    updateSnippet,
    deleteSnippet,
    toggleFavorite,
    updateFilter,
    clearFilters,
  };
});
