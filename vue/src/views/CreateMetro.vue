<template>
  <v-container>
    <v-card>
      <v-card-title>Create City</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field label="Name"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Extended Name"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Short Name"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Population"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Metro Size Rank"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-textarea label="Notes"></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>
