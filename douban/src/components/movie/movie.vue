<template>
	<div id="main">
    <div class="block">
      <header>
        <h2>影院热映</h2>
        <router-link to="/movie/in_theaters">更多</router-link>
      </header>
      <div class="swiper-container">
        <ul class="items swiper-wrapper">
          <li class="swiper-slide" v-if="Movieing.length" v-for="item in Movieing">
            <router-link :to="'/subject/'+item.id">
              <img class="movieImg" v-lazy="item.images.large" alt="">
              <p class="movieTitle">{{ item.title }}</p>
              <div class="rank">
                <span v-if="item.rating.average">
                  <span v-for="st in Math.floor(item.rating.average/2)" class="star_full"></span>
                  <span v-for="st in (5-Math.floor(item.rating.average/2))" class="star_gray"></span>
                </span>
                <span v-if="item.rating.average">{{ item.rating.average }}</span>
                <span v-else>暂无评分</span>
              </div>
            </router-link>
          </li>
          <li v-show="!Movieing.length" class="loading"><img src="static/imgs/loading.gif" alt=""></li>
        </ul>
      </div>
    </div>
    <div class="block">
      <header>
        <h2>即将上映</h2>
        <router-link to="/movie/coming_soon">更多</router-link>
      </header>
      <div class="swiper-container">
        <ul class="items swiper-wrapper">
          <li class="swiper-slide" v-if="movieComing.length" v-for="item in movieComing">
            <router-link :to="'/subject/'+item.id">
              <img class="movieImg" v-lazy="item.images.large" alt="">
              <p class="movieTitle">{{ item.title }}</p>
              <div class="rank">
                <span v-if="item.rating.average">
                  <span v-for="st in Math.floor(item.rating.average/2)" class="star_full"></span>
                  <span v-for="st in (5-Math.floor(item.rating.average/2))" class="star_gray"></span>
                </span>
                <span v-if="item.rating.average">{{ item.rating.average }}</span>
                <span v-else>暂无评分</span>
              </div>
            </router-link>
          </li>
          <li v-show="!movieComing.length" class="loading"><img src="static/imgs/loading.gif" alt=""></li>
        </ul>
      </div>
    </div>
    <div class="block">
      <header>
        <h2>排行榜</h2>
      </header>
      <ul id="rankList">
        <li>
          <router-link to="/movie/us_box">北美票房榜</router-link>
        </li>
        <li>
          <router-link to="/movie/weekly">口碑榜</router-link>
        </li>
        <li>
          <router-link to="/movie/new_movies">新片榜</router-link>
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
        Movieing: [],
        movieComing: []
      }
    },
    activated () {
      this._movieing()
      this._movieComing()
    },
    methods: {
      _movieing () {
        this.$http.jsonp('https://api.douban.com/v2/movie/in_theaters', {params: {'start': 0, 'count': 8}}).then(function (data) {
          if (data.status === 200 && data.body.subjects.length) {
            this.Movieing = data.body.subjects
          }
        }).catch(function (err) {
          console.log(err)
        })
      },
      _movieComing () {
        this.$http.jsonp('https://api.douban.com/v2/movie/coming_soon', {params: {'start': 0, 'count': 8}}).then(function (data) {
          if (data.status === 200 && data.body.subjects.length) {
            this.movieComing = data.body.subjects
          }
        }).catch(function (err) {
          console.log(err)
        })
      }
    },
    filters: {
      setTab: function (num) {
        if (num > 0 && num <= 2) {
          return ['1']
        } else if (num < 2 && num <= 4) {
          return ['1', '1']
        } else if (num > 4 && num <= 6) {
          return ['1', '1', '1']
        } else if (num > 6 && num <= 8) {
          return ['1', '1', '1', '1']
        } else if (num > 8 && num <= 10) {
          return ['1', '1', '1', '1', '1']
        }
      }
    }
  }
</script>
<style>
</style>