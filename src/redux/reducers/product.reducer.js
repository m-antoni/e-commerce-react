import * as TYPES from '../types';

const initialState = {
    products: [],
    single_product: null,
    cart: 0,
    cart_items: [],
    loading: false,
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case TYPES.GET_ALL_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        case TYPES.GET_SINGLE_PRODUCT:
            return {
                ...state,
                single_product: action.payload
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


export default productReducer;