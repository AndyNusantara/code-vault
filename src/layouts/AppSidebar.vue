<template>
  <v-navigation-drawer
    v-model="isOpen"
    :temporary="isMobile"
    :permanent="!isMobile"
    :rail="false"
    class="position-fixed d-flex flex-column ga-2 pa-2"
  >
    <v-list-item>
      <div class="d-flex ga-4 py-4">
        <v-icon size="36" color="primary" icon="mdi-safe-square-outline" />
        <h2 class="text-on-surface font-weight-bold">CodeVault</h2>
      </div>
    </v-list-item>

    <v-divider />

    <v-list>
      <v-list-subheader class="font-weight-medium text-on-surface">
        NAVIGATION
      </v-list-subheader>

      <v-list-item
        value="all"
        :active="activeView === 'all'"
        @click="setActiveView('all')"
        :color="activeView === 'all' ? 'primary' : 'text-on-surface'"
        :bg-color="activeView === 'all' ? 'accent-bg' : undefined"
      >
        <template #prepend>
          <v-icon
            :color="activeView === 'all' ? 'primary' : 'text-on-surface'"
            icon="mdi-folder"
          />
        </template>
        <v-list-item-title>All Snippets</v-list-item-title>
      </v-list-item>

      <v-list-item
        value="favorites"
        :active="activeView === 'favorites'"
        @click="setActiveView('favorites')"
        :color="activeView === 'favorites' ? 'primary' : 'text-on-surface'"
        :bg-color="activeView === 'favorites' ? 'accent-bg' : undefined"
      >
        <template #prepend>
          <v-icon
            :color="activeView === 'favorites' ? 'primary' : 'text-on-surface'"
            icon="mdi-star"
          />
        </template>
        <v-list-item-title>Favorites</v-list-item-title>
        <template #append>
          <v-badge :content="favoriteCount" color="primary" inline />
        </template>
      </v-list-item>

      <v-list-item
        value="recent"
        :active="activeView === 'recent'"
        @click="setActiveView('recent')"
        :color="activeView === 'recent' ? 'primary' : 'text-on-surface'"
        :bg-color="activeView === 'recent' ? 'accent-bg' : undefined"
      >
        <template #prepend>
          <v-icon
            :color="activeView === 'recent' ? 'primary' : 'text-on-surface'"
            icon="mdi-clock"
          />
        </template>
        <v-list-item-title>Recent</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list>
      <v-list-subheader class="font-weight-medium text-on-surface">
        FILTERS
      </v-list-subheader>

      <v-select
        v-model="selectedFramework"
        :items="FRAMEWORK_DATA"
        density="compact"
        variant="outlined"
        label="Framework"
        clearable
      />
      <v-select
        v-model="selectedLanguage"
        :items="LANGUAGE_DATA"
        density="compact"
        variant="outlined"
        label="Language"
        clearable
      />
    </v-list>

    <v-divider />

    <v-list>
      <v-list-subheader class="font-weight-medium text-on-surface">
        STATS
      </v-list-subheader>

      <v-card variant="outlined" border="opacity-25" class="border-sm">
        <v-list>
          <v-list-item>
            <template #prepend>
              <span class="text-on-surface text-caption">Total Snippets</span>
            </template>
            <template #append>
              <span class="text-on-surface font-weight-medium">
                {{ totalSnippets }}
              </span>
            </template>
          </v-list-item>

          <v-divider />

          <v-list-item>
            <template #prepend>
              <span class="text-on-surface text-caption">Favorites</span>
            </template>
            <template #append>
              <span class="text-on-surface font-weight-medium">
                {{ favoriteCount }}
              </span>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import type { Framework, Language } from "@/types/snippet";
import { computed, ref } from "vue";
import { FRAMEWORK_DATA, LANGUAGE_DATA } from "@/assets/data/dropdown";
import { useSnippetStore } from "@/stores/snippetStore";

const isMobile = inject<boolean>("is-mobile");

const isSidebarCollapsed = defineModel<boolean>("isSidebarCollapsed", {
  required: true,
});

const snippetStore = useSnippetStore();
const activeView = ref<"all" | "favorites" | "recent">("all");

const totalSnippets = computed(() => snippetStore.snippets.length);
const favoriteCount = computed(() => snippetStore.favoriteSnippets.length);
const filterState = computed(() => snippetStore.filterState);

const selectedFramework = computed({
  get: () => filterState.value.selectedFramework,
  set: (value: Framework | null) =>
    snippetStore.updateFilter({ selectedFramework: value }),
});

const selectedLanguage = computed({
  get: () => filterState.value.selectedLanguage,
  set: (value: Language | null) =>
    snippetStore.updateFilter({ selectedLanguage: value }),
});

const setActiveView = (view: "all" | "favorites" | "recent") => {
  activeView.value = view;
  snippetStore.updateFilter({
    showFavorites: view === "favorites",
  });
};

const isOpen = computed({
  get: () => !isSidebarCollapsed.value,
  set: (value) => (isSidebarCollapsed.value = !value),
});
</script>

<style scoped></style>
