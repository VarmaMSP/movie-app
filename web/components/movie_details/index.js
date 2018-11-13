// @flow
import type { State } from 'types/store'
import type { Dispatch } from 'types/action'
import type { ComponentType } from 'react'
import type { Match } from 'react-router-dom'

import { connect } from 'react-redux'
import { MovieTypes } from 'actions/types'
import { getMovieById, getMovieCast, bookmartMovie } from 'actions/entities/movie'
import { getErrors, isLoading } from 'selectors/api'
import { getMovie, getCast } from 'selectors/movie'
import MovieDetails from 'components/movie_details/movie_details'

function mapStateToProps (state: State, { match }: { match: Match }) {
  const movieId = Number(match.params.movieId) || 616
  const movie = getMovie(state, movieId)
  return {
    movie,
    cast: getCast(state, movieId),
    canBookmart: movie && !movie.opinion,
    loading: isLoading(state, [MovieTypes.GET_MOVIE, MovieTypes.GET_MOVIE_CAST]),
    errors: getErrors(state, [MovieTypes.GET_MOVIE, MovieTypes.GET_MOVIE_CAST])
  }
}

function mapDispatchToProps (dispatch: Dispatch, { match }: { match: Match }) {
  const movieId = Number(match.params.movieId) || 616
  return {
    getDetails: () => {
      dispatch(getMovieById(movieId))
      dispatch(getMovieCast(movieId))
    },
    bookmart: (a: 'LIKE' | 'DISLIKE') => dispatch(bookmartMovie(movieId, a)),
    clearErrors: () => {
      dispatch({ type: MovieTypes.GET_MOVIE + '_CLEAR', data: undefined })
      dispatch({ type: MovieTypes.GET_MOVIE_CAST + '_CLEAR', data: undefined })
    }
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(MovieDetails): ComponentType<{}>)
