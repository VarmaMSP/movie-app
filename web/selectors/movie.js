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

export function getMovieResults (state: State, searchQuery: string): Array<Movie> {
  const results = state.entities.movie.searchResults[searchQuery]
  return results
    ? results.map((m) => state.entities.movie.byId[m])
    : []
}

export function getDiscoverMovies (state: State): Array<Movie> {
  return state.entities.movie.discoverMovies.map(
    (m) => state.entities.movie.byId[m]
  )
}
