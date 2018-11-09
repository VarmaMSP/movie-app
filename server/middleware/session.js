import session from 'express-session'
import MYSQLStore from 'express-mysql-session'

import { db, env } from 'store'

const storeOpts = {
  createDatabaseTable: false,
  schema: {
    tableName: 'session',
    columnNames: {
      session_id: 'id',
      expires: 'expires',
      data: 'data'
    }
  }
}
const sessionStore = new MYSQLStore(storeOpts, db.getPool())

export default session({
  secret: env['COOKIE_SECRET'],
  store: sessionStore,
  resave: false,
  saveUninitialized: false
})
