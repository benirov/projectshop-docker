import React, { useReducer } from 'react';
import appContext from './appContext';
import appReducer from './appReducer';

import {
    ADD_PRODUCT_CART,
    REMOVE_PRODUCT_CART,
    UPDATE_PRODUCT_CART,
    UPDATE_PRODUCT_CART_REMOVE,
    UPDATE_PRICE_TOTAL,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
    SET_MESSAGE,
    CLEAN_MESSAGE
} from '../../types';

import axiosClient from '../../config/axios';

const AppState = ({children}) => {

    //definir state
    const initialState = {
        cart: [],
        totalPrice: 0,
        message: null,
    }

    //definir reducer
    const  [ state, dispatch ] = useReducer(appReducer, initialState);


    const addProductCart  = async (product) => {

            if(!state.cart.find((productcart) => productcart._id === product._id)){
                dispatch({
                    type: ADD_PRODUCT_CART,
                    payload: product
                });
            }else{

                let arrayIndex = state.cart.find((productcart) => productcart._id === product._id);
                updateProductCart(arrayIndex._id);
            }
            updateTotalprice();

    }

    const updateProductCart  = async (id, type = true) => {

        if(type){
            dispatch({
                type: UPDATE_PRODUCT_CART,
                payload: id
            });
        }else{
            dispatch({
                type: UPDATE_PRODUCT_CART_REMOVE,
                payload: id
            });
        }
        updateTotalprice();

    }

    const updateTotalprice  = async () => {

            dispatch({
                type: UPDATE_PRICE_TOTAL,
            });
    }

    const deleteProductCart  = async (id) => {

            dispatch({
                type: REMOVE_PRODUCT_CART,
                payload: id
            });

            updateTotalprice();

    }

    const createOrder  = async (data) => {

        //enviamos la orden
        try {
            const resultado = await axiosClient.post('/api/createOrder', data);

            dispatch({
               type: CREATE_ORDER_SUCCESS,
               payload: resultado.data
           });

           setTimeout(() => {
            dispatch({
                type: CLEAN_MESSAGE,
                payload: null
            });
            
        }, 3000);

       } catch (error) {
           dispatch({
               type: CREATE_ORDER_ERROR,
               payload: error.response.data.message
           });
           
       }


    }

    const setMessage = async (message) => {

        dispatch({
            type: SET_MESSAGE,
            payload: message
        });

        setTimeout(() => {
            dispatch({
                type: CLEAN_MESSAGE,
                payload: null
            });
            
        }, 3000);
    }
    return (
        <appContext.Provider
            value={{
                cart: state.cart,
                totalPrice: state.totalPrice,
                message: state.message,
                addProductCart,
                updateTotalprice,
                updateProductCart, 
                deleteProductCart,
                createOrder,
                setMessage
            }}
         >
             {children}
        </appContext.Provider>
    )

}

export default AppState;