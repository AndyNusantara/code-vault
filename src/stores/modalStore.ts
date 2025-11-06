import type { SnippetFormData } from "@/types/snippet";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  const isOpen = ref(false);
  const snippetData = ref<SnippetFormData | null>(null);

  const openModal = (snippet?: SnippetFormData) => {
    snippetData.value = snippet ? snippet : null;
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
    snippetData.value = null;
  };

  return { isOpen, snippetData, openModal, closeModal };
});
