// @flow
import type { Action } from 'types/action'
import type { Movie } from 'types/movie'

import { combineReducers } from 'redux'
import { MovieTypes } from 'actions/types'

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
    default:
      return state
  }
}

export default combineReducers({
  byId: movies
})
