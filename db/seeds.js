
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/wdi-project-2';
mongoose.connect(dbURL);

const User = require('../models/user');
const Restaurant = require('../models/restaurant');

User.collection.drop();
Restaurant.collection.drop();

User
  .create([{
    username: 'test',
    email: 'test@test',
    password: 'test',
    passwordConfirmation: 'test'
  },{
    username: 'test2',
    email: 'test2@test',
    password: 'test2',
    passwordConfirmation: 'test2'
  }])
  .then((users) => {
    console.log(`${users.length} users created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
