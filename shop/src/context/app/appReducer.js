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


export default ( state, action) => {
    switch(action.type) {
        case ADD_PRODUCT_CART:
            return {
                ...state,
                cart: state.cart.concat(action.payload),
            }

        case UPDATE_PRODUCT_CART:
            return {
                ...state,
                cart: state.cart.map((product) => product._id == action.payload ? {...product, quantity: product.quantity+1 } : product),
            }

        case UPDATE_PRODUCT_CART_REMOVE:
            return {
                ...state,
                cart: state.cart.map((product) => product._id == action.payload && product.quantity >0 ? {...product, quantity: product.quantity-1 } : product),
            }

        case REMOVE_PRODUCT_CART:
            return {
                ...state,
                cart: state.cart.filter(element => element._id !== action.payload),
            }

        case UPDATE_PRICE_TOTAL:

            let totalPriceNew = 0;
            state.cart.forEach((e) => totalPriceNew = totalPriceNew+(e.quantity*e.price));
            return {
                ...state,
                totalPrice: totalPriceNew,
            };

        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                cart: [],
                message: action.payload.message,
                totalPrice: 0,
            };

        case CREATE_ORDER_ERROR:
            
            return {
                ...state,
                message: action.payload.message,
            };

        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload,
            }
        case CLEAN_MESSAGE:
            return {
                ...state,
                message: null,
            }
        default:
            return state;
    }
}