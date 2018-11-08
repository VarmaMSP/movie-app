// @flow

class TMDB {
  apiKey : string
  baseUrl : string
  imgConfig : {|
    baseUrl: string,
    posterSizes: Array<string>,
    profileSizes: Array<string>,
    backdropSizes: Array<string>
  |}

  static async newClient (apiKey: string): Promise<TMDB> {
    const tmdb = new TMDB(apiKey)
    try {
      await tmdb.setConfig()
    } catch (err) {
      console.log('Cannot Configure TMDB client. ERROR: ', err.toString())
      process.exit(1)
    }
    return tmdb
  }

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
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers()
    })
    try {
      return await response.json()
    } catch (err) {
      console.log('error', err)
      throw new Error('Received Invalid Response')
    }
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

  searchMovies (searchQuery: string, page: number = 1): Promise<any> {
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

export let tmdbP

const apiKey = process.env.TMDB_API_KEY

if (!apiKey) {
  console.log('TMDB API Key not found.')
  process.exit(1)
} else {
  tmdbP = TMDB.newClient(apiKey)
}
