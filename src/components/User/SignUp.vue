<template>
  <v-container>
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignUp">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email"
                                  label="Mail"
                                  id="email"
                                  v-model="email"
                                  type="email"
                                  :rules="[rules.required, rules.email]"
                                  hint="Insert your email address."
                                  autofocus>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="password"
                                  label="Password"
                                  id="password"
                                  v-model="password"
                                  type="password"
                                  :rules="[rules.required]"
                                  hint="Type a strong password.">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="confirmPassword"
                                  label="Confirm Password"
                                  id="confirmPassword"
                                  v-model="confirmPassword"
                                  type="password"
                                  :rules="[rules.confirmPassword]"
                                  hint="Type the chosen password again.">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-btn type="submit" :disabled="!formIsValid || loading" :loading="loading">Sign Up</v-btn>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data(){
      return {
        email: '',
        password: '',
        confirmPassword: '',
        rules: {
          required: value => !!value || 'Required',
          confirmPassword: value => value && value == this.password || 'Passwords do not match!',
          email: value => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value.toLowerCase()) || 'You must enter a valid email!',
          password: value => value.length >= 6 || 'The password must be at least 6 characters long.'
        }
      }
    },
    methods: {
      onSignUp(){
        // Vuex
        this.$store.dispatch('signUserUp', {
          email: this.email,
          password: this.password
        })
      },
      onDismissed(){
        console.log('Dismissed Alert');
        this.$store.dispatch('clearError');
      }
    },
    computed: {
      formIsValid(){
        return this.email !== '' && this.password !== '' && this.confirmPassword == this.password;
      },
      user(){
        return this.$store.getters.user;
      },
      error(){
        return this.$store.getters.error;
      },
      loading(){
        return this.$store.getters.loading;
      }
    },
    watch: {
      user(value){
        if(value !== null && value !== undefined) {
          this.$router.push('/');
        }
      }
    },
    beforeDestroy() {
      this.$store.dispatch('clearError');
    }
  }
</script>
