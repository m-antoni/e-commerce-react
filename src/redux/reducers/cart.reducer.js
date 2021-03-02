import * as TYPES from '../types';

const initialState = {
    cart: 0,
    cart_items: [],
    checkout: {
        items: [],
        subtotal: 0.00,
        total: 0.00
    },
    checked_group: false,
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
        case TYPES.GET_USER_CART:
            return {
                ...state,
                cart: action.payload.cart,
                cart_items: action.payload.cart_items,
                checkout: {
                    items: [],
                    subtotal: 0.00,
                    total: 0.00
                },
            }
        case TYPES.CHECKED_ITEM:
            return {
                ...state,
                checkout: action.payload.checkout,
                cart_items: action.payload.cart_items,
                checked_group: action.payload.checked_group
            }
        case TYPES.REMOVE_ITEM:
            return {
                ...state,
                ...action.payload
            }
        case TYPES.CLEAR_CART:
            return {
                ...state,
                cart: 0,
                cart_items: [],
                checkout: {
                    items: [],
                    subtotal: 0.00,
                    total: 0.00
                },
            }
        default:
            return state;
    }
}


export default cartReducer;