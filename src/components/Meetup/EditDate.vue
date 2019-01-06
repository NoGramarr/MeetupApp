<template>
  <v-dialog width="530px" persistent v-model="editDialog">
    <v-btn class="primary" slot="activator">Edit Date</v-btn>
    <v-card class="primary">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title><h3 class="white--text">Edit Meetup Date</h3></v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker landscape v-model="editableDate" style="width: 100%;">
              <v-btn class="primary" 
                      flat 
                      @click="editDialog = false">Close</v-btn>
              <v-btn class="primary" 
                      flat 
                      @click="onSaveChanges">Save</v-btn>
            </v-date-picker>
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
        editableDate: null,
      }
    },
    methods: {
      onSaveChanges() {
        this.editDialog = false;
        const newDate = this.editableDate + '-' +this.meetup.date.slice(11);
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        });
        this.$emit('exit');
      }
    },
    created() {
      this.editableDate = this.meetup.date.substr(0, 10);
    }
  }
</script>
