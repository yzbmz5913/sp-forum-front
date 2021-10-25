import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        shouldMask: false,
        user: {},
        delConfirmResolve: null,
        delConfirm: null,
    },
    mutations: {
        mask(state, flag) {
            state.shouldMask = flag
        },
        changeUserProfile(state, payload) {
            state.user.uid = payload.uid
            state.user.username = payload.username
            state.user.faceUrl = payload.faceUrl
            state.user.desc = payload.desc
        },
        login(state) {
            localStorage.setItem('jwt', 'jwt123')
        },
        logout(state) {
            localStorage.removeItem('jwt')
        },
        delConfirmReset(state){
            state.delConfirmResolve=null
            state.delConfirm=new Promise(resolve=>{state.delConfirmResolve=resolve})
        },
        delConfirmCommit(state,confirm){
            state.delConfirmResolve(confirm)
        }
    },
    actions: {},
    modules: {}
})
