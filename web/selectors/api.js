// @flow
import type { State } from 'types/store'

export function isLoading (state: State, requests: Array<string>): boolean {
  return requests
    .some(req => state.entities.api.loading[req])
}

export function getErrors (state: State, requests: Array<string>): ?Array<string> {
  const errors = requests
    .map(req => state.entities.api.error[req] || [])
    .reduce((acc, val) => [...acc, ...val])
  return errors.length > 0 ? errors : undefined
}
