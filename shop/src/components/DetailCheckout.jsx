import React, { useContext } from 'react';
import appContext from '../context/app/appContext';
const DetailCheckout = ({}) => {

  //acceder al state
  const AppContext = useContext(appContext);

  let totalPrice = 0;

  const {
    cart,
    deleteProductCart,
    updateProductCart,
  } = AppContext;
  
    return ( 
        
      <>
      {cart.length ? 
              cart.map(product => (                
                <div className="row border-top border-bottom">
                  <div className="row main align-items-center">
                    <div className="col-2"><img className="img-fluid" src={`${product.img}`} /></div>
                    <div className="col">
                      <div className="row text-muted">{product.name.substr(0, 25)}...</div>
                    </div>
                    <div className="col">
                      <button onClick ={ () => {updateProductCart(product._id, false)}}  >-</button><button  className="border">{`${product.quantity}`}</button><button onClick ={ () => {updateProductCart(product._id)}}>+</button>
                    </div>
                    <div className="col">$ {product.price} <span className="close">&nbsp;&nbsp;<i onClick= { () => {deleteProductCart(product._id)}} class="fas fa-trash text-secondary" style={{cursor: "pointer"}}></i></span></div>
                  </div>
              </div>
              ))
              : <p className=" text-center text-gray-600 uppercase  p-5">No hay productos aún</p>}
      </> 
     );
}
 
export default DetailCheckout;