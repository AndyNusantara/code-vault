<template>
  <v-card variant="outlined" class="h-100">
    <!-- Header -->
    <v-card-item>
      <v-card-title class="d-flex justify-space-between align-center">
        <span class="text-h6 text-wrap">
          {{ snippet.title }}
        </span>
        <v-btn icon variant="text" @click="toggleFav">
          <v-icon :color="snippet.isFavorite ? 'yellow' : 'white'">
            {{ snippet.isFavorite ? "mdi-star" : "mdi-star-outline" }}
          </v-icon>
        </v-btn>
      </v-card-title>
    </v-card-item>

    <!-- Content -->
    <v-card-text class="d-flex flex-column h-50 px-4">
      <!-- Chips -->
      <div class="d-flex ga-3 chip-wrapper mb-4">
        <v-chip class="chip" :class="snippet.language" size="small">
          {{ snippet.language }}
        </v-chip>
        <v-chip
          v-if="snippet.framework !== 'none'"
          class="chip"
          :class="snippet.framework + '-fw'"
          size="small"
        >
          {{ snippet.framework }}
        </v-chip>
      </div>

      <!-- Code -->
      <v-sheet class="code-outer-container w-100 position-relative">
        <v-btn
          icon
          variant="flat"
          size="small"
          class="copy-floating-btn"
          @click="copyCode"
        >
          <v-icon>mdi-content-copy</v-icon>
        </v-btn>
        <v-sheet
          class="w-100 h-100 overflow-auto border-sm rounded-sm"
          variant="outlined"
          rounded="lg"
        >
          <div class="code" v-html="codeSnippet" />
        </v-sheet>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { codeToHtml } from "shiki";
import { onMounted, ref } from "vue";
import { useSnippetStore } from "@/stores/snippetStore";
import type { Snippet } from "@/types/snippet";

const props = defineProps<{
  snippet: Snippet;
}>();

const { toggleFavorite } = useSnippetStore();
const codeSnippet = ref();

const toggleFav = () => {
  toggleFavorite(props.snippet.id);
};

const copyCode = () => {
  navigator.clipboard.writeText(props.snippet.code);
};

onMounted(async () => {
  codeSnippet.value = await codeToHtml(props.snippet.code, {
    lang: props.snippet.language,
    theme: "vitesse-dark",
  });
});
</script>

<style scoped>
.chip {
  display: inline-flex;
  align-items: center;
  padding: var(--chip-padding);
  border-radius: 0.5rem;
  text-transform: capitalize;
}

.chip.javascript {
  background-color: #f7df1e;
  color: #000000;
}
.chip.typescript {
  background-color: #3178c6;
  color: #ffffff;
}
.chip.vue {
  background-color: #41b883;
  color: #ffffff;
}
.chip.react {
  background-color: #61dafb;
  color: #000000;
}
.chip.css {
  background-color: #1572b6;
  color: #ffffff;
}
.chip.html {
  background-color: #e34f26;
  color: #ffffff;
}
.chip.python {
  background-color: #3776ab;
  color: #ffffff;
}
.chip.bash {
  background-color: #4eaa25;
  color: #ffffff;
}
.chip.json {
  background-color: #6b7280;
  color: #ffffff;
}
.chip.markdown {
  background-color: #083fa1;
  color: #ffffff;
}
.chip.yaml {
  background-color: #cb171e;
  color: #ffffff;
}
.chip.sql {
  background-color: #00758f;
  color: #ffffff;
}

.chip.vue-fw {
  background-color: #41b883;
  color: #ffffff;
}
.chip.react-fw {
  background-color: #61dafb;
  color: #000000;
}
.chip.angular {
  background-color: #dd0031;
  color: #ffffff;
}
.chip.svelte {
  background-color: #ff3e00;
  color: #ffffff;
}
.chip.express {
  background-color: #000000;
  color: #ffffff;
}
.chip.nextjs {
  background-color: #000000;
  color: #ffffff;
}
.chip.nuxtjs {
  background-color: #00dc82;
  color: #000000;
}
.chip.none-fw {
  background-color: #6b7280;
  color: #ffffff;
}

.code-outer-container {
  max-height: 20rem;
  transition: all 0.2s ease;
}

.code :deep(pre) {
  min-width: max-content;
  padding: 16px !important;
}

.copy-floating-btn {
  position: absolute;
  opacity: 0;
  top: 0.75rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
  color: white;
  z-index: 10;
  transition: all 0.2s ease;
}

.copy-floating-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.code-outer-container:hover .copy-floating-btn {
  opacity: 1;
  display: block;
}
</style>
