import express from 'express'
import { param, body } from 'express-validator/check'

import profile from 'model/profile'
import bookmart from 'model/bookmart'
import validationMiddleware from 'middleware/validation'
import authenticationMiddleware from 'middleware/authentication'

function getProfile (req, res) {
  const userId = req.params.userId || req.session.user.id
  Promise.all([
    profile.getByUserId(userId),
    bookmart.getOpinionCount(userId)
  ]).then(
    ([profile_, opinionCount]) => {
      res.status(200)
      res.json({ ...profile_, ...opinionCount })
    }
  ).catch(
    err => res
      .status(err.respCode || 500)
      .set('Content-Type', 'application/json')
      .send(err.toString())
  )
}

function updateProfile (req, res) {
  const userId = req.session.user.id
  const { about, image } = req.body
  profile.update(userId, about, image).then(
    result => res.status(200).json(result),
    err => res
      .status(err.respCode || 500)
      .set('Content-Type', 'application/json')
      .send(err.toString())
  )
}

const router = express.Router()

router.use(authenticationMiddleware)

router.get('/', getProfile)

router.get('/:userId', [
  param('userId')
    .isInt().withMessage('must be a integer')
    .customSanitizer(Number),
  validationMiddleware
], getProfile)

router.patch('/', [
  body('image')
    .isLength({ min: 1 }).withMessage('Please upload image'),
  body('about')
    .isLength({ min: 5 }).withMessage('Plase update your bio.')
], updateProfile)

export default router
