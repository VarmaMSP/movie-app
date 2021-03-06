// @flow
import ISO6391 from 'iso-639-1'

import { tmdbP } from 'store'
import bookmart from 'model/bookmart'

type MovieStatus =
    'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post Production'
  | 'Released'
  | 'Canceled'

type MovieDetails = {|
  id: number,
  title: string,
  language: string,
  overview: ?string,
  poster: ?string,
  backdrop: ?string,
  status: MovieStatus,
  rating: number,
  releaseDate: string,
  runtime: number,
  opinion?: 'LIKE' | 'DISLIKE'
|}

type CastMember = {|
  id: number,
  name: string,
  character: string,
  poster: ?string
|}

async function getById (userId: number, movieId: number): Promise<MovieDetails> {
  const tmdb = await tmdbP
  const resp = await tmdb.getMovie(movieId)
  const details = {
    id: resp.id,
    title: resp.title,
    overview: resp.overview,
    language: ISO6391.getName(resp.original_language),
    poster: tmdb.getPosterRoute(resp.poster_path, 'M'),
    backdrop: tmdb.getBackdropRoute(resp.backdrop_path, 'L'),
    status: resp.status,
    releaseDate: resp.release_date,
    rating: resp.vote_average,
    runtime: resp.runtime,
    opinion: undefined
  }
  try {
    details.opinion = await bookmart.getUserOpinion(userId, movieId)
  } catch (err) {}
  return details
}

async function getCast (movieId: number): Promise<Array<CastMember>> {
  const tmdb = await tmdbP
  const resp = await tmdb.getMovieCredits(movieId)
  return resp.cast.slice(0, 6).map(c => ({
    id: c.id,
    name: c.name,
    character: c.character,
    poster: tmdb.getProfileRoute(c.profile_path, 'M')
  }))
}

type SearchResp = { total: number, movies: Array<MovieDetails> }

async function search (searchQuery: string, page: number): Promise<SearchResp> {
  const tmdb = await tmdbP
  const resp = await tmdb.searchMovies(searchQuery, page)
  return {
    total: resp.total_pages,
    movies: resp.results.map(m => ({
      id: m.id,
      title: m.title,
      overview: m.overview,
      language: ISO6391.getName(m.original_language),
      poster: tmdb.getPosterRoute(m.poster_path, 'S'),
      backdrop: tmdb.getBackdropRoute(m.backdrop_path, 'L'),
      status: m.status,
      releaseDate: m.release_date,
      rating: m.vote_average,
      runtime: m.runtime
    }))
  }
}

async function discover (): Promise<{ movies: Array<MovieDetails> }> {
  const tmdb = await tmdbP
  const resp1 = await tmdb.discoverMovies(1)
  const resp2 = await tmdb.discoverMovies(2)

  return {
    movies: resp1.results.concat(resp2.results).map(m => ({
      id: m.id,
      title: m.title,
      overview: m.overview,
      language: ISO6391.getName(m.original_language),
      poster: tmdb.getPosterRoute(m.poster_path, 'S'),
      backdrop: tmdb.getBackdropRoute(m.backdrop_path, 'L'),
      status: m.status,
      releaseDate: m.release_date,
      rating: m.vote_average,
      runtime: m.runtime
    }))
  }
}

export default { getById, getCast, search, discover }
