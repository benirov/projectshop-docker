import React, { useContext, useState, useEffect, useRef } from 'react';
import authContext from '../context/auth/authContext';
import PopoverCart from './PopoverCart'
import { useNavigate, useLocation } from 'react-router-dom';


const Header = () => {

	const location = useLocation();

	const home = location.pathname == '/' ? 'active' : '';
	const products = location.pathname == '/products' ? 'active' : '';
	const orders = location.pathname == '/orders' ? 'active' : '';

  const navigate = useNavigate();

  const redirectUrl = (url) => {
    navigate(url);
    setTimeout(() => {
        navigate(url);
    }, 10);
	}

    //acceder al state
    const AuthContext = useContext(authContext);

    const {
      user,
      autenticateUser,
	  authenticate,
      loginClose,
    } = AuthContext;

    const ref = useRef(null);

    useEffect(() => {
      autenticateUser()
    }, []);

    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };


  

  return (
    <header>
			<div className="row">
				<div className="col-md-3 top-info text-left mt-lg-4">
					
				</div>
				<div className="col-md-6 logo-w3layouts text-center">
					<h1 className="logo-w3layouts">
						<a className="navbar-brand" href="/">
							 Basic React Shop  </a>
					</h1>
				</div>

				<div className="col-md-3 top-info-cart text-right mt-lg-4">
					<ul className="cart-inner-info">
					{authenticate && <li className="button-log">
							<a className="btn-open" href="#">
								<span className="fa fa-user" aria-hidden="true">&nbsp; {user && user.username}</span>
							</a>
						</li>
					}
						<li className="galssescart galssescart2 cart cart box_1">
							<form action="#" method="post" className="last">
								<input type="hidden" name="cmd" value="_cart" />
								<input type="hidden" name="display" value="1" />
								<button onClick={(e) => handleClick(e)} className="top_googles_cart" type="button" value="" ref={ref}> 
									My Cart
									<i className="fas fa-cart-arrow-down"></i>
								</button>
                <PopoverCart
                  show={show}
                  target={target}
                  placement="bottom"
                  container={ref}
                  containerPadding={20}
              >
              </PopoverCart>
							</form>
						</li>
					</ul>
				</div>
			</div>
			<label className="top-log mx-auto"></label>
			<nav className="navbar navbar-expand-lg navbar-light top-header ">

				<button className="navbar-toggler mx-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
				    aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon">
						
					</span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav nav-mega mx-auto">
						<li className={`nav-item ${home}`}  style={{"cursor" : "pointer"}}>
							<a className="nav-link ml-lg-0" onClick= { () => {redirectUrl("/")}}>Home
								<span className="sr-only">(current)</span>
							</a>
						</li>
						<li className={`nav-item ${products}`} style={{"cursor" : "pointer"}}>
							<a className="nav-link" onClick= { () => {redirectUrl("/products")}}>Products</a>
						</li>
						{authenticate ? 
						<>
							<li className={`nav-item ${orders}`} style={{"cursor" : "pointer"}}>
								<a  className="nav-link" onClick= { () => {redirectUrl("/orders")}} >Orders</a>
							</li>
							<li className={`nav-item`} style={{"cursor" : "pointer"}}>
								<a  className="nav-link" onClick= { () => {loginClose()}} >Log Out</a>
							</li>
						</>

							: 
							<>
								<li className="nav-item" style={{"cursor" : "pointer"}}>
									<a  className="nav-link" onClick= { () => {redirectUrl("/login")}} >Log in</a>
								</li>
								<li className="nav-item" style={{"cursor" : "pointer"}}>
								<a  className="nav-link" onClick= { () => {redirectUrl("/register")}} >Sign in</a>
								</li>
							</>

						}
					</ul>

				</div>
			</nav>
		</header>
  );
}

Header.propTypes = {
  
};

export default Header;