import React, { useContext } from 'react';
import Popover from 'react-bootstrap/Popover'
import Overlay from 'react-bootstrap/Overlay'
import { useNavigate } from 'react-router-dom';
import appContext from '../context/app/appContext';

const PopoverCart = ({show, target, ref}) => {

    const navigate = useNavigate();

    //acceder al state
   const AppContext = useContext(appContext);

   const {
    cart,
    deleteProductCart
  } = AppContext;

  const redirectCheckout = () => {
    navigate("/checkout");
    setTimeout(() => {
        navigate("/checkout");
    }, 10);
}

    return (
        <Overlay
            show={show}
            target={target}
            placement="bottom"
            container={ref}
            containerPadding={20}
        >
        <Popover id="popover-contained">
            <Popover.Header as="h3">Cart</Popover.Header>
            <Popover.Body>
                <div className="row">
                    {cart.length ? 
                            cart.map(product => (
                                <>
                                    <table class="table table-sm">
                                        <tbody>
                                            <tr>
                                            <td><i onClick= { () => {deleteProductCart(product._id)}} class="fas fa-trash text-secondary" style={{cursor: "pointer"}}></i></td>
                                            <img style={{width: "50px"}} src={`${product.img}`}  alt={`${product.name.substr(0, 8)}`} />
                                            <td>{product.name.substr(0, 8)}</td>
                                            <td>{product.quantity}</td>
                                            <td>$ {product.price}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </>
                            ))
                            : <p className=" text-center text-gray-600 uppercase  p-5">Add some products</p>}
                </div>  
            </Popover.Body>
            {cart.length > 0 &&  (<button class="btn btn-primary text-center btn-block w-100 " onClick= { () => {redirectCheckout()}}>Checkout</button>) }
        </Popover>
        </Overlay>
      );
}
 
export default PopoverCart;