import express from 'express'
import { query } from 'express-validator/check'

import movie from 'model/movie'
import profile from 'model/profile'
import validationMiddleware from 'middleware/validation'
import authenticationMiddleware from 'middleware/authentication'

function search (req, res) {
  const searchQuery = req.query['search_query']
  Promise.all([
    movie.search(searchQuery, 1),
    profile.search(searchQuery)
  ]).then(
    ([{ movies }, profiles]) => {
      res.status(200)
      res.json({ movies, profiles })
    }
  ).catch(
    err => res
      .status(err.respCode || 500)
      .set('Content-Type', 'application/json')
      .send(err.toString())
  )
}

function searchMovies (req, res) {
  const { search_query: searchQuery, page } = req.query
  movie.search(searchQuery, page).then(
    result => res.status(200).json(result),
    err => res
      .status(err.respCode || 500)
      .set('Content-Type', 'application/json')
      .send(err.toString())
  )
}

const router = express.Router()

router.use(authenticationMiddleware)

router.get('/', [
  query('search_query', 'must be present in query parameters')
    .exists({ checkFalsy: true }),
  validationMiddleware
], search)

router.get('/movie', [
  query('search_query', 'must be present in query parameters')
    .exists({ checkFalsy: true }),
  query('page')
    .toInt().withMessage('must be a integer')
    .customSanitizer(val => val || 1),
  validationMiddleware
], searchMovies)

export default router
