// @flow
import client from 'client'
import { SearchTypes } from 'actions/types'
import { defaultApiThunk } from 'actions/utils'

export function searchAll (searchQuery: string) {
  return defaultApiThunk(
    (a) => client.searchAll(a),
    [searchQuery],
    SearchTypes.SEARCH_REQUEST,
    SearchTypes.SEARCH_SUCCESS,
    SearchTypes.SEARCH_FAILURE,
    (data) => ({
      type: SearchTypes.SEARCH_SUCCESS,
      data: { searchQuery, ...data }
    })
  )
}
