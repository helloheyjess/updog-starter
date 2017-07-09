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
  photo: {
    type: String,
    default: "http://i2.kym-cdn.com/entries/icons/original/000/021/033/Screenshot_236.png"
  },
  description: {
    type: String,
    default: "What a good dog!"
  },
  score: {
    type: Number,
    default: 0
  }
});

// Connects us to the Pets collection (use singular here)
// Tells Mongoose / MongoDB that this data represents a pet
module.exports = mongoose.model('Pet', petSchema);