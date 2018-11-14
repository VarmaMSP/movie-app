// @flow
import type { User, Profile } from 'types/profile'
import type { Movie, BookmartDetails } from 'types/movie'
import type { CastMember } from 'types/actor'

import { AppError, AuthError } from 'utils/error'

export default class Client {
  url: string
  includeCookies: boolean

  constructor () {
    this.url = ''
    this.includeCookies = true
  }

  setUrl (url: string) {
    this.url = url
  }

  getBaseRoute (): string {
    return `${this.url}/api`
  }

  getAuthRoute (): string {
    return `${this.getBaseRoute()}/auth`
  }

  getMovieRoute (): string {
    return `${this.getBaseRoute()}/movie`
  }

  getProfileRoute (): string {
    return `${this.getBaseRoute()}/profile`
  }

  getSearchRoute (): string {
    return `${this.getBaseRoute()}/search`
  }

  async doFetch (method: string, url: string, body: ?Object): Promise<any> {
    const request = new Request(url, {
      method,
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: body ? JSON.stringify(body) : undefined,
      credentials: this.includeCookies ? 'include' : undefined
    })

    let response, data
    try {
      response = await fetch(request)
      data = await response.json()
    } catch (err) {
      console.log(err)
      throw new AppError(500, ['Cannot reach server, something went wrong.'])
    }
    if (data.error) {
      if (response.status === 401) {
        throw new AuthError(data.message)
      } else {
        throw new AppError(response.status, data.message)
      }
    }
    return data
  }

  login (email: string, password: string): Promise<User> {
    return this.doFetch('POST', `${this.getAuthRoute()}/login`, { email, password })
  }

  logout (): Promise<void> {
    return this.doFetch('POST', `${this.getAuthRoute()}/logout`)
  }

  signup (name: string, email: string, password: string): Promise<User> {
    return this.doFetch('POST', `${this.getAuthRoute()}/signup`, { name, email, password })
  }

  getMovieById (movieId: number): Promise<Movie> {
    return this.doFetch('GET', `${this.getMovieRoute()}/${movieId}`)
  }

  getMovieCast (movieId: number): Promise<Array<CastMember>> {
    return this.doFetch('GET', `${this.getMovieRoute()}/cast/${movieId}`)
  }

  bookmartMovie (movieId: number, action: 'LIKE' | 'DISLIKE'): Promise<BookmartDetails> {
    return this.doFetch('POST', `${this.getMovieRoute()}/${movieId}/bookmart/`, { action })
  }

  discoverMovies (): Promise<{| movies: Array<Movie> |}> {
    return this.doFetch('GET', this.getMovieRoute())
  }

  getProfile (userId: ?number): Promise<Profile> {
    return this.doFetch('GET', `${this.getProfileRoute()}/${userId || ''}`)
  }

  updateProfile (about: string, image: string): Promise<any> {
    return this.doFetch('PATCH', this.getProfileRoute(), { about, image })
  }

  searchAll (searchQuery: string): Promise<{|profiles: Array<Profile>, movies: Array<Movie>|}> {
    return this.doFetch('GET', `${this.getSearchRoute()}?search_query=${searchQuery}`)
  }

  searchMovies (searchQuery: string, page: number): Promise<{|total: number, movies: Array<Movie>|}> {
    return this.doFetch('GET', `${this.getSearchRoute()}/movie?search_query=${searchQuery}&page=${page}`)
  }
}
