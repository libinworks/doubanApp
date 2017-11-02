<template>
  <div id="movieDetails">
    <div v-show="!MovieDetails" class="loading" style="width:100%"><img src="static/imgs/loading.gif" alt=""></div>
    <h1>{{ MovieDetails.body.title }}</h1>
    <div id="movieDetailsInfo">
      <div id="infoRight">
        <a href="javascript:;">
          <img v-if="MovieDetails.body" v-lazy="MovieDetails.body.images.large" alt="">
        </a> 
      </div>
      <div class="infoLeft">
        <div class="rank">
          <span v-if="MovieDetails.body.rating.average">
            <span v-for="st in Math.floor(MovieDetails.body.rating.average/2)" class="star_full"></span>
            <span v-for="st in (5-Math.floor(MovieDetails.body.rating.average/2))" class="star_gray"></span>
          </span>
          <span v-if="MovieDetails.body.rating.average">{{ MovieDetails.body.rating.average }}</span>
          <p v-if="MovieDetails.body.rating.average">{{ MovieDetails.body.ratings_count }}人评价</p>
          <span v-else>暂无评分</span>
        </div>
        <p id="performer">
          <span>类型：<span v-for="item in MovieDetails.body.genres">{{ item + '/' }}</span></span><br>
          <span>制片国家/地区：<span v-for="item in MovieDetails.body.genres">{{ item + '/' }}</span></span>  
          <span>年代：<span>{{ MovieDetails.body.year }}</span></span><br>
          <span>导演：<span v-for="item in MovieDetails.body.directors">{{ item.name + '/' }}</span></span><br>
          <span>演员：<span v-for="item in MovieDetails.body.casts">{{ item.name + '/' }}</span></span><br>
          <span>又名：<span v-for="item in MovieDetails.body.aka">{{ '《' + item + '》 ' }}</span></span><br>
        </p>
      </div>
    </div>
    <div id="look">
      <a href="javascript:;">想看</a>
      <a href="javascript:;">看过</a>
    </div>
    <div id="synopsis">
      <h2>{{ MovieDetails.body.title }}的剧情简介</h2>
      <p>{{ MovieDetails.body.summary }}</p>
    </div>
    <div v-if="false" id="synopsis">
      <h2>影人</h2>
      <div class="swiper-container">
        <ul class="items swiper-wrapper">
          <li class="swiper-slide" v-for="item in MovieDetails.body.irectords">
            <a href="javascript:;">
              <img class="movieImg" v-lazy="item.avatars.large" alt="">
              <span class="performerName">{{ item.name }}</span>
              <span class="performer">导演</span>
            </a>
          </li>
          <li class="swiper-slide" v-for="item in MovieDetails.body.casts?MovieDetails.body.casts:0">
            <a href="javascript:;">
              <img class="movieImg" v-lazy="item.avatars.large" alt="">
              <span class="performerName">{{ item.name }}</span>
              <span class="performer">演员</span>
            </a>
          </li>
          <li class="swiper-slide">
            <a href="javascript:;">
              <img class="movieImg" style="width: 7.5rem" src="" alt="">
              <span class="performerName"> </span>
              <span class="performer"> </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div v-if="false" id="synopsis">
      <h2>{{ MovieDetails.body.title }}剧照</h2>
      <ul class="items photos">
        <li>
          <a href="javascript:;">
            <img class="movieImg" src="static/imgs/photos.webp" alt="">
          </a>
        </li>
      </ul>
    </div>
    <div v-if="false" id="synopsis">
      <h2>{{ MovieDetails.body.title }}的短评(751)</h2>
      <ul class="movieComment">
        <li>
          <div class="otherUser">
            <a href="javascript:;"><img src="static/imgs/otherUser.jpg" alt=""></a>
            <div>
              <strong>橙橙</strong>
              <span>
                <span class="star_full"></span>
                <span class="star_full"></span>
                <span class="star_full"></span>
                <span class="star_gray"></span>
                <span class="star_gray"></span>
              </span>
              <div>2017-10-21 09:43:10</div>
            </div>
          </div>
          <p>{{ MovieDetails.body.title }}的短评全球风暴的短评全球风暴的短评全球风暴的短评全球风暴的短评全球风暴的短评全球风暴的短评全球风暴的短评全球风暴的短评</p>
          <div class="commentBtn">
            <a class="commentBtnLeft" href="javascript:;"><span>206</span></a>
            <a class="commentBtnRight" href="javascript:;"></a>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="false" id="synopsis">
      <h2>{{ MovieDetails.body.title }}的长影评(50)</h2>
      <ul class="movieComment">
        <li>
          <a href="javascript:;">
            <h3>“{{ MovieDetails.body.title }}”北美遇冷的一点思考</h3>
            <div>
              <span>SELVEN</span>
              <span>
                <span class="star_full"></span>
                <span class="star_full"></span>
                <span class="star_full"></span>
                <span class="star_gray"></span>
                <span class="star_gray"></span>
              </span>
            </div>
            <p>冷的一点思考冷的一点思考冷的一点思考冷的一点思考冷的一点思考</p>
            <p>76 有用</p>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import '../../../static/js/swiper-3.4.2.min.js'
  import '../../../static/js/swiper.js'
  export default {
    data () {
      return {
        MovieDetails: ''
      }
    },
    activated () {
      this.MovieDetails = ''
      this._MovieDetails()
    },
    methods: {
      _MovieDetails () {
        this.MovieDetails = ''
        let detailsPath = this.$parent.$route.path
        let url = 'https://api.douban.com/v2/movie'
        this.$http.jsonp(url + detailsPath).then(function (data) {
          if (data.status === 200 && data) {
            this.MovieDetails = data
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