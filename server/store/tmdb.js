// @flow
import { AppError } from 'model/utils'

export default class TMDB {
  apiKey : string
  baseUrl : string
  imgConfig : {|
    baseUrl: string,
    posterSizes: Array<string>,
    profileSizes: Array<string>,
    backdropSizes: Array<string>
  |}

  constructor (apiKey: string) {
    this.apiKey = apiKey
    this.baseUrl = 'https://api.themoviedb.org/3'
  }

  getConfigRoute (): string {
    return `${this.baseUrl}/configuration`
  }

  getMovieRoute (movieId: number): string {
    return `${this.baseUrl}/movie/${movieId}`
  }

  getSearchRoute (): string {
    return `${this.baseUrl}/search/movie`
  }

  getDiscoverRoute (): string {
    return `${this.baseUrl}/discover/movie`
  }

  getPosterRoute (src: ?string, size: 'S' | 'M' | 'L'): ?string {
    if (src && size === 'S') return `${this.imgConfig.baseUrl}${this.imgConfig.posterSizes[0]}/${src}`
    if (src && size === 'M') return `${this.imgConfig.baseUrl}${this.imgConfig.posterSizes[1]}/${src}`
    if (src && size === 'L') return `${this.imgConfig.baseUrl}${this.imgConfig.posterSizes[2]}/${src}`
  }

  getProfileRoute (src: ?string, size: 'S' | 'M' | 'L'): ?string {
    if (src && size === 'S') return `${this.imgConfig.baseUrl}${this.imgConfig.profileSizes[0]}/${src}`
    if (src && size === 'M') return `${this.imgConfig.baseUrl}${this.imgConfig.profileSizes[1]}/${src}`
    if (src && size === 'L') return `${this.imgConfig.baseUrl}${this.imgConfig.profileSizes[2]}/${src}`
  }

  getBackdropRoute (src: ?string, size: 'S' | 'M' | 'L'): ?string {
    if (src && size === 'S') return `${this.imgConfig.baseUrl}${this.imgConfig.backdropSizes[0]}/${src}`
    if (src && size === 'M') return `${this.imgConfig.baseUrl}${this.imgConfig.backdropSizes[1]}/${src}`
    if (src && size === 'L') return `${this.imgConfig.baseUrl}${this.imgConfig.backdropSizes[2]}/${src}`
  }

  async doFetch (url: string): Promise<any> {
    console.log('INFO: (TMDB client) GET ' + url + '.')
    let data
    try {
      let response = await fetch(url)
      data = await response.json()
    } catch (err) {
      throw new AppError(
        500, 'Error fetching resource.',
        url, 'store.tmdb.doFetch'
      )
    }
    if (data.status_code && data.status_code === 7) {
      throw new AppError(
        500, 'Something went wrong.',
        data.status_message, 'store.tmdb.doFetch'
      )
    }
    if (data.status_code && data.status_code === 34) {
      throw new AppError(
        404, 'Cannot find resource.',
        data.status_message, 'store.tmdb.doFetch'
      )
    }
    return data
  }

  async getMovie (movieId: number): Promise<any> {
    const queryParams = `api_key=${this.apiKey}&language=en-US`
    return this.doFetch(`${this.getMovieRoute(movieId)}?${queryParams}`)
  }

  async getMovieCredits (movieId: number): Promise<any> {
    const queryParams = `api_key=${this.apiKey}`
    return this.doFetch(`${this.getMovieRoute(movieId)}/credits?${queryParams}`)
  }

  async searchMovies (searchQuery: string, page: number): Promise<any> {
    const queryParams = `api_key=${this.apiKey}&query=${searchQuery}&page=${page}&include_adult=false`
    return this.doFetch(`${this.getSearchRoute()}?${queryParams}`)
  }

  async discoverMovies (page: number): Promise<any> {
    const queryParams = `api_key=${this.apiKey}&page=${page}`
    return this.doFetch(`${this.getDiscoverRoute()}?${queryParams}`)
  }

  async setConfig () {
    const { images } = await this.doFetch(`${this.getConfigRoute()}?api_key=${this.apiKey}`)
    this.imgConfig = {
      baseUrl: images.base_url,
      posterSizes: images.poster_sizes.slice(-3),
      profileSizes: images.profile_sizes.slice(-3),
      backdropSizes: images.backdrop_sizes.slice(-3)
    }
  }
}
