'use strict';
const express = require('express');
const router = express.Router();
const PromptsController = require('../controllers').Prompts;

router.route('/')
  .get(PromptsController.getAll)
  .post(PromptsController.create)
;

router.route('/:id')
  .get(PromptsController.getOne)
  .put(PromptsController.update)
  .delete(PromptsController.deleteOne)
;

module.exports = router;
