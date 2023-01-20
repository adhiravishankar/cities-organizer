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
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi mdi-plus" v-bind="props"></v-btn>
          </template>
          <v-list>
            <v-list-item to="/create-metro">
              <v-list-item-title>Metro</v-list-item-title>
            </v-list-item>
            <v-list-item to="/create-city">
              <v-list-item-title>City</v-list-item-title>
            </v-list-item>
            <v-list-item to="/create-neighborhood">
              <v-list-item-title>Neighborhood</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn icon="mdi mdi-pencil"></v-btn>
      </template>
    </v-toolbar>
    <RouterView />
  </v-app>
</template>
