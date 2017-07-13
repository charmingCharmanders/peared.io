'use strict';
const express = require('express');
const router = express.Router();
const UsersController = require('../controllers').Users;

router.route('/')
  .get(UsersController.getAll)
  ;

router.route('/:id')
  .get(UsersController.getOne)
  .put(UsersController.update)
  ;

module.exports = router;
