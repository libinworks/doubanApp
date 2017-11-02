<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" id="moreMovie">
    <h1>{{ MovieComing.title }}</h1>
    <div id="movieLists">
      <ul class="items">
        <!-- <li v-if="!MovieComing.data" v-for="item in MovieComing.subjects"> -->
        <li v-for="item in MovieComing.subjects">
          <router-link :to="'/subject/'+item.id">
            <img class="movieImg" v-lazy="item.subject?item.subject.images.large:item.images.large" alt="">
            <p class="movieTitle">{{ item.subject?item.subject.title:item.title }}</p>
            <div v-if="item.subject?false:true" class="rank">
              <span v-if="item.rating.average">
                <span v-for="st in Math.floor(item.rating.average/2)" class="star_full"></span>
                <span v-for="st in (5-Math.floor(item.rating.average/2))" class="star_gray"></span>
              </span>
              <span v-if="item.rating.average">{{ item.rating.average }}</span>
              <span v-else>暂无评分</span>
            </div>
            <div v-else class="rank">
              <span v-if="item.subject.rating.average">
                <span v-for="st in Math.floor(item.subject.rating.average/2)" class="star_full"></span>
                <span v-for="st in (5-Math.floor(item.subject.rating.average/2))" class="star_gray"></span>
              </span>
              <span v-if="item.subject.rating.average">{{ item.subject.rating.average }}</span>
              <span v-else>暂无评分</span>
            </div>
          </router-link>
        </li>
        <li v-show="!MovieComing" class="loading"><img src="static/imgs/loading.gif" alt=""></li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        MovieComing: ''
      }
    },
    activated () {
      this.MovieComing = ''
      this._MovieComing()
    },
    methods: {
      _MovieComing (num1, num2) {
        let detailsPath = this.$parent.$route.path
        let url = 'https://api.douban.com/v2'
        this.$http.jsonp(url + detailsPath, {params: {'start': 0, 'count': 40}}).then(function (data) {
          if (data.status === 200 && data) {
            this.MovieComing = data.body
          }
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    watch: {
    }
  }
</script>
<style scoped>
  .items>li:nth-of-type(8){
    margin-right: 0;
  }
</style>