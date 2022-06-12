'use strict'

/* para utlizar el Shema que creamos en models/product*/
const Product = require('../models/product');
const { validationResult } = require('express-validator') 
exports.getProduct = async (req, res) => {

  //mostrar mensajes de error
  const errores = validationResult(req);
  if(!errores.isEmpty()){
      return res.status(400).json({errores : errores.array()});
  }
  const  {id} = req.params;
  const product = await Product.findById(id);
  if(product){
    return res.status(200).send({product});
  }else{
    return res.status(404).send({message: `El producto no existe`}); 
  }
}

exports.getProducts = async (req, res) =>{
  const products = await Product.find({});
    if(products){
      res.status(200).send({products});
    }
    else if(!products){
      res.status(404).send({message: 'no existen productos en la base de datos'});
    }
}

exports.saveProduct = async (req, res) =>{

  //mostrar mensajes de error
  const errores = validationResult(req);
  if(!errores.isEmpty()){
      return res.status(400).json({errores : errores.array()});
  }
  let product = new Product();
  product.name = req.body.name;
  product.img = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;
  const newProduct = product.save();

  if(newProduct){
      res.status(200).send({message: `Producto guardado`});
    }
    else{
      res.status(500).send({message: `Error al guardar producto`})
    }

}

exports.updateProduct = async (req, res) => {

  //mostrar mensajes de error
  const errores = validationResult(req);
  if(!errores.isEmpty()){
      return res.status(400).json({errores : errores.array()});
  }

  let {id} = req.params;
  let update = req.body;
  const updateProducto = Product.findByIdAndUpdate(id, update);
  if(!updateProducto){
      res.status(500).send({message: `error al actualizar el producto ${error}`});
    }else{
      res.status(200).send({product: updateProducto});
    }

}

exports.deleteProduct = async (req, res) => {

   //mostrar mensajes de error
   const errores = validationResult(req);
   if(!errores.isEmpty()){
       return res.status(400).json({errores : errores.array()});
   }
 
  let id = req.params.id;

  const deleteProduct = await Product.findOneAndRemove(id) 
    if(deleteProduct){
      res.status(200).send({message: `Producto con id: ${id} eliminado`}); 
    }
    else{
      res.status(400).send({message: `El producto no existe`});
    }

}


