import express from 'express'

import movieRouter from 'route/movie'

const port = 8080
const app = express()

app.use(express.json())
app.use('/movie', movieRouter)

app.listen(port, err => {
  if (!err) {
    console.log(`Server running on localhost:${port}`)
  }
})
