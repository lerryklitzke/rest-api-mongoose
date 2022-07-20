const { validationResult } = require('express-validator');
const Post = require('../models/postModels');

module.exports.getPosts = (req, res, next) => {
  Post.find()
    .then(posts => {
      if (!posts) {
        const error = new Error('Posts not found');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ posts: posts })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
};

module.exports.getPost = (req, res, next) => {
  const id = req.params.id;
  Post.findById(id)
    .then(post => {
      if (!post) {
        const error = new Error('Post not found.')
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Post found.', post: post });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
}

module.exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const errors = validationResult(req);
  
  const post = new Post({
    title: title, 
    imageURL: 'images/SLE_1172.jpg',
    content: content,
    creator: { name: 'Lerry' }
  });
  
  if (!errors.isEmpty()) {
    res.status(422).json({ 
      message: 'Title or content is short.', 
      errors: errors.array()
    });
  } else {
    post.save()
      .then(result => {
        console.log(result);
        res.status(201).json({ message: 'Post created successfully!', post: result });
      })
      .catch(err => console.log(err));
  }
};
