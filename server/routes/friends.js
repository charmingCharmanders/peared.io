'use strict';
const express = require('express');
const router = express.Router();
const FriendsController = require('../controllers').Friends;

router.route('/')
  .get(FriendsController.getAll)
  .post(FriendsController.create)
  .put(FriendsController.update)
  ;

router.route('/:id')
  //.delete(FriendsController.delete)
  ;

module.exports = router;
