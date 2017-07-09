// Set up our Pet schema
// http://mongoosejs.com/docs/guide.html

// Import Mongoose module
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create the data object
const petSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  photo: String,
  description: {
    type: String,
    default: "What a good dog!"
  },
  score: Number
});

// Connects us to the Pets collection
// Tells Mongoose / MongoDB that this data represents a pet
module.exports = mongoose.model('Pet', petSchema);