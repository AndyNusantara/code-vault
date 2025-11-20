<template>
  <v-card class="pa-4" width="700">
    <v-form ref="formRef" fast-fail @submit.prevent="handleSubmit">
      <v-card-title class="d-flex justify-space-between align-center">
        <span>
          {{ modalTitle }}
        </span>

        <v-btn
          icon="mdi-close"
          variant="text"
          @click="modalStore.toggleModal()"
        ></v-btn>
      </v-card-title>

      <v-card-item>
        <v-container>
          <v-row>
            <v-col>
              <v-text-field
                :rules="[() => !!form.title || 'This field is required']"
                label="Title"
                v-model="form.title"
                variant="outlined"
                class="mb-5"
              />
              <v-text-field
                :rules="[() => !!form.description || 'This field is required']"
                label="Description"
                v-model="form.description"
                variant="outlined"
                class="mb-5"
              />
              <v-select
                :rules="[() => !!form.language || 'This field is required']"
                label="Select Language"
                :items="LANGUAGE_DATA"
                variant="outlined"
                v-model="form.language"
                class="mb-5"
              />
            </v-col>
            <v-col>
              <v-select
                label="Select Framework"
                :items="FRAMEWORK_COMPATIBILITY[form.language]"
                variant="outlined"
                v-model="form.framework"
                class="mb-5"
              />
              <v-select
                label="Select Styling Tool"
                :items="STYLING_TOOL_COMPATIBILITY[form.language]"
                variant="outlined"
                v-model="form.stylingTool"
                class="mb-5"
              />
              <v-combobox
                :rules="[() => !!form.tags || 'This field is required']"
                v-model="form.tags"
                label="Tags"
                variant="outlined"
                chips
                clearable
                closable-chips
                multiple
              >
                <template v-slot:chip="{ props, item }">
                  <v-chip v-bind="props">
                    <strong>{{ item.raw }}</strong>
                  </v-chip>
                </template>
              </v-combobox>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea
                :rules="[() => !!form.code || 'This field is required']"
                label="Code"
                variant="outlined"
                v-model="form.code"
              />
            </v-col>
          </v-row>
        </v-container>
      </v-card-item>
      <v-card-actions class="justify-end">
        <v-dialog v-model="openDeletionOverlay" max-width="500">
          <template v-slot:activator="{ props }">
            <v-btn
              v-if="data"
              v-bind:="props"
              color="red"
              @click="openDeletionOverlay = true"
            >
              DELETE
            </v-btn>
          </template>

          <v-card class="pa-2">
            <v-icon
              icon="mdi-alert"
              class="items-center justify-center w-100 py-7"
              color="red"
              size="large"
            />
            <v-card-title class="d-flex items-center justify-center">
              Delete Snippet
            </v-card-title>

            <v-card-subtitle class="text-wrap text-center">
              You're going to delete the {{ data?.title }} snippet. Are you
              sure?
            </v-card-subtitle>

            <v-card-actions class="justify-center pt-10 ga-5">
              <v-btn variant="outlined" @click="openDeletionOverlay = false">
                No, keep it.
              </v-btn>

              <v-btn variant="tonal" color="red" @click="handleDeleteSnippet">
                Yes, Delete!
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-btn variant="outlined" color="primary" type="submit">
          Save Snippet
        </v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSnippetStore } from "@/stores/snippetStore";
import { useModalStore } from "@/stores/modalStore";
import {
  FRAMEWORK_COMPATIBILITY,
  LANGUAGE_DATA,
  STYLING_TOOL_COMPATIBILITY,
} from "@/assets/data/dropdown";

const snippetStore = useSnippetStore();
const modalStore = useModalStore();
const openDeletionOverlay = ref<boolean>(false);
const formRef = ref();
const data = modalStore.snippetData;

const form = ref({
  title: data?.title || "",
  language: data?.language || "javascript",
  framework: data?.framework || "none",
  stylingTool: data?.stylingTool || "none",
  code: data?.code || "",
  tags: data?.tags || [],
  description: data?.description || "",
  isFavorite: false,
});

const modalTitle = data ? "Add new code snippet" : "Edit code snippet";

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate();
  if (!valid) return;

  if (data) {
    snippetStore.updateSnippet(data.id, form.value);
  } else {
    snippetStore.addSnippet(form.value);
  }
  modalStore.toggleModal();
};

const handleDeleteSnippet = () => {
  openDeletionOverlay.value = false;
  modalStore.toggleModal();
  if (data) {
    snippetStore.deleteSnippet(data.id);
  }
};

watch(
  () => form.value.language,
  () => {
    form.value.framework = "none";
    form.value.stylingTool = "none";
  }
);
</script>
