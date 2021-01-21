<template>
  <div class="hello">
    <h1>{{list.address}}</h1>
    <h3 @click="changetoken">请点击我</h3>
  </div>
</template>

<script>
import {postActionTest} from '../api/api'
export default {
  data(){
    return {
      list:[]
    }
  },
  methods:{
    changetoken(){
        this.$store.dispatch('tokenchange');
        postActionTest([34]).then(res=>{
            this.list = res.result[0]
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
  cursor: pointer;
}
</style>
