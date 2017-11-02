<template>
  <div id="movieDetails">
  	<h1 v-if="CityDetails.total">所在城市-北京({{ CityDetails.total }})</h1>
    <div v-for="item in CityDetails.events" id="movieDetailsInfo">
      <div id="infoRight">
        <a href="javascript:;">
          <img v-lazy="item.image" alt="">
        </a> 
      </div>
      <div class="infoLeft">
      	<h3>{{ item.title }}</h3>
        <p id="performer">
          <span>举办人：{{ item.owner.name}}</span><br>
          <span>地点：{{ item.address }}</span><br>
          <span>时间：{{ item.begin_time }} - {{ item.end_time }}</span><br>
          <span v-if="item.tags">标签：{{ item.tags }}</span><br>
          <span>价格：<span style="color:red">{{ item.fee_str }}</span></span><br>
        </p>
      </div>
    </div>
    <div v-show="!CityDetails" class="loading"><img src="static/imgs/loading.gif" alt=""></div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        CityDetails: ''
      }
    },
    activated () {
      this._CityDetails()
    },
    methods: {
      _CityDetails () {
        this.CityDetails = ''
        this.$http.jsonp('https://api.douban.com/v2/event/list', {params: {'loc': 108288, 'day_type': 'today', 'type': 'all', 'start': 0, 'count': 20}}).then(function (data) {
          if (data.status === 200 && data) {
            this.CityDetails = data.body
            console.log(data.body)
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
	#movieDetailsInfo {
	  margin-top: 1rem;
	  border-bottom: 1px solid #ededed;
	}
	h3{
		font-size: 1rem;
	}
</style>