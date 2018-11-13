// @flow
import type { State } from 'types/store'
import type { Dispatch } from 'types/action'
import type { Location } from 'react-router-dom'
import type { ComponentType } from 'react'

import { connect } from 'react-redux'
import { searchAll } from 'actions/entities/search'
import { SearchTypes } from 'actions/types'
import { getMovieResults } from 'selectors/movie'
import { getProfileResults } from 'selectors/user'
import { isLoading, getErrors } from 'selectors/api'
import { parseQueryString } from 'utils/utils'
import SearchResults from 'components/search_results/search_results'

function mapStateToProps (state: State, { location }: { location: Location }) {
  const searchQuery = (parseQueryString(location.search))['search_query'] || ''
  return {
    movies: getMovieResults(state, searchQuery),
    profiles: getProfileResults(state, searchQuery),
    loading: isLoading(state, [SearchTypes.SEARCH]),
    errors: getErrors(state, [SearchTypes.SEARCH])
  }
}

function mapDispatchToProps (dispatch: Dispatch, { location }: { location: Location }) {
  const searchQuery = (parseQueryString(location.search))['search_query'] || ''
  return {
    search: () => dispatch(searchAll(searchQuery)),
    clearErrors: () => dispatch({ type: SearchTypes.SEARCH + '_CLEAR', data: undefined })
  }
}

export default (connect(mapStateToProps, mapDispatchToProps)(SearchResults): ComponentType<{}>)
