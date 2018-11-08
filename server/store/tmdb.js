// @flow
import AppError from 'model/error'

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

  async setConfig () {
    const { images } = await this.getConfig()
    this.imgConfig = {
      baseUrl: images.base_url,
      posterSizes: images.poster_sizes.slice(-3),
      profileSizes: images.profile_sizes.slice(-3),
      backdropSizes: images.backdrop_sizes.slice(-3)
    }
  }

  async doFetch (url: string): Promise<any> {
    let data
    try {
      let response = await fetch(url)
      data = await response.json()
    } catch (err) {
      throw new AppError(500, 'Error fetching resource.', '', 'model.movie.getById')
    }
    if (data.status_code && data.status_code === 7) {
      throw new AppError(500, 'Something went wrong.', data.status_message, 'model.movie.getById')
    }
    if (data.status_code && data.status_code === 34) {
      throw new AppError(404, 'Cannot find resource.', data.status_message, 'model.movie.getById')
    }
    return data
  }

  getConfigRoute (): string {
    return `${this.baseUrl}/configuration`
  }

  getMovieRoute (movieId: number): string {
    return `${this.baseUrl}/movie/${movieId}`
  }

  getSearchMoviesRoute (): string {
    return `${this.baseUrl}/search/movie`
  }

  getConfig (): Promise<any> {
    const queryParams = `api_key=${this.apiKey}`
    return this.doFetch(`${this.getConfigRoute()}?${queryParams}`)
  }

  getMovie (movieId: number): Promise<any> {
    const queryParams = `api_key=${this.apiKey}&language=en-US`
    return this.doFetch(`${this.getMovieRoute(movieId)}?${queryParams}`)
  }

  getMovieCredits (movieId: number): Promise<any> {
    const queryParams = `api_key=${this.apiKey}`
    return this.doFetch(`${this.getMovieRoute(movieId)}/credits?${queryParams}`)
  }

  searchMovies (searchQuery: string, page: number): Promise<any> {
    const queryParams = `api_key=${this.apiKey}&query=${searchQuery}&page=${page}&include_adult=false`
    return this.doFetch(`${this.getSearchMoviesRoute()}?${queryParams}`)
  }

  getPosterUrl (src: string, size: 'S' | 'M' | 'L') {
    if (size === 'S') return `${this.imgConfig.baseUrl}${this.imgConfig.posterSizes[0]}/${src}`
    if (size === 'M') return `${this.imgConfig.baseUrl}${this.imgConfig.posterSizes[1]}/${src}`
    if (size === 'L') return `${this.imgConfig.baseUrl}${this.imgConfig.posterSizes[2]}/${src}`
  }

  getProfileUrl (src: string, size: 'S' | 'M' | 'L') {
    if (size === 'S') return `${this.imgConfig.baseUrl}${this.imgConfig.profileSizes[0]}/${src}`
    if (size === 'M') return `${this.imgConfig.baseUrl}${this.imgConfig.profileSizes[1]}/${src}`
    if (size === 'L') return `${this.imgConfig.baseUrl}${this.imgConfig.profileSizes[2]}/${src}`
  }

  getBackdropUrl (src: string, size: 'S' | 'M' | 'L') {
    if (size === 'S') return `${this.imgConfig.baseUrl}${this.imgConfig.backdropSizes[0]}/${src}`
    if (size === 'M') return `${this.imgConfig.baseUrl}${this.imgConfig.backdropSizes[1]}/${src}`
    if (size === 'L') return `${this.imgConfig.baseUrl}${this.imgConfig.backdropSizes[2]}/${src}`
  }
}
