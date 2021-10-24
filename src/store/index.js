import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        shouldMask: false,
        user: {}
    },
    mutations: {
        mask(state, flag) {
            state.shouldMask = flag
        },
        changeUserProfile(state, payload) {
            state.user.username = payload.username
            state.user.faceUrl = payload.faceUrl
            state.user.desc = payload.desc
        },
        login(state){
            localStorage.setItem('jwt','jwt123')
        },
        logout(state){
            localStorage.removeItem('jwt')
        }
    },
    actions: {},
    modules: {}
})
