
  
import React, { useContext, useEffect } from 'react';
import authContext from '../context/auth/authContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AlertComponent from '../components/AlertComponent';

const Login = () => {

    //acceder al state
    const AuthContext = useContext(authContext);


    const {
      loginUser, 
      message,
      authenticate
    } = AuthContext;

    const navigate = useNavigate();
    useEffect(() => {
      if(authenticate)  navigate('/');
    }, [authenticate])

    return ( 
      <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                    .email("Email is not valid")
                    .required("Email is required"),
                    password: Yup.string()
                            .required("password is required")
                            .min(6, "password must be expected six characters"),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    loginUser(values);
                    resetForm();
                 }}
                >
                   <div className="container">
                      <div className="wrap">
                        <div className="row">
                          <div className="col-md-12">
                            <h3 className="text-center text-primary">Login Now</h3>
                            { message && <AlertComponent />}
                          </div>
                          <div className="col-md-12 d-flex justify-content-center">
                          <div className="login p-5 bg-dark mx-auto mw-100">
                            <Form action="#" method="post">
                              <div className="form-group">
                                <label className="mb-2">Email address</label>
                                <Field type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="" required="" />
                                <ErrorMessage name="email" component="div"  className="text-danger"/>
                              </div>
                              <div className="form-group">
                                <label className="mb-2">Password</label>
                                <Field type="password" name="password" className="form-control" id="password" placeholder="" required="" />
                                <ErrorMessage name="password" component="div"  className="text-danger"/>
                              </div>
                              <button type="submit" className="btn btn-primary submit mb-4">Log In</button>
                            </Form>
                            <h8 className="text-center text-primary">Do you need an account? <a href='/register'>register now</a></h8>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>
            </Formik>
     );
}
 
export default Login;