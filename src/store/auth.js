import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.withCredentials = true;

export default {
    namespaced: true,

    state: {
        authenticated: false,
        user: null
    },

    getters: {

        authenticated (state) {
            return state.authenticated
        },

        user (state) {
            return state.user
        },

    },

    mutations: {

        set_authenticated (state, value) {
            state.authenticated = value
        },

        set_user (state, value) {
            state.user = value
        }

    },

    actions: {

        check({ commit }) {
            return axios.get('/api/user').then((response) => {
                commit('set_authenticated', true)
                commit('set_user', response.data)
            }).catch(() => {
                commit('set_authenticated', false)
                commit('set_user', null)
            })
        }

    }

}