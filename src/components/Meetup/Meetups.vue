<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info mt-1" v-for="meetup in meetups" :key="meetup.id">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img :src="meetup.imageUrl"
                       height="130px">
                </v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title>
                  <h4 class="secondary--text">{{meetup.title}}</h4>
                </v-card-title>
                <v-card-text class="primary--text" 
                             style="position: relative; top: -20px;">
                  <h5>{{meetup.date}}</h5>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat 
                         class="primary--text"
                         :to="'/meetups/'+meetup.id">
                    <v-icon>arrow_forward</v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups(){
        return this.$store.getters.loadedMeetups;
      }
    }
  }
</script>
