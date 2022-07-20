const express = require('express');
const { body } = require('express-validator');
const middle = require('../controllers/feedControllers');

const router = express.Router();

// localhost:8080/feed/
router.get('/posts',middle.getPosts);

router.get('/post/:id', middle.getPost);

router.post('/create-post', [
  body('title').trim().isLength({ min: 5 }), 
  body('content').trim().isLength({ min: 5 })
], middle.createPost);

module.exports = router;