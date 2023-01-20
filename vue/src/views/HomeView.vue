<script lang="ts">
export default {
  data: () => ({
    tab: null,
  }),
};
</script>

<template>
  <v-container>
    <v-card>
      <v-tabs v-model="tab" bg-color="primary">
        <v-tab value="metros-list">Metros List</v-tab>
        <v-tab value="metros-table">Metros Table</v-tab>
        <v-tab value="cities">Cities</v-tab>
        <v-tab value="neighborhoods">Neighborhoods</v-tab>
      </v-tabs>

      <v-card-text>
        <v-window v-model="tab">
          <v-window-item value="metros-list"> One </v-window-item>
          <v-window-item value="metros-table"> Two </v-window-item>
          <v-window-item value="cities"> Three </v-window-item>
          <v-window-item value="neighborhoods"> Three </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </v-container>
</template>
