const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const properties = {
  title: { type: String, required: true },
  imageURL: { type: String, required: true},
  content: { type: String, required: true },
  creator: { type: Object, required: true }
}

const post = new Schema(properties, { timestamps: true });

module.exports = mongoose.model('Post', post);