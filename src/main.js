import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'
import {store} from './store'
import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit.vue'
import EditMeetupDateDialog from './components/Meetup/EditDate.vue'
import EditMeetupTimeDialog from './components/Meetup/EditTime.vue'
import RegisterDialog from './components/Meetup/Registration/Register.vue'

Vue.config.productionTip = false
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: 'AIzaSyAYOryX692w0zCfBdhVTaInMS_XH69EGI4',
      authDomain: 'dmksmlkmalkmlskdm.firebaseapp.com',
      databaseURL: 'https://dmksmlkmalkmlskdm.firebaseio.com',
      projectId: 'dmksmlkmalkmlskdm',
      storageBucket: "dmksmlkmalkmlskdm.appspot.com",
      messagingSenderId: "280287125434"
    });
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$store.dispatch('autoSignIn', user);
        this.$store.dispatch('fetchUserData');
      }
    });
    this.$store.dispatch('loadMeetups');
  }
}).$mount('#app')
