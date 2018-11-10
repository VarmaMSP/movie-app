// @flow
import { db } from 'store'
import { AppError } from 'model/utils'

type Opinion = 'LIKE' | 'DISLIKE'

type BookmartDetails = {
  userId: number,
  movieId: number,
  opinion: Opinion
}

async function create (userId: number, movieId: number, action: Opinion): Promise<BookmartDetails> {
  const sql = 'SELECT * FROM bookmart WHERE user_id = ? AND movie_id = ? LIMIT 1'
  const [ bookmart ] = await db.query(sql, [userId, movieId])
  if (bookmart) {
    throw new AppError(
      404, 'Bookmart already exists',
      ``, 'model.bookmart.validateBookmart'
    )
  }
  const sql_ = 'INSERT INTO bookmart SET ?'
  const newBookmart = { user_id: userId, movie_id: movieId, opinion: action }
  const { insertId, affectedRows } = await db.query(sql_, [newBookmart])
  if (insertId === 0 && affectedRows === 0) {
    throw new AppError(
      500, 'Unable to create Bookmart, something went wrong',
      `movieId, userId, action = ${movieId}, ${userId}, ${action}`, 'model.bookmart.create'
    )
  }
  return { userId, movieId, opinion: action }
}

async function getAll (userId: number): Promise<{[Opinion]: Array<BookmartDetails>}> {
  const sql = 'SELECT * FROM bookmart WHERE user_id = ?'
  const bookmarts: Array<Object> = await db.query(sql, [userId])

  const res = { LIKE: [], DISLIKE: [] }
  for (let i = 0; i < bookmarts.length; ++i) {
    res[bookmarts[i].opinion].push(bookmarts[i].movie_id)
  }
  return res
}

async function getUserOpinion (userId: number, movieId: number): Promise<Opinion> {
  const sql = 'SELECT * FROM bookmart WHERE user_id = ? AND movie_id = ? LIMIT 1'
  const [ bookmart ] = await db.query(sql, [userId, movieId])
  if (!bookmart) {
    throw new AppError(
      404, 'User hasn\'t bookmarted this movie yet.',
      '', 'model.bookmart.findOpinion'
    )
  }
  return bookmart.opinion
}

export default { create, getAll, getUserOpinion }
