<template>
  <v-container>
    <v-layout row v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate
                             color="error"
                             :width="7"
                             :size="70">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout v-else>
        <v-flex xs12>
            <v-card class="info">
              <v-card-title>
                <h4 class="primary--text">{{meetup.title}}</h4>
                <v-spacer></v-spacer>
                <app-edit-meetup-details-dialog v-if="userIsCreator" :meetup="meetup"></app-edit-meetup-details-dialog>
              </v-card-title>
              <v-img :src="meetup.imageUrl"
                      height="400px">
              </v-img>
              <v-card-text>
                <div>{{meetup.date}} - {{meetup.location}}</div>
                <div>
                  <app-edit-meetup-date-dialog @exit="updateInfo" :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-date-dialog>
                  <app-edit-meetup-time-dialog :meetup="meetup" v-if="userIsCreator"></app-edit-meetup-time-dialog>
                </div>
                <div class="secondary--text">
                  {{meetup.description}}
                </div>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <app-meetup-register-dialog v-if="!userIsCreator && userIsAuthenticated" :meetupId="meetup.id"></app-meetup-register-dialog>
              </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup(){
        return this.$store.getters.loadedMeetup(this.id);
      },
      userIsAuthenticated(){
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator(){
        if(!this.userIsAuthenticated) {
          return false;
        }
        return this.$store.getters.user.id === this.meetup.creatorId;
      },
      loading(){
        return this.$store.getters.loading;
      }
    },
    methods: {
      updateInfo(){
        console.log(this.$store.getters.loadedMeetup(this.id).date);
      }
    }
  }
</script>
