const express = require('express');
const { body } = require('express-validator');

const User = require('../models/userModels');
const middle = require('../controllers/authControllers');

const router = express.Router();

// localhost:8080/auth/
router.put('/signup', [
  body('email')
    .isEmail()
    .withMessage('Enter a valid email')
    .custom((value, { req }) => {
      return User.findOne({ email: value })
        .then(userFound => {
          if (userFound) {
            return Promise.reject('Email adress already registered!');
          }
        })
    })
    .normalizeEmail(),
  body('password').trim().isLength({ min: 5 }),
  body('name').trim().not().isEmpty()
], middle.signup);

module.exports = router;