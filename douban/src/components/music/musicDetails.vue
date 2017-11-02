<template>
  <div id="movieDetails">
    <div v-show="!MusicDetails" class="loading"><img src="static/imgs/loading.gif" alt=""></div>
    <h1>{{ MusicDetails.title }}</h1>
    <div id="movieDetailsInfo">
      <div id="infoRight">
        <a href="javascript:;">
          <img v-lazy="MusicDetails.image" alt="">
        </a> 
      </div>
      <div class="infoLeft">
        <div class="rank">
          <span v-if="MusicDetails.rating.average">
            <span v-for="st in Math.floor(MusicDetails.rating.average/2)" class="star_full"></span>
            <span v-for="st in (5-Math.floor(MusicDetails.rating.average/2))" class="star_gray"></span>
          </span>
          <span v-if="MusicDetails.rating.average">{{ MusicDetails.rating.average }}</span>
          <!-- <p v-if="BookDetails.rating.average">{{ BookDetails.ratings_count }}人评价</p> -->
          <span v-else>暂无评分</span>
        </div>
        <p id="performer">
          <span>作者：<span v-for="item in MusicDetails.author">{{ item.name + '/' }}</span></span><br>
          <span v-if="MusicDetails.attrs.pubdate">出版年代：{{ MusicDetails.attrs.pubdate[0] }}</span><br>
          <span v-if="MusicDetails.attrs.publisher">出版商：{{ MusicDetails.attrs.publisher[0] }}</span><br>
          <span v-if="MusicDetails.attrs.version">类型：{{ MusicDetails.attrs.version[0] }}</span><br>
          <span v-if="MusicDetails.attrs.tracks">描述：<span>{{ MusicDetails.attrs.tracks[0] }}</span></span><br>
        </p>
      </div>
    </div>
    <div id="look">
      <a href="javascript:;">想看</a>
      <a href="javascript:;">看过</a>
    </div>
    <div id="synopsis">
      <h2>{{ MusicDetails.title }}的简介</h2>
      <p>{{ MusicDetails.summary }}</p>
    </div>
  </div>
</template>
<script>
  import '../../../static/js/swiper-3.4.2.min.js'
  import '../../../static/js/swiper.js'
  export default {
    data () {
      return {
        MusicDetails: ''
      }
    },
    activated () {
      this.MusicDetails = ''
      this._MusicDetails()
    },
    methods: {
      _MusicDetails () {
        this.MusicDetails = ''
        let detailsPath = this.$parent.$route.path
        let url = 'https://api.douban.com/v2/'
        this.$http.jsonp(url + detailsPath).then(function (data) {
          if (data.status === 200 && data) {
            this.MusicDetails = data.body
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