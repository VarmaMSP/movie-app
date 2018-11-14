// @flow
import type { State } from 'types/store'
import type { Dispatch } from 'types/action'
import type { ComponentType } from 'react'

import { connect } from 'react-redux'
import { MovieTypes } from 'actions/types'
import { discoverMovies } from 'actions/movie'
import { getDiscoverMovies } from 'selectors/movie'
import { isLoading, getErrors } from 'selectors/api'
import Discover from 'components/discover/discover'

function mapStateToProps (state: State) {
  return {
    movies: getDiscoverMovies(state),
    loading: isLoading(state, [MovieTypes.DISCOVER_MOVIES]),
    errors: getErrors(state, [MovieTypes.DISCOVER_MOVIES])
  }
}

function mapDispatchToProps (dispatch: Dispatch) {
  return {
    discover: () => dispatch(discoverMovies()),
    clearErrors: () => dispatch({ type: MovieTypes.DISCOVER_MOVIES + '_CLEAR', data: undefined })
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(Discover): ComponentType<{}>)
