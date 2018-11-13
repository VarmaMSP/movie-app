// @flow
import type { State } from 'types/store'
import type { Movie } from 'types/movie'
import type { CastMember } from 'types/actor'

export function getMovie (state: State, movieId: number): ?Movie {
  return state.entities.movie.byId[movieId]
}

export function getCast (state: State, movieId: number): Array<CastMember> {
  const cast = state.entities.actor.cast[movieId]
  return cast
    ? cast.map((a) => ({
      ...state.entities.actor.byId[a.id],
      character: a.character
    }))
    : []
}
