'use strict'

module.exports = {
  port: process.env.PORT || 4000,
  db: process.env.MONGODB_URI || 'mongodb://root:root@mongo:27017/shop',
  SECRET_TOKEN : process.env.MONGODB_URI || 'mykeytoken'
}
