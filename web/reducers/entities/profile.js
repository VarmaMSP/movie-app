// @flow
import type { Action } from 'types/action'
import type { User, Profile } from 'types/profile'

import { combineReducers } from 'redux'
import { AuthTypes } from 'actions/types'

function profiles (state: {[number]: Profile} = {}, action: Action): {[number]: Profile} {
  return state
}

function loggedInUser (state: ?User = null, action: Action): ?User {
  switch (action.type) {
    case AuthTypes.LOGIN_SUCCESS:
      return action.data
    case AuthTypes.SIGNUP_SUCCESS:
      return action.data
    case AuthTypes.LOGOUT_SUCCESS:
      return null
    default:
      return state
  }
}

export default combineReducers({
  byId: profiles,
  loggedInUser
})
