// @flow
import type { ApiState } from 'types/api'
import type { ActorState } from 'types/actor'
import type { MovieState } from 'types/movie'
import type { ProfileState } from 'types/profile'

export type State = {|
  entities: {|
    api: ApiState,
    actor: ActorState,
    movie: MovieState,
    profile: ProfileState
  |}
|}
