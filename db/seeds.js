
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

    return Restaurant
      .create([{
        name: 'Hawksmoor - Seven Dials',
        images: 'https://media-cdn.tripadvisor.com/media/photo-s/09/4f/04/3b/hawksmoor-spitalfields.jpg',
        location: 'Central',
        cuisine: 'Argentinian',
        map: ''
        // createdBy:
      }, {
        name: 'Kanada-Ya',
        images: 'https://pbs.twimg.com/profile_images/697814475785793536/EZU83m1D.png',
        location: 'Central',
        cuisine: 'Japanese',
        map: ''
        // createdBy: 
      }]);
  })
  .then((restaurants) => {
    console.log(`${restaurants.length} restaurants created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
