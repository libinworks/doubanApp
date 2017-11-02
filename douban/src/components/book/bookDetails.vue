<template>
  <div id="movieDetails">
    <div v-show="!BookDetails" class="loading"><img src="static/imgs/loading.gif" alt=""></div>
    <h1>{{ BookDetails.title }}</h1>
    <div id="movieDetailsInfo">
      <div id="infoRight">
        <a href="javascript:;">
          <img v-lazy="BookDetails.images.large" alt="">
        </a> 
      </div>
      <div class="infoLeft">
        <div class="rank">
          <span v-if="BookDetails.rating.average">
            <span v-for="st in Math.floor(BookDetails.rating.average/2)" class="star_full"></span>
            <span v-for="st in (5-Math.floor(BookDetails.rating.average/2))" class="star_gray"></span>
          </span>
          <span v-if="BookDetails.rating.average">{{ BookDetails.rating.average }}</span>
          <!-- <p v-if="BookDetails.rating.average">{{ BookDetails.ratings_count }}人评价</p> -->
          <span v-else>暂无评分</span>
        </div>
        <p id="performer">
          <span>作者：<span v-for="item in BookDetails.author">{{ item + '/' }}</span></span><br>
          <span v-if="BookDetails.author_intro">作者信息：{{ BookDetails.author_intro }}</span><br>
          <span v-if="BookDetails.pubdate">出版年代：{{ BookDetails.pubdate }}</span><br>
          <span v-if="BookDetails.publisher">出版社：{{ BookDetails.publisher }}</span><br>
          <span v-if="BookDetails.pages">总页数：共{{ BookDetails.pages }}页</span><br>
          <span v-if="BookDetails.price">售价：<span style="color:red">{{ BookDetails.price }}</span></span><br>
        </p>
      </div>
    </div>
    <div id="look">
      <a href="javascript:;">想看</a>
      <a href="javascript:;">看过</a>
    </div>
    <div id="synopsis">
      <h2>{{ BookDetails.title }}的简介</h2>
      <p>{{ BookDetails.summary }}</p>
    </div>
  </div>
</template>
<script>
  import '../../../static/js/swiper-3.4.2.min.js'
  import '../../../static/js/swiper.js'
  export default {
    data () {
      return {
        BookDetails: ''
      }
    },
    activated () {
      this.BookDetails = ''
      this._BookDetails()
    },
    methods: {
      _BookDetails () {
        this.BookDetails = ''
        let detailsPath = this.$parent.$route.path
        let url = 'https://api.douban.com/v2/'
        this.$http.jsonp(url + detailsPath).then(function (data) {
          if (data.status === 200 && data) {
            this.BookDetails = data.body
            // console.log(data.body)
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
  .items>li{
    margin-left: 0;
    margin-right: 1.12rem;
  }
</style>