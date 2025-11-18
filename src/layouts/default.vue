<template>
  <v-app>
    <AppSidebar v-model:is-sidebar-collapsed="isSidebarCollapsed" />

    <AppHeader :toggle-sidebar="toggleSidebar" />

    <v-main class="d-flex flex-column">
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <v-overlay
      :model-value="modalStore.isOpen"
      class="align-center justify-center"
      scroll-strategy="block"
      @update:model-value="modalStore.toggleModal()"
    >
      <FormModal v-if="modalStore.isOpen" :is-create="true" />
    </v-overlay>

    <v-overlay
      :model-value="false"
      class="align-start justify-start"
      @click="isSidebarCollapsed = true"
    />
  </v-app>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide, ref } from "vue";
import { useModalStore } from "@/stores/modalStore";
import FormModal from "@/components/FormModal.vue";
import AppHeader from "./AppHeader.vue";
import AppSidebar from "./AppSidebar.vue";
import { useTheme } from "vuetify";

const modalStore = useModalStore();
const theme = useTheme();

const isMobile = ref(false);
const isSidebarCollapsed = ref(false);

provide(
  "is-mobile",
  computed(() => isMobile.value)
);

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 820;
  isSidebarCollapsed.value = isMobile.value;
};

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    theme.change(savedTheme);
  }

  checkMobile();
  window.addEventListener("resize", checkMobile);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkMobile);
});
</script>
