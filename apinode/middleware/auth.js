'use strict'

const services = require('../services')

exports.isAuth = async (req, res, next) => {
  console.log(req.headers.authorization);
  if(!req.headers.authorization){
    return res.status(403).send({message: 'no tienes autorizaciòn'});
  }
    const token = req.headers.authorization.split(" ")[1];
  services.decodeToken(token)
  .then(response =>{
      req.user = response;
      next();
    })
  .catch(response =>{
      res.status(response.status).send({message: response.message})
    })
}
