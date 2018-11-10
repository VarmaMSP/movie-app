import express from 'express'

import authRouter from 'route/auth'
import movieRouter from 'route/movie'
import searchRouter from 'route/search'
import profileRouter from 'route/profile'
import sessionMiddleware from 'middleware/session'

const port = 8080
const app = express()

app.use(express.json())
app.use(sessionMiddleware)

app.use('/auth', authRouter)
app.use('/movie', movieRouter)
app.use('/search', searchRouter)
app.use('/profile', profileRouter)

app.listen(port, err => {
  if (!err) {
    console.log(`Server running on localhost:${port}`)
  }
})
