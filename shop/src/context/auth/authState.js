import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGIN_CLOSE,
    AUTENTICATE_USER,
    AUTENTICATE_USER_ERROR,
    CLEAN_ALERT,
} from './../../types';

import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AutState = ({children}) => {

    //definir state
    const initialState = {
        token : typeof window !== 'undefined' ? localStorage.getItem("token") : '',
        authenticate: null,
        user: null,
        message: null,
        type: 'success'
    }

    //definir reducer
    const  [ state, dispatch ] = useReducer(authReducer, initialState);

    //registrar Usuario

    const userRegister = async data => {
        try {
             const resultado = await axiosClient.post('/api/signup', data);
             dispatch({
                type: REGISTER_SUCCESS,
                payload: resultado.data
            });

        } catch (error) {
            dispatch({
                type: REGISTER_ERROR,
                payload: error.response.data.message
            });
            
        }

        setTimeout(() => {
            dispatch({
                type: CLEAN_ALERT,
                payload: null
            });
            
        }, 5000);
    }

    const loginUser  = async datos => {

        try {
            const resultado = await axiosClient.post('/api/signin', datos);

            dispatch({
               type: LOGIN_SUCCESS,
               payload: resultado.data
           });

       } catch (error) {
           dispatch({
               type: LOGIN_ERROR,
               payload: error.response.data.message
           });
           
       }

       setTimeout(() => {
           dispatch({
               type: CLEAN_ALERT,
               payload: null
           });
           
       }, 3000);

    }

    

    const autenticateUser = async () => {

        const token = localStorage.getItem("token");
        if(token) tokenAuth(token);

        try {
            const resultado = await axiosClient.get('/api/userAutenticate');
            if(resultado.data){
                dispatch({
                    type: AUTENTICATE_USER,
                    payload: resultado.data
                });
            }

       } catch (error) {
           dispatch({
               type: AUTENTICATE_USER_ERROR,
               payload: error.response.data.msg
           });
           
       }
        
    }

    const loginClose = async () => {

        dispatch({
            type: LOGIN_CLOSE,
        });
    }


    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticate: state.authenticate,
                user: state.user,
                message: state.message,
                type: state.type,
                userRegister,
                loginUser,
                autenticateUser,
                loginClose
            }}
         >
             {children}
        </authContext.Provider>
    )

}

export default AutState;