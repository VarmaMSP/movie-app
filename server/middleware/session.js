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

export default session({
  store: new MYSQLStore(storeOpts, db.getPool()),
  secret: env['COOKIE_SECRET'],
  resave: false,
  saveUninitialized: false,
  unset: 'destroy'
})
