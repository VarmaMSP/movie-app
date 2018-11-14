// @flow
import type { Store as ReduxStore } from 'redux'
import type { ApiState } from 'types/api'
import type { ActorState } from 'types/actor'
import type { MovieState } from 'types/movie'
import type { ProfileState } from 'types/profile'
import type { Action, Dispatch } from 'types/action'

export type State = {|
  api: ApiState,
    actor: ActorState,
    movie: MovieState,
    profile: ProfileState
|}

export type Store = ReduxStore<State, Action, Dispatch>
