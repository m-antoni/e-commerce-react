import * as TYPES from '../types';

const initialState = {
    cart: 0,
    cart_items: [],
    loading: null,
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case TYPES.HANDLE_CART:
            return {
                ...state,
                cart: action.payload.cart,
                cart_items: action.payload.cart_items
            }
        default:
            return state;
    }
}


export default cartReducer;