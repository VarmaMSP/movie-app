// @flow
import type { Action } from 'types/action'
import type { User, Profile } from 'types/profile'

import { combineReducers } from 'redux'
import { AuthTypes, ProfileTypes, SearchTypes } from 'actions/types'

function profiles (state: {[number]: Profile} = {}, action: Action): {[number]: Profile} {
  switch (action.type) {
    case ProfileTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        [action.data.userId]: action.data
      }
    case ProfileTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        [action.data.userId]: {
          ...state[action.data.userId],
          ...action.data
        }
      }
    case SearchTypes.SEARCH_SUCCESS:
      const newProfiles = action.data.profiles.reduce((acc, p) =>
        ({ ...acc, [p.userId]: p }), {}
      )
      return {
        ...state,
        ...newProfiles
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
        [action.data.searchQuery]: action.data.profiles.map(p => p.userId)
      }
    default:
      return state
  }
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
  searchResults,
  loggedInUser
})
