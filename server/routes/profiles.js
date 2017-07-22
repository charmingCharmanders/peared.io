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

router.route('/:id/sessions')
  .get(ProfilesController.getSessions)
  ;

// router.route('/loggedin')
//   .get(middleware.auth.verify, (req, res) => {
//     res.send(req.user);
//   });


module.exports = router;
