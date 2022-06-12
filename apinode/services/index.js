'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const config = require('../config');


exports.createToken = async (user) => { 
  try {
    const payLoad = {
      sub: user._id.toString(),
      iat: moment().unix(),
      exp: moment().add(14, 'days').unix()
    }
    return jwt.encode(payLoad, config.SECRET_TOKEN)
  }catch(e) {
    console.log(`Error on createToken: ${e}`);
  }
}

exports.decodeToken = async (token) => {
  const decoded =new Promise((resolve, reject) => {
    try {
      console.log(`SECRET_TOKEN: ${config.SECRET_TOKEN}`);
      const payLoad = jwt.decode(token, config.SECRET_TOKEN);
      if(payLoad.exp <= moment().unix())
      {
        reject({
          status: 401,
          message: 'El token ha expirado'
        })
      }
      resolve(payLoad.sub)

    }catch(e) {
      console.log(`e: ${e}`);
      reject(
        {
          status: 500,
          message: 'Token invalido',
          error: e
        })
    }
  });

  return decoded;
}
