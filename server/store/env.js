// @flow
import dotenv from 'dotenv'
import path from 'path'

type Env = {|
  TMDB_API_KEY: string,
  MYSQL_HOST: string,
  MYSQL_USERNAME: string,
  MYSQL_PASSWORD: string
|}

const env: Env = dotenv.config({ path: path.resolve(__dirname, '..', '.env') }).parsed
const a = env['TMDB_API_KEY']
const b = env['MYSQL_HOST']
const c = env['MYSQL_USERNAME']
const d = env['MYSQL_PASSWORD']

if (a.length === 0 || b.length === 0 || c.length === 0 || d.length === 0) {
  console.log('ERROR: .env not configured properly')
  process.exit(1)
}

export default env