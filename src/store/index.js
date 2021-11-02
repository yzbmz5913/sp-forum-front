import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let id2Lis = {}

export default new Vuex.Store({
    state: {
        shouldMask: false,
        user: {},
        delConfirmResolve: null,
        delConfirm: null,
        errMessage: null,
        errTimer: null,
        lis: function (id) {
            if (id2Lis[id]) return id2Lis[id]
            this.delConfirm = new Promise(resolve => {
                this.delConfirmResolve = resolve
            })
            let listener = function (event) {
                let e = document.querySelector('#' + id)
                let l = e.offsetLeft, t = e.offsetTop
                let r = l + e.offsetWidth, b = t + e.offsetHeight
                let x = event.clientX, y = event.clientY
                if (this.shouldMask && x < l || x > r || y < t || y > b) {
                    this.shouldMask = false
                    window.removeEventListener('mousedown', listener, {capture: true})
                    this.delConfirmResolve(false)
                    this.delConfirm = new Promise(resolve => {
                        this.delConfirmResolve = resolve
                    })
                }
            }.bind(this)
            id2Lis[id] = listener
            return listener
        },
    },
    mutations: {
        mask(state, id) {
            state.shouldMask = id
        },
        changeUserProfile(state, payload) {
            state.user.uid = payload.uid
            state.user.username = payload.username
            state.user.faceUrl = payload.faceUrl
            state.user.desc = payload.desc
        },
        delConfirmReset(state) {
            state.delConfirm = new Promise(resolve => {
                state.delConfirmResolve = resolve
            })
        },
        delConfirmCommit(state, confirm) {
            state.delConfirmResolve(confirm)
        },
        errHappens(state,errMsg){
            state.errMessage = errMsg
            clearTimeout(state.errTimer)
            state.errTimer = setTimeout(()=>{
                state.errMessage = null
            },4000)
        }
    },
    actions: {},
    modules: {}
})
