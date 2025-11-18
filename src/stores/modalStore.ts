import type { SnippetFormData } from "@/types/snippet";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  const isOpen = ref(false);
  const snippetData = ref<SnippetFormData | null>(null);

  const toggleModal = (snippet?: SnippetFormData) => {
    snippetData.value = snippet ? snippet : null;
    isOpen.value = !isOpen.value;
  };

  return {
    isOpen,
    snippetData,
    toggleModal,
  };
});
