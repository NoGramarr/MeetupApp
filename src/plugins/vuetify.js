import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#403014',
    secondary: '#8C6723',
    info: '#F2E750',
    success: '#D9A036',
    error: '#FFD700'
  }
})