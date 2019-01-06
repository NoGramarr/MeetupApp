<template>
  <v-app>
    <v-navigation-drawer temporary 
                         v-model="sideNav" 
                         fixed>
      <v-list>
        <v-list-tile v-for="item in menuItems" 
                     v-bind:key="item.id"
                     v-bind:to="item.link">
          <v-list-tile-action>
            <v-icon left>{{item.icon}}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon left
                    v-if="userIsAuthenticated"
                    @click="onLogout">
              exit_to_app
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Log Out
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click="sideNav = !sideNav"
                           class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" 
                     tag="span" 
                     style="cursor: pointer;">DevMeetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn v-for="item in menuItems" 
               v-bind:key="item.id" 
               flat
               v-bind:to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat
               v-if="userIsAuthenticated"
               @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Log Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-content>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-content>
    </main>
  </v-app>
</template>

<script>
export default {
  data(){
    return {
      sideNav: false
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'face', title: 'Sign Up', link: '/signup' },
        { icon: 'lock_open', title: 'Sign In', link: '/signin' }
      ];
      if(this.userIsAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups' }, 
          { icon: 'room', title: 'Organize Meetup', link: '/meetup/new' },
          { icon: 'person', title: 'Profile', link: '/profile' }
        ]
      }
      return menuItems;
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
    }
  },
  methods: {
    onLogout(){
      this.$store.dispatch('logout');
    }
  }
}
</script>
