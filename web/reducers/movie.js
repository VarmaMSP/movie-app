// @flow
import type { Action } from 'types/action'
import type { Movie } from 'types/movie'

import { combineReducers } from 'redux'
import { MovieTypes, SearchTypes } from 'actions/types'

function movies (state: {[number]: Movie} = {}, action: Action): {[number]: Movie} {
  switch (action.type) {
    case MovieTypes.GET_MOVIE_SUCCESS:
      return {
        ...state,
        [action.data.id]: action.data
      }
    case MovieTypes.BOOKMART_MOVIE_SUCCESS:
      return {
        ...state,
        [action.data.movieId]: {
          ...state[action.data.movieId],
          opinion: action.data.opinion
        }
      }
    case MovieTypes.DISCOVER_MOVIES_SUCCESS:
    case SearchTypes.SEARCH_SUCCESS:
      const movies = action.data.movies.reduce((acc, m) =>
        ({ ...acc, [m.id]: m }), {}
      )
      return {
        ...state,
        ...movies
      }
    default:
      return state
  }
}

function searchResults (state: {[string]: Array<number>} = {}, action: Action): {[string]: Array<number>} {
  switch (action.type) {
    case SearchTypes.SEARCH_SUCCESS:
      return {
        ...state,
        [action.data.searchQuery]: action.data.movies.map(m => m.id)
      }
    default:
      return state
  }
}

function discoverMovies (state: Array<Movie> = [], action: Action): Array<Movie> {
  switch (action.type) {
    case MovieTypes.DISCOVER_MOVIES_SUCCESS:
      return action.data.movies.map(m => m.id)
    default:
      return state
  }
}

export default combineReducers({
  byId: movies,
  searchResults,
  discoverMovies
})
