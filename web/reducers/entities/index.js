// @flow
import { combineReducers } from 'redux'

import api from 'reducers/entities/api'
import movie from 'reducers/entities/movie'
import actor from 'reducers/entities/actor'
import profile from 'reducers/entities/profile'

export default combineReducers({
  api,
  movie,
  actor,
  profile
})
