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

// Import our Pet model
const Pet = require('./models/pet');

// Import Body Parser module
const bodyParser = require('body-parser');

// Connect to MongoDB and the updog database
mongoose.connect('mongodb://localhost/updog');

// Use the public directory as our static file location
// http://expressjs.com/en/api.html#app.use
app.use(express.static('public'));

// Take body of POST/PUT request and converts to JSON
app.use(bodyParser.json());

// Set up the our requests using our Router
router.route('/')
  .get((req, res) => {
    res.send({
      message: "You made a GET request!"
    });
  });

// Pets controller

router.route('/pets')
  .get((req, res) => {
    // Get all the pets
    Pet.find({}, (err, docs) => {
      // If there is an error, send 400 status code to the client
      // along with the an object that includes the error returned
      if (err !== null) {
        res
          .status(400)
          .send({
            error: err
          });

        return;
      }

      // If all goes well, send back the pets docs
      res
        .status(200)
        .send(docs);
    });
  })
  .post((req, res) => {
    // Store the body of the request
    const body = req.body;

    // Create a new pet
    const pet = new Pet(body);

    // Save the pet
    pet.save((err, doc) => {
      // If there is an error, send 400 status code to the client
      // along with the an object that includes the error returned
      if (err !== null) {
        res
          .status(400)
          .send({
            error: err
          });

        return;
      }

      // If all goes well, send back to pet doc
      res
        .status(200)
        .send(doc);
    });
  });

router.route('/pets/:pet_id')
  .get((req, res) => {
    // Get Pet by ID
    const params = req.params;

    Pet.findOne({ _id: params.pet_id }, (err, doc) => {
      if (err !== null) {
        res
          .status(400)
          .send({
            error: err
          });

        return;
      }

      res
        .status(200)
        .send(doc);
    });
  })
  .put((req, res) => {
    // Update Pet by ID
    const params = req.params;

    Pet.findById(params.pet_id, (err, doc) => {
      if (err !== null) {
        res
          .status(400)
          .send({
            error: err
          });

        return;
      }

      Object.assign(doc, req.body, {score: doc.score += 1});

      doc.save((err, savedDoc) => {
        if (err !== null) {
          res
            .status(400)
            .send({
              error: err
            });

          return;
        }

        res
          .status(200)
          .send(savedDoc);
      });
    });
  })
  .delete((req, res) => {
    // Delete Pet by ID
    Pet.findByIdAndRemove(req.params.pet_id, (err, doc) => {
      if (err !== null) {
        res
          .status(400)
          .send({
            error: err
          });

        return;
      }

      res
        .status(200)
        .send({
          success: "Item Deleted"
        });
    });
  });

// Set up our endpoint using the router
// http://expressjs.com/en/api.html#app.use
app.use('/api', router);

// Listen to our port
// http://expressjs.com/en/api.html#app.listen
app.listen(port);