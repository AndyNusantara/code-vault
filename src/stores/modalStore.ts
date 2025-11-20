import type { Snippet } from "@/types/snippet";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modal", () => {
  const isOpen = ref(false);
  const snippetData = ref<Snippet | null>(null);

  const toggleModal = (snippet?: Snippet) => {
    snippetData.value = snippet ? snippet : null;
    isOpen.value = !isOpen.value;
  };

  return {
    isOpen,
    snippetData,
    toggleModal,
  };
});
