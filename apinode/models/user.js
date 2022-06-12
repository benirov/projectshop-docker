'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto');

const UserSchema = new Schema(
  {
    email: {type: String, unique: true, lowercase: true},
    username: {
      type: String,
      require: true
    },
    avatar: {
      type: String,
      require: false
    },
    password: {type: String},
    passwordHas: {type: String},
    signupDate : {type: Date, default: Date.now()},
    orders: {type: Array, default: []},
    lastLogin: Date
  });

  UserSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')){
      return next();
    }else{
      bcrypt.genSalt(10, (error, salt) =>{
        if(error){
          return next();
        }
        else{
          bcrypt.hash(user.password, salt, null, (error, hash) =>{
            if(error){
              return next(error);
            }
            else{
              user.passwordHas = hash;
              next();
            }
          })
        }
      });
    }
  });

  UserSchema.methods.gravatar = function()
  {
    if(!this.email){
      return 'https//gravatar.com/avatar/?s=200&d=retro'
    }
    else{
      const md5 = crypto.createHash('md5').update(this.email).digest('hex');
      return `https//gravatar.com/avatar/${md5}?s=200&d=retro`
    }
  }

  module.exports = mongoose.model('User', UserSchema, 'users');
