// @flow
import type { Pool, PoolOptions, Connection } from 'mysql'
import mysql from 'mysql'

class DB {
  pool : Pool

  constructor (opts: PoolOptions) {
    this.pool = mysql.createPool(opts)
  }

  getConnection (): Promise<Connection> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, connection: ?Connection) => {
        if (!err && connection) {
          return resolve(connection)
        }
        reject(err)
      })
    })
  }

  releaseConnection (connection: Connection) {
    connection.release()
  }
}

export let db

const host = process.env.MYSQL_HOST
const user = process.env.MYSQL_USERNAME
const password = process.env.MYSQL_PASSWORD

if (!host || !user || !password) {
  console.log('Missing DB Credentials.')
  process.exit(1)
} else {
  db = new DB({
    connectionLimit: 5,
    host,
    user,
    password,
    database: 'movie_app'
  })
}
