<template>
<div class="user-right">
  <ul>
    <li v-for="n in notices">
      <nt :post="n.post" :content="n.content" :from="n.from" :type="n.type" :date="n.date"></nt>
    </li>
  </ul>
</div>
</template>

<script>
import nt from "../../components/user/Notification";
export default {
  name: "Notification",
  components: {
    nt
  },
  data(){
    return {
      notices: [
        {
          type: 2,
          from: {name:'kyle',uid:2,faceUrl:'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg'},
          post: {title:'风暴英雄使我快乐',id: 1},
          date: '2021-10-22 01:34:56'
        },
        {
          type: 1,
          from: {name:'kyle',uid:2,faceUrl:'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg'},
          date: '2021-10-22 01:22:56',
        },
        {
          type: 3,
          from: {name:'kenny',uid:3,faceUrl:'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg'},
          post: {title:'风暴英雄使我快乐',id:1},
          content: '我也喜欢风暴',
          date: '2021-10-22 01:00:56'
        },{
          type: 2,
          from: {name:'kyle',uid:2,faceUrl:'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg'},
          post: {title:'风暴英雄使我快乐',id:1},
          date: '2021-10-22 01:34:56'
        },
        {
          type: 1,
          from: {name:'kyle',id:2,faceUrl:'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg'},
          date: '2021-10-22 01:22:56',
        },
        {
          type: 3,
          from: {name:'kenny',id:3,faceUrl:'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg'},
          post: {title:'风暴英雄使我快乐',id:1},
          content: '我也喜欢风暴',
          date: '2021-10-22 01:00:56'
        },{
          type: 2,
          from: {name:'kyle',id:2,faceUrl:'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg'},
          post: {title:'风暴英雄使我快乐',id:1},
          date: '2021-10-22 01:34:56'
        },
        {
          type: 1,
          from: {name:'kyle',id:2,faceUrl:'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg'},
          date: '2021-10-22 01:22:56',
        },
        {
          type: 3,
          from: {name:'kenny',id:3,faceUrl:'https://pbs.twimg.com/profile_images/1440447840925282307/JyEMm4MJ_400x400.jpg'},
          post: {title:'风暴英雄使我快乐',id:1},
          content: '我也喜欢风暴',
          date: '2021-10-22 01:00:56'
        },
      ]
    }
  }
}
</script>

<style scoped>

</style>