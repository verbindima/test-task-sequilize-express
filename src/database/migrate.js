import { Umzug, SequelizeStorage } from 'umzug'
import database from '#src/database/models/index.js'

const umzug = new Umzug({
  storage: new SequelizeStorage({
    sequelize: database.sequelize,
  }),
  migrations: {
    glob: '#src/database/migrations/*.js',
  },
  context: database.sequelize.getQueryInterface(),
  logging: false
})
export default umzug
