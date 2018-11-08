import express from 'express'
import AppError from 'model/error'
import { movie } from 'model'

const router = express.Router()

router.get('/results', (req, res) => {
  let searchQuery = req.query['search_query']
  let page = req.query['page'] ? Number(req.query['page']) : 1
  if (!searchQuery) {
    let err = new AppError(404, '', '/results')
    res.status(err.getRespCode()).json(err.toJson())
    return
  }
  movie.searchMovies(searchQuery, page).then(
    result => res.status(200).json(result),
    err => res.status(err.getRespCode()).json(err.toJson())
  )
})

router.get('/:movieId', (req, res) => {
  let movieId = req.params.movieId
  movie.getById(movieId).then(
    result => res.status(200).json(result),
    err => res.status(err.getRespCode()).json(err.toJson())
  )
})

router.get('/:movieId/cast', (req, res) => {
  let movieId = req.params.movieId
  movie.getCast(movieId).then(
    result => res.status(200).json(result),
    err => res.status(err.getRespCode()).json(err.toJson())
  )
})

export default router
