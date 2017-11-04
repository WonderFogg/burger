
// BURGERS_CONTROLLER SETUP  USE CAT
// 1. Inside your `burger` directory, create a folder named `controllers`.
// 2. In `controllers`, create the `burgers_controller.js` file.
// 3. Inside the `burgers_controller.js` file, import the following:
//    * Express
//    * `burger.js`
// 4. Create the `router` for the app, and export the `router` at the end of your file.

var express = require("express");

var router = express.Router();
var burger = require("../models/burger.js");

// get route -> index
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
  // express callback response by calling burger.selectAllBurger
  burger.all(function(burgerData) {
    // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
    res.render("index", { burger_data: burgerData });
  });
});

// post route -> back to index
router.post("/burgers/create", function(req, res) {
  // takes the request object using it as input for buger.addBurger
  burger.create(req.body.burger_name, function(result) {
    // wrapper for orm.js that using MySQL insert callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

// put route -> back to index
router.put("/burgers/update", function(req, res) {
  burger.update(req.body.burger_id, function(result) {
    // wrapper for orm.js that using MySQL update callback will return a log to console,
    // render back to index with handle
    console.log(result);
    res.redirect("/");
  });
});

module.exports = router;






// var express = require('express');
// var router = express.Router();
// var burger = require('../models/burger.js');

// // add a '/' endpoint that redirects to the /index route
// router.get('/', function(req, res) {
//   res.redirect('/index');
// });

// // add a '/index/' endpoint that gets all the burgers
// // then renders the index file by passing in all the burgers
// // as an object for handlebars to use
// router.get('/index', function(req, res) {
//   burger.selectAll(function(data) {
//     var hbsObject = {burgers: data};
//     console.log(hbsObject);
//     res.render('index', hbsObject);
//   });
// });

// // add a '/burgers/insertOne' endpoint that posts the 
// // burger name the user entered then as a callback it
// // redirects back to the /index route
// router.post('/burgers/insertOne', function(req, res) {
//   burger.insertOne(['burger_name', 'devoured'], [req.body.name, false], function() {
//     res.redirect('/index');
//   });
// });

// // add a '/burgers/updateOne/:id' route that updates
// // the status of the burger from being uneaten to eaten
// // then does a callback that redirects to the /index endpoint
// router.put('/burgers/updateOne/:id', function(req, res) {
//   var condition = 'id = ' + req.params.id;
//   console.log('condition', condition);

//   burger.updateOne({devoured: req.body.devoured}, condition, function() {
//     res.redirect('/index');
//   });
// });

// // export the router (controller) back to the server
// module.exports = router;