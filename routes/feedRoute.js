import express from 'express';

import {
    getFeeds,
    createFeed
} from '../controllers/feedController.js';

const router = express.Router();

// GET FEEDS

router.get('/', getFeeds);

// CREATE FEED

router.post('/', createFeed);


export default router;