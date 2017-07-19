'use strict';
const express = require('express');
const router = express.Router();
const SessionsController = require('../controllers').Sessions;

router.route('/')
  .get(SessionsController.getAll)
  .post(SessionsController.create)
;

router.route('/:id')
  .get(SessionsController.getOne)
;

module.exports = router;
