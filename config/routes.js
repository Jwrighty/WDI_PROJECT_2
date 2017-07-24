const express = require('express');
const router  = express.Router();

const statics       = require('../controllers/statics');
const sessions      = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const restaurants   = require('../controllers/restaurants');
const users         = require('../controllers/users');
// const comments      = require('../controllers/comments');

function secureRoute(req, res, next) {
  if (!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in to view this content');
      res.redirect('/login');
    });
  }

  return next();
}

router.route('/')
  .get(statics.homepage)
  .post(secureRoute, restaurants.create);

router.route('/restaurants')
  .get(restaurants.index)
  .post(secureRoute, restaurants.create);

router.route('/restaurants/new')
  .get(secureRoute, restaurants.new);

router.route('/restaurants/:id')
  .get(restaurants.show)
  // .post(secureRoute, comments.create)
  .put(secureRoute, restaurants.update)
  .delete(secureRoute, restaurants.delete);

router.route('/restaurants/:id/edit')
  .get(restaurants.edit);
//
// router.route('/restaurants/:filmId/comments/:commentId')
//   .delete(comments.delete);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);

router.route('/users/:id')
  .get(users.show);

module.exports = router;
