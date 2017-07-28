'use strict';
const express = require('express');
const router = express.Router();
const PromptsController = require('../controllers').Tests;

router.route('/:promptId')
  .get(PromptsController.getOne)
  .put(PromptsController.update)
;

module.exports = router;