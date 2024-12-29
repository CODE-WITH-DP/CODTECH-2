const mongoose = require('mongoose');
const { Schema } = mongoose

const blog = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
})

const blogSchema = mongoose.model('blogData', blog);

module.exports = {blogSchema};