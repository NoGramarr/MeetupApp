<template>
  <v-container>
    <v-layout row 
              wrap
              class="mb-2">
      <v-flex xs12 
              sm6
              class="text-sm-right text-xs-center">
        <v-btn large
                to="/meetups"
                class="secondary">
          Explore Meetups
        </v-btn>
      </v-flex>
      <v-flex xs12
              sm6
              class="text-sm-left text-xs-center">
        <v-btn large
              to="/meetup/new"
              class="secondary">
          Organize Meetup
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular indeterminate
                             color="error"
                             :width="7"
                             :size="70">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item v-for="meetup in meetups"
                           :key="meetup.id"
                           :src="meetup.imageUrl"
                           @click="onLoadMeetup(meetup.id)">
            <div class="title">
              {{meetup.title}}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center mt-2">
          <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups() {
        return this.$store.getters.featuredMeetups;
      },
      loading() {
        return this.$store.getters.loading;
      }
    },
    methods: {
      onLoadMeetup(id){
        this.$router.push('/meetups/' + id);
      }
    }
  }
</script>

<style scoped>
  .title{
    position: absolute;
    bottom: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    font-size: 2em;
    padding: 20px;
    color: white;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
