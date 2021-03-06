import * as TYPES from '../types';

const initialState = {
    shipping: [],
    default_shipping: null,
    edit_form: null,
    forms: [
        { address: '', contact: '' }
    ],
    loading: null,
    shipping_modal: false,
    shipping_form: 'close'
}

const shippingReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case TYPES.HANDLE_INPUT:
            return {
                ...state,
                ...action.payload
            }
        case TYPES.ADD_FORMS:
            return {
                ...state,
                ...action.payload
            }
        case TYPES.SET_MODAL:
            return {
                ...state,
                shipping_modal: action.payload
            }
        case TYPES.GET_SHIPPING:
            return {
                ...state,
                ...action.payload
            }
        case TYPES.SHIPPING_FORM: 
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


export default shippingReducer;