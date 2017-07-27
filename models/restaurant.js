const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema({
//   body: String,
//   user: { type: mongoose.Schema.ObjectId, ref: 'User' }
// });

const restaurantSchema = new mongoose.Schema({
  searchName: String,
  images: [{ type: String }],
  name: { type: String },
  placeId: { type: String },
  latLng: { type: String },
  // comments: [commentSchema],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
