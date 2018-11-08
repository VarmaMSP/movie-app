// @flow
import type { Pool, PoolOptions, Connection } from 'mysql'
import mysql from 'mysql'

export default class DB {
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
