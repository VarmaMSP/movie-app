import express from 'express'
import { param } from 'express-validator/check'

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

const router = express.Router()

router.use(authenticationMiddleware)

router.get('/', getProfile)

router.get('/:userId', [
  param('userId')
    .isInt().withMessage('must be a integer')
    .customSanitizer(Number),
  validationMiddleware
], getProfile)

export default router
