// @flow
import type { Action, Dispatch, Thunk } from 'types/action'

import { AppError } from 'utils/error'

export function defaultApiThunk (
  api: (...params: any) => Promise<mixed>,
  apiParams: Array<any>,
  requestActionType: string,
  successActionType: string,
  failureActionType: string,
  successAction?: (mixed) => Action
): Thunk {
  return async (dispatch: Dispatch) => {
    dispatch({ type: requestActionType, data: undefined })
    try {
      const data = await api(...apiParams)
      if (successAction) {
        dispatch(successAction(data))
      } else {
        dispatch({ type: successActionType, data })
      }
    } catch (err) {
      if (err instanceof AppError) {
        dispatch({ type: failureActionType, data: err.errors })
      } else {
        dispatch({ type: failureActionType, data: ['Something went wrong.'] })
      }
    }
  }
}
