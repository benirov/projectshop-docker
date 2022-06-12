'use strict'

const User = require('../models/user');
const services = require('../services/');
const bcrypt = require('bcrypt-nodejs');
const ObjectId = require('mongodb').ObjectId;
const { validationResult } = require('express-validator');


exports.signUp = async (req, res) => {

  //mostrar mensajes de error
  const errores = validationResult(req);
  if(!errores.isEmpty()){
      return res.status(400).json({errores : errores.array()});
  }

  try {
    const user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      orders: []
    });

    //validar si existe email 
    const ExistUser = await User.findOne({email: req.body.email});
    if(ExistUser){
      throw new Error("Email Ya existe");
    }
  
    const newUser = await user.save();
    if(newUser){
      return res.status(200).send({message: 'Usuario creado'});
    }else{
      return res.status(500).send({message: 'Error al crear usuario'});
    }
    
  } catch (error) {
    return res.status(500).send({message: `Error al crear usuario : ${error}`});
  }

}

exports.signIn = async (req, res) => {

  //mostrar mensajes de error
  const errores = validationResult(req);
  if(!errores.isEmpty()){
      return res.status(400).json({errores : errores.array()});
  }

  const user = await User.findOne({email: req.body.email});

  if(user){

    //verificar password y autenticar
    console.log(bcrypt.compareSync(req.body.password, user.passwordHas));
    if(!bcrypt.compareSync(req.body.password, user.passwordHas)){
        return res.status(401).json({message: "Password incorrecto"});
        
    }
    req.user = user;
      const token = await services.createToken(user);
      res.status(200).send({
        message: 'logueado correctamente',
        token: token,
      });
  }else{
    return  res.status(404).send({message: 'no existe el usuario', status: 404});
  }
}

exports.userAutenticate = async (req, res) => {
  const usuario = await User.findOne({_id: req.user}, { "_id": 0, "password": 0, "passwordHas": 0, "email": 0, "signupDate": 0 });
  return res.json(usuario);

}

exports.deleteUser = async (req, res) => {

  //mostrar mensajes de error
  const errores = validationResult(req);
  if(!errores.isEmpty()){
      return res.status(400).json({errores : errores.array()});
  }
  let { id } = req.params;
  const user = await User.findOneAndRemove(id);
  if(user){
    return res.status(200).send({message: `User con id: ${id} eliminado`});
  }else{
    return res.status(400).send({message: `User con id: ${id} eliminado`});
  }
}


exports.createOrder = async (req, res) => {

  //mostrar mensajes de error
  const errores = validationResult(req);
  if(!errores.isEmpty()){
      return res.status(400).json({errores : errores.array()});
  }

    const usuario = await User.findOne({_id: req.user});

    let update = [{"products": req.body.order.cart, "totalPrice": req.body.order.totalPrice, "date": req.body.order.date}];

    if(usuario.orders.length > 0){
      update = [...usuario.orders, update[0]];
    }
    User.findByIdAndUpdate({_id: new ObjectId(usuario.id)}, { $set: {orders: update}},{new: true}, function (err, oldMedium) { 
      
      console.log(err);
 
      
     });
      if(true){
        res.status(200).send({message: `Order created`}); 
      }
      else{
        res.status(400).send({message: `Error creting order`});
      }

}
