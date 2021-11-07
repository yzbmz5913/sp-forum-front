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
        return axios.get('/auth',{
            headers:{
                'Authorization': localStorage.getItem('jwt')
            }
        })
    },
    getHotPosts() {
        return axios.get('/home/getHotPosts')
    },
    getCarousel() {
        return axios.get('/home/getCarousel')
    },
    login(username, password) {
        return axios.post('/user/login', qs.stringify({username, password}))
    },
    register(username, password, password2) {
        return axios.post('/user/register', qs.stringify({username, password, password2}))
    },
    follow(target,positive){
        return axios.post('/user/follow', qs.stringify({target,positive}))
    },
    isFollow(target){
        return axios.get('/user/isFollow', {params:{target}})
    },
    changeUserProfile(changeUserProfileReq) {
        return axios.post('/user/changeProfile', qs.stringify(changeUserProfileReq))
    },
    stats(){
        return axios.get('/user/stats')
    },
    getPosts(pageNum, size) {
        return axios.get('/home/getPosts', {params: {pageNum, size}})
    },
    getThread(tid,page) {
        return axios.get('/thread/getThread', {params: {tid,page}})
    },
    levelNum(tid){
        return axios.get('/thread/levelNum', {params: {tid}})
    },
    getReply(lid){
        return axios.get('/thread/getReply', {params: {lid}})
    },
    createLevel(tid, content) {
        return axios.post('/thread/createLevel', qs.stringify({tid, content}))
    },
    createThread(title,content) {
        return axios.post('/thread/createThread', qs.stringify({title,content}))
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
        return axios.get('/thread/fav', {params:{lid}})
    },
    fav(tid,lid,positive) {
        return axios.post('/thread/fav', qs.stringify({tid,lid,positive}))
    },
    favNum(lid) {
        return axios.get('/thread/fav', {params:{lid}})
    },
    isCollect(tid) {
        return axios.get('/thread/isCollect', {params:{tid}})
    },
    collect(tid,positive) {
        return axios.post('/thread/collect', qs.stringify({tid,positive}))
    },
}