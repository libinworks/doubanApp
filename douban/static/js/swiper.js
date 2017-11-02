window.onload=function(){
	var rank = document.getElementsByClassName('rank');
	if (rank.length) {
		var mySwiper = new Swiper ('.swiper-container', {
			freeMode : true,
			freeModeMomentum : true,
			slidesPerView : 3,
			preloadImages : true,
			updateOnImagesReady : true,
			// spaceBetween : 20,
			slidesOffsetAfter : -60,
			observer: true, //修改swiper自己或子元素时，自动初始化swiper
			observeParents: true //修改swiper的父元素时，自动初始化swiper
		})
	}
	
}
