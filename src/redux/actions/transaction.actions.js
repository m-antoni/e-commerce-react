import * as TYPES from '../types';

// Set loading
export const setLoading = (type = null) => async dispatch => dispatch({ type: TYPES.SET_LOADING, payload: type });

// Transaction
export const transaction = (data) => async dispatch => {
    
    let payload = {
        payment_data: {
            amount: data.purchase_units[0]['amount']['value'],
            email: data.payer.email_address,
            transaction_no: data.payer.payer_id,
            date: data.create_time,
        },
        payment_status: true
    }

    dispatch({ type: TYPES.TRANSACTION_SUCCESS, payload });
}

// Clear Transaction
export const clearTransaction = () => async dispatch => dispatch({ type: TYPES.CLEAR_TRANSACTION });