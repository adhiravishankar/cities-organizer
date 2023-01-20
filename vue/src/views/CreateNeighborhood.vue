<template>
  <v-container>
    <v-card>
      <v-card-title>Create Neighborhood</v-card-title>
      <v-card-text>
        <v-form>
          <v-row>
            <v-col>
              <v-text-field label="Name"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Link"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Address"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field label="Elementary School Score"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Middle School Score"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="High School Score"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Minimum Value"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Maximum Value"></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Minimum Sq. Ft."></v-text-field>
            </v-col>
            <v-col>
              <v-text-field label="Maximum Sq. Ft."></v-text-field>
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
