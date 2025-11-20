<template>
  <v-app-bar color="surface" elevation="1" class="position-fixed h-auto py-2">
    <template #prepend>
      <v-btn v-if="isMobile" icon @click="props.toggleSidebar()">
        <v-icon icon="mdi-menu" />
      </v-btn>
    </template>

    <v-app-bar-title>
      <span class="text-h5 text-on-surface font-weight-bold d-block"
        >CodeVault</span
      >
      <span class="text-caption text-on-surface text-medium-emphasis d-block">
        Manage and organize your code collection
      </span>
    </v-app-bar-title>

    <template #append>
      <div
        v-if="!isMobile"
        class="d-flex align-center ga-2"
        style="width: 480px"
      >
        <v-text-field
          v-model="searchQuery"
          density="compact"
          variant="outlined"
          placeholder="Search snippets..."
          prepend-inner-icon="mdi-magnify"
          hide-details
          class="flex-grow-1"
          clearable
        />

        <v-btn icon @click="toggleTheme()">
          <v-icon v-if="theme.current.value.dark" icon="mdi-weather-sunny" />
          <v-icon v-else icon="mdi-weather-night" />
        </v-btn>

        <v-btn color="primary" @click="showAddForm" prepend-icon="mdi-plus">
          Add Snippet
        </v-btn>
      </div>

      <v-btn v-if="isMobile" icon @click="toggleTheme()">
        <v-icon v-if="theme.current.value.dark" icon="mdi-weather-sunny" />
        <v-icon v-else icon="mdi-weather-night" />
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

        <v-btn color="primary" @click="showAddForm" icon>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-toolbar>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
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
