// @flow

import { db } from 'store'
import { AppError, hashPassword, comparePassword, validateEmail } from 'model/utils'

type UserDetails = {
  id: number,
  name: string,
  email: string
}

async function validateCredentials (name: string, email: string): Promise<void> {
  const [ user ] = await db.query('SELECT * FROM user where name = ? OR email = ?', [name, email])
  if (user && user.name === name && user.email === email) {
    throw new AppError(
      400, 'An Accout with given credentials already exists.',
      '', 'model.user.validateCredentials'
    )
  }
  if (user && user.name === name) {
    throw new AppError(
      400, 'An Account with given user name already exists.',
      '', 'model.user.validateCredentials'
    )
  }
  if (user && user.email === email) {
    throw new AppError(
      400, 'An Account with given email already exists.',
      '', 'model.user.validateCredentials'
    )
  }
}

async function create (name: string, email: string, password: string): Promise<UserDetails> {
  await validateEmail(email)
  await validateCredentials(name, email)
  const newUser = { name, email, password: await hashPassword(password) }
  const { insertId } = await db.query('INSERT INTO user SET ?', [newUser])
  if (!insertId) {
    throw new AppError(
      500, 'Unable to sign you up, something went wrong.',
      '', 'model.user.create'
    )
  }
  return { id: Number(insertId), name, email }
}

async function find (email: string, password: string): Promise<UserDetails> {
  const [ user ] = await db.query('SELECT * FROM user where email = ? LIMIT 1', [email])
  if (!user) {
    throw new AppError(
      400, 'User with given email does not exist',
      '', 'model.user.find'
    )
  }
  await comparePassword(password, user.password.toString())
  return { id: user.id, name: user.name, email: user.email }
}

export default { find, create }
