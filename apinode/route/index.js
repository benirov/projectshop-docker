'use strict'

const express = require('express');
const ProductCtrl = require('../controllers/product.js'); 
const {isAuth } = require('../middleware/auth.js');
const userCtrl = require('../controllers/user')
const api = express.Router();
const { check } = require('express-validator')
// rutas de productos
api.get('/products', ProductCtrl.getProducts);

api.get('/product/:id', ProductCtrl.getProduct);

api.post('/product', isAuth, ProductCtrl.saveProduct);

api.put('/product/:id', isAuth, ProductCtrl.updateProduct)

api.delete('/product/:id', isAuth, ProductCtrl.deleteProduct);

api.get('/private', 
  isAuth, (req, res) => {
  res.status(200).send({message: 'Tiene Acceso'})
  });

// rutas de usuarios
api.post('/signup', [
      check('email', 'Email is not valid').isEmail(),
      check('password', 'Password is required').isLength({min: 6}),
      check('username', 'username ins required').isLength({min: 4}),
    ],
    userCtrl.signUp);

api.post('/signin',
  [
    check('email', 'Email is not valid').isEmail(),
    check('password', 'Password is required').isLength({min: 6}),
  ],
  userCtrl.signIn);


api.get('/userAutenticate',
  isAuth,
  userCtrl.userAutenticate);

api.post('/createOrder', isAuth, userCtrl.createOrder);

module.exports = api;
