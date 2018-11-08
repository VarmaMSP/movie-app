// @flow
import DB from 'store/db'
import TMDB from 'store/tmdb'
import env from 'store/env'

export let tmdbP = TMDB.newClient(env['TMDB_API_KEY'])

export let db = new DB({
  connectionLimit: 5,
  host: env['MYSQL_HOST'],
  user: env['MYSQL_USERNAME'],
  password: env['MYSQL_PASSWORD'],
  database: 'movie_app'
})
