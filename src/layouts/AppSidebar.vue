<template>
  <v-navigation-drawer
    v-model="isOpen"
    :temporary="isMobile"
    :permanent="!isMobile"
    :rail="false"
    class="position-fixed"
  >
    <v-list>
      <v-list-item>
        <div class="d-flex ga-4 pa-4">
          <v-icon size="36" color="primary">mdi-diamond-stone</v-icon>
          <h2 class="text-h6 font-weight-bold">CodeVault</h2>
        </div>
      </v-list-item>

      <v-divider color="border-color" />

      <v-list-subheader class="font-weight-medium">
        NAVIGATION
      </v-list-subheader>

      <v-list-item
        value="all"
        :active="activeView === 'all'"
        @click="setActiveView('all')"
        :color="activeView === 'all' ? 'primary' : 'text-secondary'"
        :bg-color="activeView === 'all' ? 'accent-bg' : undefined"
      >
        <template #prepend>
          <v-icon :color="activeView === 'all' ? 'primary' : 'text-secondary'">
            mdi-folder
          </v-icon>
        </template>
        <v-list-item-title>All Snippets</v-list-item-title>
      </v-list-item>

      <v-list-item
        value="favorites"
        :active="activeView === 'favorites'"
        @click="setActiveView('favorites')"
        :color="activeView === 'favorites' ? 'primary' : 'text-secondary'"
        :bg-color="activeView === 'favorites' ? 'accent-bg' : undefined"
      >
        <template #prepend>
          <v-icon
            :color="activeView === 'favorites' ? 'primary' : 'text-secondary'"
          >
            mdi-star
          </v-icon>
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
        :color="activeView === 'recent' ? 'primary' : 'text-secondary'"
        :bg-color="activeView === 'recent' ? 'accent-bg' : undefined"
      >
        <template #prepend>
          <v-icon
            :color="activeView === 'recent' ? 'primary' : 'text-secondary'"
          >
            mdi-clock
          </v-icon>
        </template>
        <v-list-item-title>Recent</v-list-item-title>
      </v-list-item>
    </v-list>

    <v-divider color="border-color" />

    <!-- Filters -->
    <div class="pa-4">
      <h5 class="on-surface text-caption font-weight-medium mb-2">FILTERS</h5>
      <v-select
        v-model="selectedFramework"
        :items="DROPDOWN_DATA"
        density="compact"
        variant="outlined"
        placeholder="Select Framework"
        hide-details
        bg-color="input-bg"
        :color="$vuetify.theme.current.dark ? 'border-color' : 'border-color'"
      />
    </div>

    <v-divider
      :color="$vuetify.theme.current.dark ? 'border-color' : 'border-color'"
    ></v-divider>

    <!-- Stats -->
    <div class="pa-4">
      <h5 class="text-text-tertiary text-caption font-weight-medium mb-2">
        STATS
      </h5>
      <v-card
        variant="outlined"
        :color="
          $vuetify.theme.current.dark ? 'surface-variant' : 'surface-variant'
        "
      >
        <v-list density="compact" bg-color="transparent">
          <v-list-item class="px-4">
            <template #prepend>
              <span class="text-text-secondary text-caption">Total</span>
            </template>
            <template #append>
              <span class="text-on-surface font-weight-medium">
                {{ totalSnippets }}
              </span>
            </template>
          </v-list-item>
          <v-list-item class="px-4">
            <template #prepend>
              <span class="text-text-secondary text-caption">Favorites</span>
            </template>
            <template #append>
              <span class="text-on-surface font-weight-medium">
                {{ favoriteCount }}
              </span>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import type { Framework } from "@/types/snippet";
import { computed, ref } from "vue";
import { DROPDOWN_DATA } from "@/assets/data/dropdown";
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
