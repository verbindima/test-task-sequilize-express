import { env } from 'process'
import { config as dotenvConfig } from 'dotenv'
import express from 'express'
import database from '#src/database/models/index.js'
import { createUsersTable } from '#src/helper.js'

dotenvConfig()

const { User } = database.sequelize.models

const app = express()
app.use(express.json())
app.get('/ping', (request, response) => { response.send('pong') })
app.post('/update-balance', async (request, response) => {
  const { userId, amount } = request.body
  if (!userId || !amount) {
    return response.status(400).json({ error: 'Missing required parameters' })
  }

  try {
    const user = await User.findOne({ where: { id: userId } })
    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    const newBalance = user.balance + amount

    if (newBalance < 0) {
      return response.status(400).json({ error: 'Insufficient funds' })
    }

    user.balance = newBalance
    await user.save()

    return response.json({ success: true, balance: user.balance })
  } catch (error) {
    return response.status(500).json({ error: 'Internal server error', message: error.message })
  }
})

app.listen(env.SERVER_PORT, () => { console.log(`Server is running on port ${env.SERVER_PORT}`) })

createUsersTable()

export default app
