'use strict';
const express = require('express');
const router = express.Router();
const TestsController = require('../controllers').Tests;

router.route('/:promptId')
  .get(TestsController.getOne)
  .put(TestsController.update)
;

router.route('/')
  .post(TestsController.create)
;

module.exports = router;