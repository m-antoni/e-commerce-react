import * as TYPES from '../types';

const initialState = {
    transactions: [],
    payment_status: false,
    payment_data: {},
    loading: null
}

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case TYPES.GET_TRANSACTION:
            return {
                ...state,
                ...action.payload
            }
        case TYPES.TRANSACTION_SUCCESS:
            return {
                ...state,
                ...action.payload
            }
        case TYPES.CLEAR_TRANSACTION:
            return {
                ...state,
                payment_status: false,
                payment_data: {}
            }
        default:
            return state;
    }
}

export default transactionReducer;