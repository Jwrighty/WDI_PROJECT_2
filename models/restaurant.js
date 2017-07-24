const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema({
//   body: String,
//   user: { type: mongoose.Schema.ObjectId, ref: 'User' }
// });

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  images: [{ type: String }],
  location: { type: String },
  cuisine: { type: String },
  map: { type: String },
  // comments: [commentSchema],
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
