'use strict';
const express = require('express');
const router = express.Router();
const ProfilesController = require('../controllers').Profiles;

router.route('/')
  .get(ProfilesController.getAll)
  // .post(ProfileController.create)
  ;

router.route('/:id')
  .get(ProfilesController.getOne)
  .put(ProfilesController.update)
  // .delete(ProfileController.deleteOne)
  ;

module.exports = router;
