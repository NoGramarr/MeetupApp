<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn fab class="primary" slot="activator"><v-icon>edit</v-icon></v-btn>
    <v-card class="primary">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title><h3 class="white--text">Edit Meetup</h3></v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                            name="title"
                            label="Title"
                            id="title"
                            dark
                            v-model="editedTitle">
              </v-text-field>
              <v-textarea
                          name="description"
                          label="Description"
                          id="description"
                          dark
                          v-model="editedDescription">
              </v-textarea>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn flat class="secondary" @click="editDialog = !editDialog">Close</v-btn>
              <v-btn flat class="secondary" @click="onSaveChanges">Save</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
      
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data(){
      return {
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description,
        editDialog: false
      }
    },
    methods: {
      onSaveChanges() {
        if(this.editedTitle.trim() === '' || this.editedDescription.trim() === '') {
          return;
        }
        this.editDialog = false;
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          title: this.editedTitle,
          description: this.editedDescription
        });
      }
    }
  }
</script>