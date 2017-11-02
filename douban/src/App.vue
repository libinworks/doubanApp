<template>
  <div id="app">
    <my-nav></my-nav>
    <keep-alive>
      <router-view/>
    </keep-alive>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import '../static/js/rem.js'
  import myNav from '@/components/my-nav/my-nav'
  import myFooter from '@/components/footer/footer'
  export default {
    components: {
      myNav,
      myFooter
    },
    created () {},
    watch: {
      $route: function () {
        // console.log(this.$route.path)
      }
    }
  }
</script>
  
<style>
  @import './assets/swiper-3.4.2.min.css';
  @import '../static/css/reset.css';
  @import '../static/css/index.css';
  #unfinished{
    color: #aaa;
    font-size: 0.9rem;
    text-align: center;
    margin: 5rem 0;
  }
</style>
