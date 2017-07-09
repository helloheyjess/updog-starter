// Set up an Express server
// http://expressjs.com/en/api.html#app

// Import the Express module
const express = require('express');

// Create new Express application
const app = express();

// Set up our Router variable
// to handle all of our requests
// http://expressjs.com/en/api.html#express.router
const router = express.Router();

// Set up the port we'll be listening to
// Grab the port from the environment variable
// or, if that doesn't exist, set to 8080
const port = process.env.PORT || 8080;

// Import Mongoose so we can connect to MongoDB
const mongoose = require('mongoose');

// Connect to MongoDB and the updog database
mongoose.connect('mongodb://localhost/updog');

// Use the public directory as our static file location
// http://expressjs.com/en/api.html#app.use
app.use(express.static('public'));

// Set up the our requests using our Router
router.route('/')
  .get((req, res) => {
    res.send({
      message: "You received a GET request!"
    });
  });

router.route('/pets')
  .get((req, res) => {
    // Get all the pets

  })
  .post();

// Set up our endpoint using the router
// http://expressjs.com/en/api.html#app.use
app.use('/api', router);

// Listen to our port
// http://expressjs.com/en/api.html#app.listen
app.listen(port);