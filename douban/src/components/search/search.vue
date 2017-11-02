<template>
	<div>
		<div id="search">
			<input type="search" v-on:blur="_search()" v-model="search" placeholder="请输入影片名或演员">
			<span @click="_search()">搜索</span>
		</div>
		<div id="moreMovie">
    <h1>{{ result.title }} <span v-if="result.total">({{ result.total }})</span></h1>
			<div id="movieLists">
	      <ul class="items">
	        <li v-for="item in result.subjects">
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
	      </ul>
	    </div>
	  </div>
	</div>
</template>
<script>
export default {
  data () {
    return {
      search: [],
      result: ''
    }
  },
  activated () {
    this.result = ''
  },
  methods: {
    _search () {
      if (!this.search.length) {
        return
      }
      let starName = this.search
      let url = 'https://api.douban.com/v2/movie/search?q='
      this.$http.jsonp(url + starName, {params: {'start': 0, 'count': 40}}).then(function (data) {
        if (data.status === 200 && data) {
          this.result = data.body
        }
        this.search = []
      }).catch(function (err) {
        console.log(err)
        this.search = []
      })
    }
  },
  watch: {
  }
}
</script>
<style scoped>
	@import '../../../static/css/search.css';
</style>