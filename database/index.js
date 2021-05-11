const {Pool} = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: '',
  password: '',
  port: '',
})

module.exports = {
  query: (text, params) => pool.query(text, params)
}
