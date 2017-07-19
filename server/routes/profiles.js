'use strict';
const express = require('express');
const router = express.Router();
const ProfilesController = require('../controllers').Profiles;

router.route('/')
  .get(ProfilesController.getAll)
  ;

router.route('/:id')
  .get(ProfilesController.getOne)
  .put(ProfilesController.update)
  ;

router.route('/:id/friends')
  .get(ProfilesController.getFriends)
  ;

module.exports = router;
