// @flow
import type { Pool, PoolOptions, QueryResults } from 'mysql'
import mysql from 'mysql'
import AppError from 'model/error'

export default class DB {
  pool : Pool

  constructor (opts: PoolOptions) {
    this.pool = mysql.createPool(opts)
  }

  getPool (): Pool {
    return this.pool
  }

  async query (sql: string, values: Array<mixed>): Promise<QueryResults> {
    return new Promise((resolve, reject) => {
      this.pool.query(sql, values, (err, results) => {
        if (err) return reject(new AppError(500, 'Something went wrong.', err.toString(), 'db.query'))
        resolve(results)
      })
    })
  }
}
