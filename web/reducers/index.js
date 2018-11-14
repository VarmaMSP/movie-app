// @flow
import { combineReducers } from 'redux'

import api from 'reducers/api'
import movie from 'reducers/movie'
import actor from 'reducers/actor'
import profile from 'reducers/profile'

export default combineReducers({
  api,
  movie,
  actor,
  profile
})
