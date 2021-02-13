import * as TYPES from '../types';

const initialState = {
    products: [],
    single_product: null,
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
        default:
            return state;
    }
}


export default productReducer;