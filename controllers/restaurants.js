const Restaurant = require('../models/restaurant');

function restaurantsIndex(req, res, next) {
  Restaurant
  .find()
  .then((restaurants) => res.render('restaurants/index', { restaurants }))
  .catch(next);
}

function restaurantsNew(req, res) {
  res.render('restaurants/new');
}

function restaurantsCreate(req, res, next) {
  req.body.createdBy = req.user._id;
  Restaurant.findOne({ placeId: req.body.placeId })
  .then(rest => {
    if (rest) {
      rest.images.push(req.body.images);
      rest.save();
      console.log(rest);
      res.redirect('/restaurants');
    } else {
      Restaurant
      .create(req.body)
      .then(() => res.redirect('/restaurants'))
      .catch(next);
    }
  });
}

function restaurantsShow(req, res, next) {
  Restaurant
  .findById(req.params.id)
  .populate('createdBy')
  .exec()
  .then((restaurant) => {
    if(!restaurant) return res.status(404).render('statics/404');
    res.render('restaurants/show', { restaurant });
  })
  .catch(next);
}

function restaurantsEdit(req, res, next) {
  Restaurant
  .findById(req.params.id)
  .then((restaurant) => {
    if(!restaurant) return res.status(404).render('statics/404');
    res.render('restaurants/edit', { restaurant });
  })
  .catch(next);
}

function restaurantsUpdate(req, res, next) {
  Restaurant
  .findById(req.params.id)
  .then((restaurant) => {
    if(!restaurant) return res.status(404).render('statics/404');

    for(const field in req.body) {
      restaurant[field] = req.body[field];
    }

    return restaurant.save();
  })
  .then((restaurant) => res.redirect(`/restaurants/${restaurant.id}`))
  .catch(next);
}

function restaurantsDelete(req, res, next) {
  Restaurant
  .findById(req.params.id)
  .then((restaurant) => {
    if(!restaurant) return res.status(404).render('statics/404');
    return restaurant.remove();
  })
  .then(() => res.redirect('/restaurants'))
  .catch(next);
}

module.exports = {
  index: restaurantsIndex,
  new: restaurantsNew,
  create: restaurantsCreate,
  show: restaurantsShow,
  edit: restaurantsEdit,
  update: restaurantsUpdate,
  delete: restaurantsDelete
};
