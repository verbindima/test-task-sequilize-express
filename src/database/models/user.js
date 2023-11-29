'use strict'

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    balance: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'User',
  })
  return User
}