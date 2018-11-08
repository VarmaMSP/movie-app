// @flow

class TMDB {
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

  getSearchRoute (): string {
    return `${this.baseUrl}/search/movie`
  }

  searchMovies (searchQuery: string, page: number = 1): Promise<any> {
    return this.doFetch(`${this.getSearchRoute()}?api_key=${this.apiKey}&query=${searchQuery}&page=${page}&include_adult=false`)
  }
}

export let tmdb

const apiKey = process.env.TMDB_API_KEY

if (!apiKey) {
  console.log('TMDB API Key not found.')
  process.exit(1)
} else {
  tmdb = new TMDB(apiKey)
}
