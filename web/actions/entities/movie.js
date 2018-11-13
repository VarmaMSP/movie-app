// @flow
import client from 'client'
import { MovieTypes } from 'actions/types'
import { defaultApiThunk } from 'actions/utils'

export function getMovieById (movieId: number) {
  return defaultApiThunk(
    (a) => client.getMovieById(a),
    [movieId],
    MovieTypes.GET_MOVIE_REQUEST,
    MovieTypes.GET_MOVIE_SUCCESS,
    MovieTypes.GET_MOVIE_FAILURE
  )
}

export function getMovieCast (movieId: number) {
  return defaultApiThunk(
    (a) => client.getMovieCast(a),
    [movieId],
    MovieTypes.GET_MOVIE_CAST_REQUEST,
    MovieTypes.GET_MOVIE_CAST_SUCCESS,
    MovieTypes.GET_MOVIE_CAST_FAILURE,
    (data) => ({ type: MovieTypes.GET_MOVIE_CAST_SUCCESS, data: { movieId, cast: data } })
  )
}

export function bookmartMovie (movieId: number, action: 'LIKE' | 'DISLIKE') {
  return defaultApiThunk(
    (a, b) => client.bookmartMovie(a, b),
    [movieId, action],
    MovieTypes.BOOKMART_MOVIE_REQUEST,
    MovieTypes.BOOKMART_MOVIE_SUCCESS,
    MovieTypes.BOOKMART_MOVIE_FAILURE
  )
}
