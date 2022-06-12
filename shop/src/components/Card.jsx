import React, { useContext } from 'react';
import appContext from '../context/app/appContext';

const CardComponent = ({product}) => {
   const  {name, price, img, category, description } = product;
   
   //acceder al state
   const AppContext = useContext(appContext);

   const {
     addProductCart,
   } = AppContext;

   const AddShoppingCart = (product) =>  {
    product.quantity = 1;
    addProductCart(product);
   } 
    return ( 
        
            <div className="col-md-3 product-men women_two shop-gd">
                <div className="product-googles-info googles" style={{height: "98%"}}>
                    <div className="men-pro-item">
                            <img src={`${img}`} className="card-img-top" alt="" />
                        <div className="item-info-product">
                            <div className="info-product-price">
                                <div className="grid_meta">
                                    <div className="product_price">
                                        <h4>
                                            <a href="single.html">{name}</a>
                                        </h4>
                                        <div className="grid-price mt-2">
                                            <span className="money ">${price}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="googles single-item hvr-outline-out">
                                    <button type="button" className="googles-cart pgoogles-cart" onClick= { () => {AddShoppingCart(product)}}>
                                        <i className="fas fa-cart-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
     );
}
 
export default CardComponent;