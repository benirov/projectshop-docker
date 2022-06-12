import React, { useContext } from 'react';
import authContext from '../context/auth/authContext';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import AlertComponent from '../components/AlertComponent';
const Register = () => {

    //acceder al state
  const AuthContext = useContext(authContext);


  const {
    userRegister, 
    message
  } = AuthContext;
    
    return ( 

      <Formik
                initialValues={{
                  username: '',
                  email: '',
                  password: '',
                }}
                validationSchema={Yup.object().shape({
                  username: Yup.string()
                        .required("Username is required"),
                  email: Yup.string()
                        .email("Email is not valid")
                        .required("Email is required"),
                  password: Yup.string()
                        .required("password is required")
                        .min(6, "password must be expected six characters"),
                })}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  userRegister(values);
                  resetForm();
                 }}
                >
                  <div className="container">
                  <div className="wrap">
                    <div className="row">
                      <div className="col-md-12">
                        <h3 className="text-center text-primary">Sign Now</h3>
                         { message && <AlertComponent />}
                      </div>
                      <div className="col-md-12 d-flex justify-content-center">
                      <div className="login p-5 bg-dark mx-auto mw-100">
                        <Form>
                        <div className="form-group">
                            <label className="mb-2">Username</label>
                            <Field type="text" name="username"  className="form-control" id="username" aria-describedby="emailHelp" placeholder="" required="" />
                            <ErrorMessage name="username" component="div"  className="text-danger"/>
                          </div>
                          <div className="form-group">
                            <label className="mb-2">Email address</label>
                            <Field type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="" required="" />
                            <ErrorMessage name="email" component="div"  className="text-danger"/>
                          </div>
                          <div className="form-group">
                            <label className="mb-2">Password</label>
                            <Field type="password" name="password" className="form-control" id="password" placeholder="" required="" />
                            <ErrorMessage name="password" component="div"  className="text-danger"/>
                          </div>
                          <button type="submit" className="btn btn-primary submit mb-4">Sign In</button>
                        </Form>
                        <label className="text-center text-primary">Do you need an account? <a href='/login'>Login now</a></label>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </Formik>
        );
}
 
export default Register;