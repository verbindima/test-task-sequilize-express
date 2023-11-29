'use strict'

import { basename as _basename, join, dirname } from 'path'
import { env } from 'process'
import { fileURLToPath } from 'node:url'
import { readdir } from 'fs/promises'
import Sequelize, { DataTypes } from 'sequelize'
import envConfigs from '#src/database/config.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const basename = _basename(__filename)
const environment = env.NODE_ENV || 'development'
const config = envConfigs[environment]
const database = {}

let sequelize
if (config.url) {
  sequelize = new Sequelize(config.url, config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

const files = await readdir(__dirname)
  .then(files => {
    return files.filter(file => {
      return (
        file.indexOf('.') !== 0 &&
        file !== basename &&
        file.slice(-3) === '.js' &&
        file.indexOf('.test.js') === -1
      )
    })
  })

for await (const file of files) {
  const model = await import(join(__dirname, file))
  model.default(sequelize, DataTypes)
  database[model.name] = model
}

Object.keys(database).forEach(modelName => {
  if (database[modelName].associate) {
    database[modelName].associate(database)
  }
})

database.sequelize = sequelize
database.Sequelize = Sequelize

export default database
