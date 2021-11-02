import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080'
axios.interceptors.request.use(config=>{
    if(localStorage.getItem('jwt')){
        config.headers['Authorization'] = 'Bearer '+ localStorage.getItem('jwt')
    }
})

export default {
    getHotPosts(){
        return axios.get('/home/getHotPosts')
    },
    getCarousel(){
        return axios.get('/home/getCarousel')
    },
    login(username,password){
        return axios.post('/user/login',{username,password})
    },
    register(username,password){
        return axios.post('/user/register',{username,password})
    },
    getPosts(pageNum,size){
        return axios.get('/home/getPosts',{
            params:{
                pageNum,size
            }
        })
    },
    getLevels(threadId){
        return axios.get('/thread/getLevels',{
            params:{
                threadId
            }
        })
    },
    createLevel(threadId,content){
        return axios.post('/thread/createLevel',{threadId,content})
    },
    createThread(content){
        return axios.post('/thread/createThread',{content})
    },
    reply(lid,content,replyTo){
        return axios.post('/thread/reply',{lid,content,replyTo})
    },
    delReply(rid){
        return axios.post('/thread/delReply',{rid})
    },
    delLevel(lid){
        return axios.post('/thread/delLevel',{lid})
    },
    delThread(id){
        return axios.post('/thread/delThread',{id})
    },
    fav(type,id){ //type=0 thread type=1 reply
        return axios.post('/thread/fav',{type,id})
    },
    collect(lid){
        return axios.post('/thread/collect',{lid})
    },
    changeUserProfile(changeUserProfileReq){
        return axios.post('/user/changeProfile',{profile: changeUserProfileReq})
    },
    /*
    /uploadImg
     */

}