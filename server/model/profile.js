// @flow

import { db } from 'store'
import { AppError, saveImage } from 'model/utils'

type ProfileDetails = {
    userId: number,
    name: string,
    email: string,
    avatar: ?string,
    about: ?string
}

async function getByUserId (userId: number): Promise<ProfileDetails> {
  const sql = 'SELECT * FROM user where id = ? LIMIT 1'
  const [ details ] = await db.query(sql, [userId])
  if (!details) {
    throw new AppError(
      404, 'Cannot find user with given Id',
      `Id: ${userId}`, 'model.profile.getByUserId'
    )
  }
  return {
    userId: details.id,
    name: details.name,
    email: details.email,
    about: details.about,
    avatar: details.avatar
  }
}

async function update (userId: number, about: string, avatar: string): Promise<mixed> {
  const filename = await saveImage(avatar)
  const sql = 'UPDATE user SET ? WHERE id = ?'
  const { affectedRows } = await db.query(sql, [{ about, avatar: filename }, userId])
  if (affectedRows === 0) {
    throw new AppError(
      500, 'Somethin went wrong, cannot update profile',
      '', 'model.profile.update'
    )
  }
  return {
    userId,
    about,
    avatar: filename
  }
}

async function search (searchQuery: string): Promise<Array<ProfileDetails>> {
  const sql = 'SELECT * FROM user WHERE name LIKE ? OR email LIKE ? LIMIT 10'
  const users: Array<Object> = await db.query(sql, [`%${searchQuery}%`, `%${searchQuery}%`])
  return users.map(u => ({
    userId: u.id,
    name: u.name,
    email: u.email,
    about: u.about,
    avatar: u.avatar
  }))
}

export default { getByUserId, update, search }
