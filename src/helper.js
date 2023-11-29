import database from '#src/database/models/index.js'
import umzug from '#src/database/migrate.js'

const { User } = database.sequelize.models

export const createUsersTable = async () => {
  try {
    await database.sequelize.sync()
    await umzug.up()
    await User.create({ balance: 10000 })
    
  }
  catch (error) {
    console.error(error)
  }
}