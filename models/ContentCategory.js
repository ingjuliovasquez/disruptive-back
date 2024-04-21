const mongoose = require('mongoose');

const contentCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: [true, 'Please enter a name'],
    unique: true,
  },
  permissions: {
    addVideo: {
      type: Boolean,
      default: false
    },
    addImage: {
      type: Boolean,
      default: false
    }
  },
});


const ContentCategory = mongoose.model('content-category', contentCategorySchema);

module.exports = ContentCategory;