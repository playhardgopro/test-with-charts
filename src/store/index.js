import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import Moment from 'moment';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
  },
  mutations: {
    addUser(state, user) {
      state.users.push(user);
    },
  },
  actions: {

    getAllUsers({ dispatch }) {
      Axios.get('https://cors-anywhere.herokuapp.com/rssi.wmrk.tk')
        .then((json) => dispatch('createArrayOfUsers', json.data))
        .catch((error) => console.error(error));
    },

    createArrayOfUsers({ commit }, data) {
      const keys = Object.keys(data);
      keys.forEach((key) => {
        const user = data[key];
        user.id = +key;
        /* sorting by timestamps */
        user.signals.rows = user.signals.sort((prev, next) => prev.ts - next.ts)
          .map((point) => ({ rssi: -point.rssi, ts: Moment(point.ts).format('LTS') }));
        user.signals.columns = ['ts', 'rssi'];
        commit('addUser', user);
      });
    },

  },
  modules: {
  },

});
