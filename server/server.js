import path from 'path'
import express from 'express'

import authRouter from 'route/auth'
import movieRouter from 'route/movie'
import searchRouter from 'route/search'
import profileRouter from 'route/profile'
import loggerMiddleware from 'middleware/logger'
import sessionMiddleware from 'middleware/session'

const app = express()
const port = 8080
const staticPath = path.resolve(__dirname, '..', 'docs', 'static')

app.use('/', express.static(staticPath))
app.use(express.json())
app.use(loggerMiddleware)
app.use(sessionMiddleware)

app.use('/api/auth', authRouter)
app.use('/api/movie', movieRouter)
app.use('/api/search', searchRouter)
app.use('/api/profile', profileRouter)

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(staticPath, 'index.html'))
})

app.listen(port, err => {
  if (!err) {
    console.log(`Server running on localhost:${port}`)
  }
})
