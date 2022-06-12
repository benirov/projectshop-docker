import React, { useContext } from 'react';
import { Link } from 'react-router-dom'
import appContext from '../context/app/appContext';
import './ProductsCart.css';

const ProductsCart = ({name, price, img, category, description}) => {

    //acceder al state
   const AppContext = useContext(appContext);

   const {
    cart,
    deleteProductCart
  } = AppContext;

  const deleteShoppingCart = (id) =>  {
    deleteProductCart(id)
   } 

    return ( 
        <>
            <div>ProductsCart</div>
        </>
     );
}
 
export default ProductsCart;