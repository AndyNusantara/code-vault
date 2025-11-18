<template>
  <v-card class="pa-4" width="700">
    <v-card-title>
      {{ modalTitle }}
    </v-card-title>
    <v-card-item>
      <form @submit.prevent="handleSubmit" class="d-flex ga-2 pa-4">
        <v-container
          class="border-sm border-opacity-100 border-outline rounded-sm"
        >
          <v-row>
            <v-col>
              <v-text-field
                label="Title"
                v-model="form.title"
                variant="outlined"
              />
              <v-text-field
                label="Description"
                v-model="form.description"
                variant="outlined"
              />
              <v-select
                label="Select Language"
                :items="LANGUAGE_DATA"
                variant="outlined"
                v-model="form.language"
              />
            </v-col>
            <v-col>
              <v-select
                label="Select Framework"
                :items="FRAMEWORK_COMPATIBILITY[form.language]"
                variant="outlined"
                v-model="form.framework"
              />
              <v-select
                label="Select Styling Tool"
                :items="STYLING_TOOL_COMPATIBILITY[form.language]"
                variant="outlined"
                v-model="form.stylingTool"
              />
              <v-text-field
                label="Tags"
                v-model="form.tags"
                variant="outlined"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-textarea label="Code" variant="outlined" v-model="form.code" />
          </v-row>
        </v-container>
      </form>
    </v-card-item>
    <v-card-actions>
      <button class="cancel-btn" @click="modalStore.toggleModal()">
        Cancel
      </button>
      <button class="save-btn" type="submit">Save Snippet</button>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import type { Snippet } from "@/types/snippet";
import { ref } from "vue";
import { useSnippetStore } from "@/stores/snippetStore";
import { useModalStore } from "@/stores/modalStore";
import {
  FRAMEWORK_COMPATIBILITY,
  FRAMEWORK_DATA,
  LANGUAGE_DATA,
  LANGUAGES_WITH_FRAMEWORKS,
  STYLING_TOOL_COMPATIBILITY,
} from "@/assets/data/dropdown";

interface propsType {
  isCreate: boolean;
  snippet?: Snippet | null;
}

const snippetStore = useSnippetStore();
const modalStore = useModalStore();
const props = defineProps<propsType>();

const form = ref({
  title: props.snippet?.title || "",
  language: props.snippet?.language || "javascript",
  framework: props.snippet?.framework || null,
  stylingTool: props.snippet?.stylingTool || null,
  code: props.snippet?.code || "",
  tags: props.snippet?.tags || [],
  description: props.snippet?.description || "",
  isFavorite: false,
});

const modalTitle = props.isCreate
  ? "Add new code snippet"
  : "Edit code snippet";

const handleSubmit = () => {
  if (props.snippet) {
    snippetStore.updateSnippet(props.snippet.id, form.value);
  } else {
    snippetStore.addSnippet(form.value);
  }
};
</script>
