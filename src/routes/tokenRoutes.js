const express = require('express');
const {tokenizeHandler, detokenizeHandler} = require('../controllers/tokenController');

const router = express.Router();

router.post('/tokenize', tokenizeHandler);
router.post('/detokenize', detokenizeHandler);

module.exports = router;
