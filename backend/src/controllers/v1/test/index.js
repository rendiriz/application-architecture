const express = require('express');

const { create } = require('./test-create');
const { update } = require('./test-update');

const router = express.Router();

// Create
router.post('/', create);

// Update
router.put('/:uniq', update);

module.exports = router;
