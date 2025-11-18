<template>
  <v-app-bar color="surface" elevation="2" class="position-fixed">
    <template #prepend>
      <v-btn v-if="isMobile" icon @click="props.toggleSidebar()" size="small">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </template>

    <v-app-bar-title class="text-h6 font-weight-bold">
      Code Snippets
      <div class="text-caption text-medium-emphasis">
        Manage and organize your code collection
      </div>
    </v-app-bar-title>

    <template #append>
      <div
        v-if="!isMobile"
        class="d-flex align-center ga-2"
        style="width: 450px"
      >
        <v-text-field
          v-model="searchQuery"
          density="compact"
          variant="outlined"
          placeholder="Search snippets..."
          prepend-inner-icon="mdi-magnify"
          hide-details
          class="flex-grow-1"
        />

        <v-btn icon @click="toggleTheme()" size="small">
          <v-icon v-if="theme.current.value.dark">mdi-weather-sunny</v-icon>
          <v-icon v-else>mdi-weather-night</v-icon>
        </v-btn>

        <v-btn
          color="primary"
          @click="showAddForm"
          prepend-icon="mdi-plus"
          size="small"
        >
          Add Snippet
        </v-btn>
      </div>

      <v-btn v-if="isMobile" icon @click="toggleTheme()" size="small">
        <v-icon v-if="theme.current.value.dark">mdi-weather-sunny</v-icon>
        <v-icon v-else>mdi-weather-night</v-icon>
      </v-btn>
    </template>

    <template v-if="isMobile" #extension>
      <v-toolbar density="compact" color="surface" class="px-0">
        <v-text-field
          v-model="searchQuery"
          density="compact"
          variant="outlined"
          placeholder="Search snippets..."
          prepend-inner-icon="mdi-magnify"
          hide-details
          class="flex-grow-1 px-4"
        />

        <v-btn color="primary" @click="showAddForm" icon size="small">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed, inject, ref } from "vue";
import { useSnippetStore } from "@/stores/snippetStore";
import { useTheme } from "vuetify";
import { useModalStore } from "@/stores/modalStore";

const props = defineProps({
  toggleSidebar: {
    type: Function,
    required: true,
  },
});

const isMobile = inject<boolean>("is-mobile");

const theme = useTheme();
const modalStore = useModalStore();
const snippetStore = useSnippetStore();
const { updateFilter, filterState } = snippetStore;

const searchQuery = computed({
  get: () => filterState.searchQuery,
  set: (value: string) => updateFilter({ searchQuery: value }),
});

const showAddForm = () => modalStore.toggleModal();

const toggleTheme = () => {
  theme.toggle();
  localStorage.setItem("theme", theme.name.value);
};
</script>

<style></style>
