import React, { useContext, useState } from 'react';
import autContext from '../context/auth/authContext';
import Layout from '../components/Layout'
import './Orders.css'

const Order = () => {

  //acceder al state auth
	const AutContext = useContext(autContext);

  const {
		user,
	  } = AutContext;

    return ( 
        <Layout>
          { user && user.orders.length ? 
          user.orders.map((order, index) => (
            <div className="container" key={index}>
              <p className=" text-center  uppercase  p-5">Order # {index}</p>
              { order.products && order.products.length ?
                order.products.map((product, i) => (
                <div className="row border-top border-bottom" key={i}>
                <div className="row main align-items-center">
                  <div className="col-2"><img className="img-fluid" src={`${product.img}`} /></div>
                  <div className="col">
                    <div className="row text-muted">{product.name.substr(0, 25)}...</div>
                  </div>
                  <div className="col">$ {product.price}</div>
                  <div className="col">{product.quantity}</div>
                </div>
              </div>
              )): <p className=" text-center text-gray-600 uppercase  p-5">add some products</p> }
          <div className="p-3">
              <p className="">total: $ {order.totalPrice} </p>
              <p className="">Date: {new Date(order.date).toString()} </p>
          </div>
          </div>
           ))
          : <p className=" text-center text-gray-600 uppercase  p-5">Nothing to show</p>}

        </Layout>
     );
}
 
export default Order;