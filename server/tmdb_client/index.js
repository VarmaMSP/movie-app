import TmdbClient from 'tmdb_client/tmdb_client'

const apiKey = process.env.TMDB_API_KEY
const client = new TmdbClient(apiKey)

export default client
