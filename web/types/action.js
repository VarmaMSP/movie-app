// @flow

import type { State } from 'types/store'

export type GetState = () => State

export type Action = { type: string, data: any }

export type Thunk = (dispatch: Dispatch, getState: GetState) => Promise<any> // eslint-disable-line no-use-before-define

export type Dispatch = (action: Action | Thunk) => void
