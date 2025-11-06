<template>
  <div class="form-container">
    <div>
      <h2>{{ modalTitle }}</h2>
    </div>
    <div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="title"><h5>Title</h5></label>
          <input id="title" v-model="form.title" type="text" />
        </div>
        <div class="form-group">
          <label for="language"><h5>Language</h5></label>
          <input id="language" v-model="form.language" type="text" />
        </div>
        <div class="form-group">
          <label for="code"><h5>Code</h5></label>
          <textarea id="code" v-model="form.code" />
        </div>
        <div class="form-group">
          <label for="description"><h5>Description</h5></label>
          <textarea id="description" v-model="form.description" />
        </div>
      </form>
    </div>
    <div>
      <button class="cancel-btn" @click="handleClose">Cancel</button>
      <button class="save-btn" type="submit">Save Snippet</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Snippet } from "@/types/snippet";
import { ref } from "vue";
import { useSnippetStore } from "@/stores/snippetStore";

interface propsType {
  isCreate: boolean;
  snippet?: Snippet | null;
}

const snippetStore = useSnippetStore();
const props = defineProps<propsType>();
const emit = defineEmits<{
  (e: "close"): void;
}>();

const form = ref({
  title: props.snippet?.title || "",
  language: props.snippet?.language || "javascript",
  framework: props.snippet?.framework || "angular",
  code: props.snippet?.code || "",
  tags: props.snippet?.tags || [],
  description: props.snippet?.description || "",
});

const modalTitle = props.isCreate
  ? "Add new code snippet"
  : "Edit code snippet";

function handleSubmit() {
  if (props.snippet) {
    snippetStore.updateSnippet(props.snippet.id, form.value);
  } else {
    snippetStore.addSnippet(form.value);
  }
}

function handleClose() {
  emit("close");
}
</script>
<style scoped></style>
