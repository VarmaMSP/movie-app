require('@babel/register')
require('dotenv').config()
require('isomorphic-fetch')

let validEnv = true

if (!process.env.TMDB_API_KEY) {
  validEnv = false
  console.log('Cannot find TMDB api key.')
}

if (validEnv) {
  require('./server')
} else {
  process.exit(1)
}
