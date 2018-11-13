// @flow
import type { Action } from 'types/action'
import type { Actor } from 'types/actor'

import { combineReducers } from 'redux'
import { MovieTypes } from 'actions/types'

function actors (state: {[number]: Actor} = {}, action: Action): {[number]: Actor} {
  switch (action.type) {
    case MovieTypes.GET_MOVIE_CAST_SUCCESS:
      const actors = action.data.cast.reduce((acc, actor) =>
        ({ ...acc, [actor.id]: actor }), {}
      )
      return {
        ...state,
        ...actors
      }
    default:
      return state
  }
}

type State = {[number]: Array<{|id: number, character: string|}>}

function cast (state: State = {}, action: Action): State {
  switch (action.type) {
    case MovieTypes.GET_MOVIE_CAST_SUCCESS:
      const cast = action.data.cast.map(
        actor => ({ id: actor.id, character: actor.character })
      )
      return {
        ...state,
        [action.data.movieId]: cast
      }
    default:
      return state
  }
}

export default combineReducers({
  byId: actors,
  cast
})
