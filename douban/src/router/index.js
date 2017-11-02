import Vue from 'vue'
import Router from 'vue-router'
import Movie from '@/components/movie/movie'
import MovieList from '@/components/movie/movieList'
import MovieDetails from '@/components/movie/movieDetails'
import Book from '@/components/book/book'
import BookDetails from '@/components/book/bookDetails'
import Music from '@/components/music/music'
import MusicDetails from '@/components/music/musicDetails'
import City from '@/components/city/city'
import Search from '@/components/search/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/movie',
      component: Movie
    },
    {
      path: '/movie/:type',
      component: MovieList
    },
    {
      path: '/book',
      component: Book
    },
    {
      path: '/book/:id',
      component: BookDetails
    },
    {
      path: '/music',
      component: Music
    },
    {
      path: '/music/:id',
      component: MusicDetails
    },
    {
      path: '/subject/:tab',
      component: MovieDetails
    },
    {
      path: '/city',
      component: City
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/*',
      redirect: '/movie'
    }
  ]
})
