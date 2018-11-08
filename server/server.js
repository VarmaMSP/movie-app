import express from 'express'

import { tmdbP } from 'store'

const port = 8080
const app = express()

tmdbP
  .then((tmdb) => { return tmdb })
  .then(tmdb => {
    console.log(tmdb.imgConfig)
    return tmdb.searchMovies('Dark Knight')
  })
  .then(console.log)

app.listen(port, err => {
  if (!err) {
    console.log(`Server running on localhost:${port}`)
  }
})
