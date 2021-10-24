<template>
<div class="user-right">
  <ul>
    <li v-for="u in users">
      <user-card :username="u.username" :desc="u.desc" :uid="u.uid" :is-follow="u.isFollow" :face-url="u.faceUrl"></user-card>
    </li>
  </ul>
</div>
</template>

<script>
import UserCard from "../../components/user/UserCard";
export default {
  name: "Follower",
  components:{
    UserCard
  },
  data(){
    return {
      users:[],
    }
  },
  watch: {
    '$route':{
      handler(to,from){
        if(to.fullPath.includes('follower')){
          this.users=[
            {
              uid: 2,
              username: 'kyle broflovski',
              faceUrl: 'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg',
              desc: '我是凯子follower',
              isFollow: false,
            },
            {
              uid: 3,
              username: 'kenny mccormick',
              faceUrl: 'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg',
              desc: '我是肯尼follower',
              isFollow: true,
            },
          ]
        }else{
          this.users=[
            {
              uid: 4,
              username: 'eric cartman',
              faceUrl: 'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg',
              desc: '我是卡胖following',
              isFollow: true,
            },
            {
              uid: 5,
              username: 'butters stotch',
              faceUrl: 'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg',
              desc: '我是黄油following',
              isFollow: true,
            },
          ]
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped>

</style>