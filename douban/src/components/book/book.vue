<template>
	<div>
		<div id="search">
			<input type="search" v-on:blur="_search()" v-model="search" placeholder="请输入喜爱的图书或作者">
			<span @click="_search()">搜索</span>
		</div>
		<div id="moreMovie">
      <h1 v-if="result.total">共({{ result.total }})条</h1>
			<div id="movieLists">
	      <ul class="items">
	        <li v-for="item in result.books">
	          <router-link :to="'/book/'+item.id">
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
    <div v-show="!result" class="loading" style="width:100%"><img src="static/imgs/loading.gif" alt=""></div>
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
    this._search()
  },
  created () {
    this.search = ['莫言']
    this._search()
  },
  methods: {
    _search () {
      if (!this.search.length) {
        return
      }
      let starName = this.search
      let url = 'https://api.douban.com/v2/book/search?q='
      this.$http.jsonp(url + starName, {params: {'start': 0, 'count': 20}}).then(function (data) {
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