import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let id2Lis = {}

export default new Vuex.Store({
    state: {
        shouldMask: false,
        user: {
            desc: '',
            faceUrl: 'https://img0.baidu.com/it/u=1051750546,2567387195&fm=26&fmt=auto'
        },
        delConfirmResolve: null,
        delConfirm: null,
        errMessage: null,
        errTimer: null,
        searching: false,
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
            for (let key of Object.getOwnPropertyNames(payload)) {
                state.user[key] = payload[key]
            }
        },
        delConfirmReset(state) {
            state.delConfirm = new Promise(resolve => {
                state.delConfirmResolve = resolve
            })
        },
        delConfirmCommit(state, confirm) {
            state.delConfirmResolve(confirm)
        },
        errHappens(state, errMsg) {
            state.errMessage = errMsg
            clearTimeout(state.errTimer)
            state.errTimer = setTimeout(() => {
                state.errMessage = null
            }, 4000)
        },
        toggleSearching(state) {
            state.searching = !state.searching
        }
    },
    actions: {},
    modules: {}
})
