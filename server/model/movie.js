// @flow
import ISO6391 from 'iso-639-1'

import AppError from 'model/error'
import { tmdbP } from 'store'

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
  poster: ?string,
  backdrop: ?string,
  status: MovieStatus,
  rating: number,
  releaseDate: string,
  runtime: number
|}

type CastMember = {|
  name: string,
  character: string,
  poster: ?string
|}

export default class Movie {
  async getById (movieId: number): Promise<MovieDetails> {
    const tmdb = await tmdbP
    const resp = await tmdb.getMovie(movieId)

    if (resp.status_code && resp.status_code === 7) {
      throw new AppError(500, resp.status_message, 'model.movie.getById')
    }
    if (resp.status_code && resp.status_code === 34) {
      throw new AppError(404, resp.status_message, 'model.movie.getById')
    }

    return {
      id: resp.id,
      title: resp.title,
      language: ISO6391.getName(resp.language),
      genres: resp.genres,
      poster: resp.poster_path ? tmdb.getPosterUrl(resp.poster_path, 'M') : undefined,
      backdrop: resp.backdrop_path ? tmdb.getBackdropUrl(resp.backdrop_path, 'L') : undefined,
      status: resp.status,
      releaseDate: resp.release_date,
      rating: resp.vote_average,
      runtime: resp.runtime
    }
  }

  async getCast (movieId: number): Promise<Array<CastMember>> {
    const tmdb = await tmdbP
    const resp = await tmdb.getMovieCredits(movieId)

    if (resp.status_code && resp.status_code === 7) {
      throw new AppError(500, resp.status_message, 'model.movie.getById')
    }
    if (resp.status_code && resp.status_code === 34) {
      throw new AppError(404, resp.status_message, 'model.movie.getById')
    }

    return resp.cast.map(c => ({
      name: c.name,
      character: c.character,
      poster: c.profile_path ? tmdb.getProfileUrl(c.profile_path, 'M') : undefined
    }))
  }

  async searchMovies (searchQuery: string, page: number = 1): Promise<{ total: number, movies: Array<MovieDetails> }> {
    const tmdb = await tmdbP
    const resp = await tmdb.searchMovies(searchQuery, page)

    if (resp.status_code && resp.status_code === 7) {
      throw new AppError(500, resp.status_message, 'model.movie.getById')
    }
    if (resp.status_code && resp.status_code === 34) {
      throw new AppError(404, resp.status_message, 'model.movie.getById')
    }

    return {
      totalPages: resp.total_pages,
      movies: resp.cast.map(m => ({
        id: m.id,
        title: m.title,
        language: ISO6391.getName(m.original_language),
        genres: m.genres,
        poster: m.poster_path ? tmdb.getPosterUrl(m.poster_path, 'M') : undefined,
        backdrop: m.backdrop_path ? tmdb.getBackdropUrl(m.backdrop_path, 'L') : undefined,
        status: m.status,
        releaseDate: m.release_date,
        rating: m.vote_average,
        runtime: m.runtime
      }))
    }
  }
}
