import { expect, jest } from '@jest/globals'
import request from 'supertest'
import app from '#src/app.js' // Import the createUsersTable function
import umzug from '#src/database/migrate.js'
import database from '#src/database/models/index.js'
import { createUsersTable } from '#src/helper.js' // Import the createUsersTable function

const { User } = database.sequelize.models

describe('test app.js', () => {
  afterAll(async () => {
    await database.sequelize.close()
  })

  describe('createUsersTable function', () => {

    it('createUsersTable creates a users table in the database', async () => {
      const syncSpy = jest.spyOn(database.sequelize, 'sync')
      const upSpy = jest.spyOn(umzug, 'up')
      const createSpy = jest.spyOn(User, 'create')
    
      await createUsersTable()
    
      expect(syncSpy).toHaveBeenCalled()
      expect(upSpy).toHaveBeenCalled()
      expect(createSpy).toHaveBeenCalledWith({ balance: 10000 })
    
      syncSpy.mockRestore()
      upSpy.mockRestore()
      createSpy.mockRestore()
    })

    it('createUsersTable logs an error if there is an error syncing the database', async () => {
      const syncSpy = jest.spyOn(database.sequelize, 'sync').mockRejectedValue(new Error('Database sync error'))
      const errorSpy = jest.spyOn(console, 'error')
      const upSpy = jest.spyOn(umzug, 'up')
      const createSpy = jest.spyOn(User, 'create')
  
      await createUsersTable()
  
      expect(syncSpy).toHaveBeenCalled()
      expect(errorSpy).toHaveBeenCalledWith(new Error('Database sync error'))
      expect(upSpy).not.toHaveBeenCalled()
      expect(createSpy).not.toHaveBeenCalled()
  
      syncSpy.mockRestore()
      errorSpy.mockRestore()
      upSpy.mockRestore()
      createSpy.mockRestore()
    })

    it('createUsersTable creates a user with a balance of 10000', async () => {
      const syncSpy = jest.spyOn(database.sequelize, 'sync')
      const upSpy = jest.spyOn(umzug, 'up')
      const createSpy = jest.spyOn(User, 'create')
  
      await createUsersTable()
  
      expect(syncSpy).toHaveBeenCalled()
      expect(upSpy).toHaveBeenCalled()
      expect(createSpy).toHaveBeenCalledWith({ balance: 10000 })
  
      syncSpy.mockRestore()
      upSpy.mockRestore()
      createSpy.mockRestore()
    })
  })

  describe('/update-balance', () => {
  
    it('should update the user balance when valid userId and amount are provided', async () => {
      const userOnStart = await User.findOne()
      const initialBalance = userOnStart.balance
      const userId = userOnStart.id
      const amount = 500
      const expectedBalance = initialBalance + amount
    
      const response = await request(app)
        .post('/update-balance')
        .send({ userId, amount })
        .set('Accept', 'application/json')
    
      expect(response.status).toBe(200)
      expect(response.body.success).toBe(true)
      expect(response.body.balance).toBe(expectedBalance)
    
      const user = await User.findOne({ where: { id: userId } })
      expect(user.balance).toBe(expectedBalance)
    })
    
    it('should return an error when missing userId or amount', async () => {
      const userId = 1
      const amount = 500
    
      const response1 = await request(app)
        .post('/update-balance')
        .send({ userId })
        .set('Accept', 'application/json')
    
      const response2 = await request(app)
        .post('/update-balance')
        .send({ amount })
        .set('Accept', 'application/json')
    
      expect(response1.status).toBe(400)
      expect(response1.body.error).toBe('Missing required parameters')
    
      expect(response2.status).toBe(400)
      expect(response2.body.error).toBe('Missing required parameters')
    })
    it('should return an error when user is not found', async () => {
      const userId = 999
      const amount = 500
      
      // Act
      const response = await request(app)
        .post('/update-balance')
        .send({ userId, amount })
        .set('Accept', 'application/json')
      
      expect(response.status).toBe(404)
      expect(response.body.error).toBe('User not found')
    })
      
    it('should return an error when the new balance is negative', async () => {
      const userId = 1
      const amount = -15000
      
      const response = await request(app)
        .post('/update-balance')
        .send({ userId, amount })
        .set('Accept', 'application/json')
      
      expect(response.status).toBe(400)
      expect(response.body.error).toBe('Insufficient funds')
    })
      
    it('should return an error when there is an internal server error', async () => {
      const userId = 1
      const amount = 500
      const findOneSpy = jest.spyOn(User, 'findOne').mockRejectedValue(new Error('Database error'))
      
      const response = await request(app)
        .post('/update-balance')
        .send({ userId, amount })
        .set('Accept', 'application/json')
      
      expect(response.status).toBe(500)
      expect(response.body.error).toBe('Internal server error')
      expect(response.body.message).toBe('Database error')
      
      findOneSpy.mockRestore()
    })
  })
})
