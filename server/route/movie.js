import express from 'express'
import { body, param } from 'express-validator/check'

import movie from 'model/movie'
import bookmart from 'model/bookmart'
import validationMiddleware from 'middleware/validation'
import authenticationMiddleware from 'middleware/authentication'

function getMovie (req, res) {
  const { id: userId } = req.session.user
  const { movieId } = req.params
  movie.getById(userId, movieId).then(
    movie => res.status(200).json(movie),
    err => res
      .status(err.respCode || 500)
      .set('Content-Type', 'application/json')
      .send(err.toString())
  )
}

function getMovieCast (req, res) {
  const { movieId } = req.params
  movie.getCast(movieId).then(
    result => res.status(200).json(result),
    err => res
      .status(err.respCode || 500)
      .set('Content-Type', 'application/json')
      .send(err.toString())
  )
}

function bookmartMovie (req, res) {
  const { action } = req.body
  const { movieId } = req.params
  const { id: userId } = req.session.user
  bookmart.create(userId, movieId, action).then(
    () => res.status(201).send(),
    err => res
      .status(err.respCode || 500)
      .set('Content-Type', 'application/json')
      .send(err.toString())
  )
}

const router = express.Router()

router.use(authenticationMiddleware)

router.get('/:movieId', [
  param('movieId')
    .isInt().withMessage('must be a integer')
    .customSanitizer(Number),
  validationMiddleware
], getMovie)

router.get('/cast/:movieId', [
  param('movieId')
    .isInt().withMessage('must be a integer')
    .customSanitizer(Number),
  validationMiddleware
], getMovieCast)

router.post('/:movieId/bookmart', [
  param('movieId')
    .isInt().withMessage('must be a integer')
    .customSanitizer(Number),
  body('action', 'must be either LIKE or DISLIKE')
    .trim()
    .isIn(['LIKE', 'DISLIKE']),
  validationMiddleware
], bookmartMovie)

export default router
