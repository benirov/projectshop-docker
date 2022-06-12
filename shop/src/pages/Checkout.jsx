import React, { useContext, useState, useEffect } from 'react';
import Layout from '../components/Layout'
import appContext from '../context/app/appContext';
import autContext from '../context/auth/authContext';
import DetailCheckout from '../components/DetailCheckout'
import './Checkout.css'

const Checkout = () => {


	const [datos, setDatos] = useState({
        username: '',
        email: '',
		password: ''
    })

	//acceder al state
	const AppContext = useContext(appContext);

	//acceder al state auth
	const AutContext = useContext(autContext);
	const {
		totalPrice,
		cart,
		message,
		createOrder,
		setMessage
	  } = AppContext;

	  const {
		authenticate,
		userRegister,
		autenticateUser,
		loginUser,
	  } = AutContext;

	  useEffect(() => {
		
	  }, [authenticate]);

	  

	  const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

	const setOrder = async () => {

		if(authenticate){

			let order = {order : {cart: cart, totalPrice: totalPrice, date: Date.now()}}

			createOrder(order);
		}else{

			if(datos.username === '')  return setMessage("username is required");
			if(datos.email === '')  return setMessage("email is required");
			if(datos.password === '')  return setMessage("password is required");
		
			await userRegister(datos);
			await loginUser({password: datos.password, email: datos.email});
			await autenticateUser();
			let order = {order : {cart: cart, totalPrice: totalPrice, date: Date.now()}}
			createOrder(order);
		}
	}

    return ( 
        <Layout>
			<div className="container">
				<div className="card">
				<div className="row">
					<div className="col-md-8 cart">
					{ message && <div class="alert alert-info" role="alert">
					{message}
									</div>}
						<div className="title">
							<div className="row">
								<div className="col"><h4><b>Shopping Cart</b></h4></div>
							</div>
						</div>    
						
						<DetailCheckout />
						<div className="back-to-shop"><a href="#"></a><span className="text-muted">Total : $ {totalPrice}</span></div>
					</div>
					<div className="col-md-4 summary">
						<div><h5><b>Order</b></h5></div>
						<hr />
						{!authenticate && <form  method="post" class="creditly-card-form agileinfo_form">
							<section class="creditly-wrapper wrapper">
								<div class="information-wrapper">
									<div class="first-row form-group">
									<div class="controls">
											<label class="control-label">email: </label>
											<input class="billing-address-name form-control" onChange={handleInputChange} type="email" name="email" placeholder="Full name" />
										</div>
										<div class="controls">
											<label class="control-label">username: </label>
											<input class="billing-address-name form-control" type="text" onChange={handleInputChange} name="username" placeholder="Full name" />
										</div>
										<div class="controls">
											<label class="control-label">password: </label>
											<input class="billing-address-name form-control" type="password" onChange={handleInputChange} name="password" placeholder="password" />
										</div>
									</div>
								</div>
							</section>
						</form>
						}
						{ cart.length ? <button className="btn btn-primary" onClick={ ()=> {setOrder()}} >SET ORDER</button>  : null }
					</div>
				</div>
				
			</div>
		</div>
    	</Layout>
     );
}
 
export default Checkout;