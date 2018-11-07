export default class TmdbClient {
  apiKey : string
  baseUrl : string

  constructor (apiKey: string) {
    this.apiKey = apiKey
    this.baseUrl = 'https://api.themoviedb.org/3'
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

  getSearchRoute () {
    return `${this.baseUrl}/search/movie`
  }

  searchMovies (searchQuery: string, page: number = 1): Promise<any> {
    return this.doFetch(`${this.getSearchRoute()}?api_key=${this.apiKey}&query=${searchQuery}&page=${page}&include_adult=false`)
  }
}
