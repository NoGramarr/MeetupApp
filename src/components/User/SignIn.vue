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
              <form @submit.prevent="onSignIn">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email"
                                  label="Mail"
                                  id="email"
                                  v-model="email"
                                  type="email"
                                  autofocus
                                  :rules="[rules.required, rules.email]">
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
                                  :rules="[rules.required]">
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout xs12>
                  <v-btn :disabled="!formIsValid || loading" type="submit" :loading="loading">Sign In</v-btn>
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
        rules: {
          required: value => !!value || 'Required',
          email: value => (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value.toLowerCase()) || 'You must enter a valid email!'
        },
      }
    },
    methods: {
      onSignIn(){
        // Vuex
        this.$store.dispatch('signUserIn', {
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
        return this.email !== '' && this.password !== '';
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
    beforeDestroy(){
      this.$store.dispatch('clearError');
    }
  }
</script>
