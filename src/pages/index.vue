<template>
  <v-container fluid>
    <v-row v-if="filteredSnippets.length > 0">
      <v-col
        v-for="snippet in filteredSnippets"
        :key="snippet.id"
        cols="12"
        md="6"
      >
        <SnippetCard :snippet="snippet" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-card variant="outlined" class="pa-8">
          <v-icon size="64" color="grey-lighten-1" class="mb-4"
            >mdi-code-braces</v-icon
          >
          <h3 class="text-h6 mb-2">No snippets found</h3>
          <p class="text-grey">
            Try adjusting your filters or create a new snippet.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import SnippetCard from "@/components/SnippetCard.vue";
import { useSnippetStore } from "@/stores/snippetStore";

const snippetStore = useSnippetStore();

const { filteredSnippets } = storeToRefs(snippetStore);
</script>

<style scoped>
.snippet-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-4);
}

.snippet-container > * {
  min-width: 0;
}

@media (max-width: 1024px) {
  .snippet-container {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1400px) {
  .snippet-container {
    max-width: 100%;
  }
}
</style>
