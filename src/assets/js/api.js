import axios from "axios";
import qs from 'qs';

axios.defaults.baseURL = 'http://localhost:8999'
axios.interceptors.request.use(config => {
    if (localStorage.getItem('jwt')) {
        config.headers['Authorization'] = localStorage.getItem('jwt')
    }
    return config
})
axios.interceptors.response.use(rsp => {
    let auth = rsp.headers['authorization'];
    if (auth) localStorage.setItem('jwt', auth)
    return rsp
})

export default {
    auth() {
        return axios.get('/auth', {
            headers: {
                'Authorization': localStorage.getItem('jwt')
            }
        })
    },
    getHotPosts() {
        return axios.get('/home/hots')
    },
    getCarousel() {
        return axios.get('/home/carousel')
    },
    getPosts(page) {
        return axios.get('/home/posts', {params: {page}})
    },
    search(keyword, page) {
        return axios.get('/home/search', {params: {keyword, page}})
    },
    login(username, password) {
        return axios.post('/user/login', qs.stringify({username, password}))
    },
    register(username, password, password2) {
        return axios.post('/user/register', qs.stringify({username, password, password2}))
    },
    follow(target, positive) {
        return axios.post('/user/follow', qs.stringify({target, positive}))
    },
    isFollow(target) {
        return axios.get('/user/isFollow', {params: {target}})
    },
    changeUserProfile(changeUserProfileReq) {
        return axios.post('/user/changeProfile', qs.stringify(changeUserProfileReq))
    },
    history() {
        return axios.get('/user/history')
    },
    posts() {
        return axios.get('/user/posts')
    },
    following() {
        return axios.get('/user/following')
    },
    follower() {
        return axios.get('/user/follower')
    },
    collection() {
        return axios.get('/user/collection')
    },
    stats() {
        return axios.get('/user/stats')
    },
    notifications() {
        return axios.get('/user/notifications')
    },
    getThread(tid, page) {
        return axios.get('/thread/getThread', {params: {tid, page}})
    },
    levelNum(tid) {
        return axios.get('/thread/levelNum', {params: {tid}})
    },
    getReply(lid) {
        return axios.get('/thread/getReply', {params: {lid}})
    },
    createLevel(tid, content) {
        return axios.post('/thread/createLevel', qs.stringify({tid, content}))
    },
    createThread(title, content) {
        return axios.post('/thread/createThread', qs.stringify({title, content}))
    },
    createReply(lid, content, to) {
        return axios.post('/thread/createReply', qs.stringify({lid, content, to}))
    },
    delReply(rid) {
        return axios.post('/thread/delReply', qs.stringify({rid}))
    },
    delLevel(lid) {
        return axios.post('/thread/delLevel', qs.stringify({lid}))
    },
    delThread(tid) {
        return axios.post('/thread/delThread', qs.stringify({tid}))
    },
    isFav(lid) {
        return axios.get('/thread/isFav', {params: {lid}})
    },
    fav(tid, lid, positive) {
        return axios.post('/thread/fav', qs.stringify({tid, lid, positive}))
    },
    favNum(lid) {
        return axios.get('/thread/favNum', {params: {lid}})
    },
    isCollect(tid) {
        return axios.get('/thread/isCollect', {params: {tid}})
    },
    collect(tid, positive) {
        return axios.post('/thread/collect', qs.stringify({tid, positive}))
    },
    visit(tid) {
        return axios.post('/thread/visit', qs.stringify({tid}))
    }
}