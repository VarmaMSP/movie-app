import express from 'express'

import client from 'tmdb_client'

const port = 8080
const app = express()

client.searchMovies('sam')
  .then(console.log)

app.listen(port, err => {
  if (!err) {
    console.log(`Server running on localhost:${port}`)
  }
})
