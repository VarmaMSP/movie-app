// @flow
import DB from 'store/db'
import TMDB from 'store/tmdb'
import env_ from 'store/env'

async function newClient (apiKey: string): Promise<TMDB> {
  let tmdb = new TMDB(apiKey)
  try {
    await tmdb.setConfig()
  } catch (err) {
    console.log('Cannot Configure TMDB client. ERROR: ', err.toString())
    process.exit(1)
  }
  return tmdb
}

export let tmdbP = newClient(env_['TMDB_API_KEY'])

export let db = new DB({
  connectionLimit: 5,
  host: env_['MYSQL_HOST'],
  user: env_['MYSQL_USERNAME'],
  password: env_['MYSQL_PASSWORD'],
  database: 'movie_app'
})

export let env = env_
