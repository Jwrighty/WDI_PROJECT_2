const User = require('../models/user');
const Restaurant = require('../models/restaurant');

function usersShow(req, res) {
  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      Restaurant
        .find({ createdBy: user._id })
        .exec()
        .then(restaurants => {
          res.render('users/show', { user, restaurants });
        });
    });
}

module.exports = {
  show: usersShow
};
