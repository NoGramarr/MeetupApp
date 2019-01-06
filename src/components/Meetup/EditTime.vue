<template>
  <v-dialog width="530px" persistent v-model="editDialog">
    <v-btn class="primary" slot="activator">Edit Time</v-btn>
    <v-card class="primary">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title><h3 class="white--text">Edit Meetup Time</h3></v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker landscape v-model="editableTime" style="width: 100%;">
              <v-btn class="primary" 
                      flat 
                      @click="editDialog = false">Close</v-btn>
              <v-btn class="primary" 
                      flat 
                      @click="onSaveChanges">Save</v-btn>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data() {
      return {
        editDialog: false,
        editableTime: null,
      }
    },
    methods: {
      onSaveChanges() {
        this.editDialog = false;
        const newDate = this.meetup.date.substr(0, 10) + '-' + this.editableTime;
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },
    created() {
      this.editableTime = this.meetup.date.slice(11);
      console.log(this.editableTime);
    }
  }
</script>
