import { config as dotenvConfig } from 'dotenv'

dotenvConfig()

const development = {
  username: process.env.DEV_DATABASE_USERNAME,
  password: process.env.DEV_DATABASE_PASSWORD,
  database: process.env.DEV_DATABASE_NAME,
  host: process.env.DEV_DATABASE_HOST,
  port: process.env.DEV_DATABASE_PORT,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
}

const test = {
  username: process.env.TEST_DATABASE_USERNAME,
  password: process.env.TEST_DATABASE_PASSWORD,
  database: process.env.TEST_DATABASE_NAME,
  host: process.env.TEST_DATABASE_HOST,
  port: process.env.TEST_DATABASE_PORT,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
}

const production = {
  username: process.env.PROD_DATABASE_USERNAME,
  password: process.env.PROD_DATABASE_PASSWORD,
  database: process.env.PROD_DATABASE_NAME,
  host: process.env.PROD_DATABASE_HOST,
  port: process.env.PROD_DATABASE_PORT,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: false
}

export default {
  development,
  test,
  production
}