// @flow
import type { State } from 'types/store'
import type { Dispatch } from 'types/action'
import type { Match } from 'react-router-dom'
import type { ComponentType } from 'react'

import { connect } from 'react-redux'
import { ProfileTypes } from 'actions/types'
import { getProfile } from 'selectors/user'
import { isLoading, getErrors } from 'selectors/api'
import { getProfile as getProfileA, updateProfile } from 'actions/entities/profile'
import Profile from 'components/profile/profile'

function mapStateToProps (state: State, { match }: { match: Match }) {
  const userId = Number(match.params.userId)
  const profile = getProfile(state, userId || undefined)
  const canEdit = !userId && profile ? !profile.about : false
  return {
    canEdit,
    profile,
    loading: isLoading(state, [ProfileTypes.GET_PROFILE]),
    errors: getErrors(state, [ProfileTypes.GET_PROFILE])
  }
}

function mapDispatchToProps (dispatch: Dispatch, { match }: { match: Match }) {
  const userId = Number(match.params.userId)
  return {
    getProfile: () => dispatch(getProfileA(userId || undefined)),
    updateProfile: (about, image) => dispatch(updateProfile(about, image)),
    clearErrors: () => dispatch({ type: ProfileTypes.GET_PROFILE + '_CLEAR', data: undefined })
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Profile): ComponentType<{}>)
