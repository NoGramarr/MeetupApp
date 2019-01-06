<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm-6 offset-sm3 class="text-xs-center text-sm-left">
        <h2 class="secondary--text">Create a New Meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="title"
                            name="title"
                            label="Title"
                            id="title"
                            :rules="[rules.required]"
                            dark>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="location"
                            name="location"
                            label="Location"
                            id="location"
                            :rules="[rules.required]"
                            dark>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn raised class="primary" @click="onPickFile">
                Upload Image
              </v-btn>
              <input type="file" 
                     style="display: none;" 
                     ref="file" 
                     accept="image/*"
                     @change="onFilePicked">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-img height="300px" :src="imageUrl">
              </v-img>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea v-model="description"
                          name="description"
                          label="Description"
                          id="description"
                          :rules="[rules.required]"
                          dark>
              </v-textarea>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h3 class="white--text">Choose a date and time</h3>
            </v-flex>
          </v-layout>
          <v-layout row class="mt-2">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker full-width landscape v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker full-width landscape v-model="time"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              {{date}} - - - - {{time}}
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3 class="text-xs-center">
              <v-btn :disabled="!formIsValid" 
                     class="primary mt-3" 
                     dark
                     type="submit">
                Create Meetup
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data(){
      return {
        rules: {
          required: value => !!value || 'Required'
        },
        title: '',
        location: '',
        imageUrl: '',
        description: '',
        date: new Date().toISOString().substr(0, 10),
        time: '20:00',
        image: null
      }
    },
    methods: {
      onCreateMeetup() {
        if(!this.formIsValid) {
          return;
        }
        if(!this.image) {
          return;
        }
        const meetupData = {
          title: this.title,
          location: this.location,
          description: this.description,
          date: this.submittableDateTime,
          image: this.image
        };
        console.log(this.submittableDateTime);
        this.$store.dispatch('createMeetup', meetupData);
        this.$router.push('/meetups')
      },
      onPickFile() {
        this.$refs.file.click();
      },
      onFilePicked() {
        const files = event.target.files;
        let filename = files[0].name;
        if(filename.lastIndexOf('.') <= 0) {
          return alert('Please add a valid file!');
        }
        const fileReader = new FileReader();
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result;
        });
        fileReader.readAsDataURL(files[0]);
        this.image = files[0];
      }
    },
    computed: {
      formIsValid() {
        return this.title != '' && this.location != '' && this.imageUrl != '' && this.description != '';
      },
      submittableDateTime() {
        return this.date + '-' + this.time;
      }
    }
  }
</script>
