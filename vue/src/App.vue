<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<script lang="ts">
import { useMetrosStore } from "@/stores/metros";

export default {
  setup() {
    const metrosStore = useMetrosStore();
    return { metrosStore };
  },
};
</script>

<template>
  <v-app>
    <v-toolbar title="Home" :elevation="2">
      <template v-slot:append>
        <v-btn icon="mdi mdi-plus"></v-btn>
        <v-btn icon="mdi mdi-pencil"></v-btn>
      </template>
    </v-toolbar>
    <RouterView />
  </v-app>
</template>
