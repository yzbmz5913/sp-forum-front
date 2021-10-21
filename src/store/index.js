import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        shouldMask: false,
        user: {
            username: 'stan marsh',
            desc: '我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴英雄我是stan哦，我喜欢玩风暴',
            face: ''
        }
    },
    mutations: {
        mask(state, flag) {
            state.shouldMask = flag
        },
        changeUserProfile(state, payload) {
            state.user.username = payload.username
            state.user.face = payload.face
            state.user.desc = payload.desc
        }
    },
    actions: {},
    modules: {}
})
