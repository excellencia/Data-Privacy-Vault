import express from 'express';
import {tokenizeHandler, detokenizeHandler} from '../controllers/tokenController.mjs';

const router = express.Router();

router.post('/tokenize', tokenizeHandler);
router.post('/detokenize', detokenizeHandler);

export default router;
