// @flow
import type { State } from 'types/store'
import type { Movie } from 'types/movie'
import type { CastMember } from 'types/actor'

export function getMovie (state: State, movieId: number): ?Movie {
  return state.movie.byId[movieId]
}

export function getCast (state: State, movieId: number): Array<CastMember> {
  const cast = state.actor.cast[movieId]
  return cast
    ? cast.map((a) => ({
      ...state.actor.byId[a.id],
      character: a.character
    }))
    : []
}

export function getMovieResults (state: State, searchQuery: string): Array<Movie> {
  const results = state.movie.searchResults[searchQuery]
  return results
    ? results.map((m) => state.movie.byId[m])
    : []
}

export function getDiscoverMovies (state: State): Array<Movie> {
  return state.movie.discoverMovies.map(
    (m) => state.movie.byId[m]
  )
}
