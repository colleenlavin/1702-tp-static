var Promise = require('bluebird');
var Hotel = require('../models').Hotel;
var Restaurant = require('../models').Restaurant;
var Activity = require('../models').Activity;
var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  console.log('********');
  var outerScopeContainer = {};
  Hotel.findAll()
    .then(function (dbHotels) {
      outerScopeContainer.dbHotels = dbHotels;
      return Restaurant.findAll();
    })
    .then(function (dbRestaurants) {
      outerScopeContainer.dbRestaurants = dbRestaurants;
      return Activity.findAll();
    })
    .then(function (dbActivities) {
      console.log(outerScopeContainer);
      res.render('index', {
        hotels: outerScopeContainer.dbHotels,
        templateRestaurants: outerScopeContainer.dbRestaurants,
        templateActivities: dbActivities
      });
    })
    .catch(next);
})
module.exports = router;

