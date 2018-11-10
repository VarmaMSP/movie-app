// @flow

import { db } from 'store'
import { AppError, hashPassword, comparePassword } from 'model/utils'

type UserDetails = {
  id: number,
  name: string,
  email: string
}

async function create (name: string, email: string, password: string): Promise<UserDetails> {
  const sql = 'SELECT * FROM user where name = ? OR email = ?'
  const [ user ] = await db.query(sql, [name, email])
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
  const sql_ = 'INSERT INTO user SET ?'
  const newUser = { name, email, password: await hashPassword(password) }
  const { insertId, affectedRows } = await db.query(sql_, [newUser])
  if (insertId === 0 && affectedRows === 0) {
    throw new AppError(
      500, 'Unable to sign you up, something went wrong.',
      '', 'model.user.create'
    )
  }
  return { id: Number(insertId), name, email }
}

async function get (email: string, password: string): Promise<UserDetails> {
  const sql = 'SELECT * FROM user where email = ? LIMIT 1'
  const [ user ] = await db.query(sql, [email])
  if (!user) {
    throw new AppError(
      404, 'User with given email does not exist',
      '', 'model.user.find'
    )
  }
  await comparePassword(password, user.password.toString())
  return { id: user.id, name: user.name, email: user.email }
}

export default { create, get }
