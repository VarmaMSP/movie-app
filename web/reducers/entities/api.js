// @flow
import type { Action } from 'types/action'

import { combineReducers } from 'redux'

function loading (state: {[string]: boolean} = {}, { type }: Action): {[string]: boolean} {
  const apiReqMatches = /(.*)_(REQUEST|SUCCESS|FAILURE)/.exec(type)
  if (!apiReqMatches) {
    return state
  }
  const [, reqName, reqState] = apiReqMatches
  return {
    ...state,
    [reqName]: reqState === 'REQUEST'
  }
}

function error (state: {[string]: Array<string>} = {}, { type, data }: Action): {[string]: Array<string>} {
  const apiReqMatches = /(.*)_(REQUEST|SUCCESS|FAILURE|CLEAR)/.exec(type)
  if (!apiReqMatches) {
    return state
  }
  const [, reqName, reqState] = apiReqMatches
  return {
    ...state,
    [reqName]: reqState === 'FAILURE' ? data : []
  }
}

export default combineReducers({
  loading,
  error
})
