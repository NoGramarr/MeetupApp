import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [
      { 
        imageUrl: 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200', 
        id: 'ndjksankjn', 
        title: 'Meetup in New York',
        date: '2017-07-17',
        location: 'New York',
        description: 'New York, New York'
      },
      { 
        imageUrl: 'https://photos.mandarinoriental.com/is/image/MandarinOriental/paris-2017-home?wid=2880&hei=1280&fmt=jpeg&crop=9,336,2699,1200&anchor=1358,936&qlt=75,0&fit=wrap&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72', 
        id: 'lkmkdlsam', 
        title: 'Meetup in Paris',
        date: '2017-07-19',
        location: 'Paris',
        description: "It's Paris!"
      }
    ]
  },
  mutations: {
    setLoadedMeetups(state, payload){
      state.loadedMeetups = payload;
    },
    createMeetup(state, payload) {
      state.loadedMeetups.push(payload);
    },
    updateMeetup(state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id;
      });
      if(payload.title) {
        meetup.title = payload.title;
      }
      if(payload.description) {
        meetup.description = payload.description;
      }
      if(payload.date) {
        meetup.date = payload.date;
      }
    },
  },
  actions: {
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date,
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      let uploadTask
      commit('setLoading', true)
      firebase.database().ref('meetups').push(meetup).then((data) => {
        key = data.key
        return key
      })
      .then(key => {
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        // Create a root reference
        const storageRef = firebase.storage().ref()
        uploadTask = storageRef.child('meetups/' + key + ext).put(payload.image)
      })
      .then(() => {
        commit('setLoading', true)
        uploadTask.on('state_changed', function (snapshot) {
        }, function (error) {
          console.log(error)
          commit('setLoading', false)
        }, function () {
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            console.log('File available at', downloadURL)
            imageUrl = downloadURL
            if (imageUrl) {
              firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
              console.log('image updated')
              commit('createMeetup', {
                ...meetup,
                imageUrl: imageUrl,
                id: key
              })
              commit('setLoading', false)
            } else {
              commit('setLoading', false)
            }
          })
        })
      })
    },
    updateMeetupData({commit}, payload){
      commit('setLoading', true);
      const updateObj = {};
      if(payload.title) {
        updateObj.title = payload.title;
      }
      if(payload.description) {
        updateObj.description = payload.description;
      }
      if(payload.date) {
        updateObj.date = payload.date;
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then((meetup) => {
          commit('setLoading', false);
          commit('updateMeetup', meetup);
        })
        .catch(error => {
          console.log(error);
          commit('setLoading', false);
        });
    },
    loadMeetups({commit}){
      commit('setLoading', true);
      firebase.database().ref('meetups').once('value')
        .then((data) => {
          const meetups = [];
          const obj = data.val();
          for(let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId,
              location: obj[key].location
            });
          }
          commit('setLoadedMeetups', meetups);
          commit('setLoading', false);
        })
        .catch((error) => {
          console.log(error);
          commit('setLoading', false);
        });
    },
  },
  getters: {
    featuredMeetups(state, getters){
      return getters.loadedMeetups.slice(0, 5);
    },
    loadedMeetups(state){
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date;
      });
    },
    loadedMeetup(state){
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id == meetupId;
        });
      }
    }
  }
}