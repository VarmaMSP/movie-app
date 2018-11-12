// @flow
import client from 'client'
import { ProfileTypes } from 'actions/types'
import { defaultApiThunk } from 'actions/utils'

export function getProfile (userId: ?number) {
  return defaultApiThunk(
    (a) => client.getProfile(a),
    [userId],
    ProfileTypes.GET_PROFILE_REQUEST,
    ProfileTypes.GET_PROFILE_SUCCESS,
    ProfileTypes.GET_PROFILE_FAILURE
  )
}

export function updateProfile (about: string, image: string) {
  return defaultApiThunk(
    (a, b) => client.updateProfile(a, b),
    [about, image],
    ProfileTypes.UPDATE_PROFILE_REQUEST,
    ProfileTypes.UPDATE_PROFILE_SUCCESS,
    ProfileTypes.UPDATE_PROFILE_FAILURE
  )
}
