// @flow
import { combineReducers } from 'redux'

import api from 'reducers/entities/api'
import profile from 'reducers/entities/profile'

export default combineReducers({
  api,
  profile
})
