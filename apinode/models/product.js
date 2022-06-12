'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = Schema(
  {
    name: {
      type: String,
      require: true
    },
    img: {
      type: String,
      require: false
    },
    price: {type: Number, default: 0},
    category: {type: String, enum: ['computer', 'phones', 'accesories']},
    description: {
      type: String,
      require: false
    },

  });

  module.exports =  mongoose.model('Product', productSchema, 'products');
