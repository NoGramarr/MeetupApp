import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home'
import Meetups from './components/Meetup/Meetups'
import CreateMeetup from './components/Meetup/CreateMeetup'
import Profile from './components/User/Profile'
import SignUp from './components/User/SignUp'
import SignIn from './components/User/SignIn'
import Meetup from './components/Meetup/Meetup'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'meetups',
      component: Meetups
    },
    {
      path: '/meetup/new',
      name: 'createMeetup',
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups/:id',
      name: 'meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/signin',
      name: '/signIn',
      component: SignIn
    }
  ],
  mode: 'history'
})
