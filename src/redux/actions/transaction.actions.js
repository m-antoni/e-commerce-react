import * as TYPES from '../types';
import { ToastDanger } from '../../helpers/toast';
import { TransactionService } from '../../utils/api.service';
import { makeRandom } from '../../helpers/globals';
import { clearCheckOut } from '../actions/cart.actions';

// Set Loading
export const setLoading = (type = null) => async dispatch => dispatch({ type: TYPES.SET_LOADING, payload: type });

// Clear Transaction
export const clearTransaction = () => async dispatch => dispatch({ type: TYPES.CLEAR_TRANSACTION });

// Transaction
export const transaction = (data, type) => async (dispatch, getState) => {
    
    let { checkout } = getState().cart;
    let { default_shipping } = getState().shipping;

    let transPayload = {
        payment_data: {
            transaction_code: type === 'paypal' ? data.payer.payer_id: makeRandom(13).toUpperCase(),
            payment_type: type,
            shipping_details: type === 'paypal' ? null : default_shipping,
            items: checkout.items.map(item => ({ ...item, amount: parseFloat(item.amount).toFixed(2) })),
            amount: type === 'paypal' ? data.purchase_units[0]['amount']['value'] : parseFloat(checkout.total).toFixed(2),
            email: type === 'paypal' ? data.payer.email_address: null,
        },
        payment_status: true,
    }

    await dispatch(addTransaction(transPayload.payment_data));
    await dispatch({ type: TYPES.TRANSACTION_SUCCESS, payload: transPayload });
    await dispatch(clearCheckOut());
}

// Add Transaction
export const addTransaction = params => async dispatch => {
    
    try {
        
        await TransactionService.addTransaction(params);

    } catch (err) {
        console.log(err);
        ToastDanger('Something went wrong.');
    }
}


// Get Transactions
export const getTransaction = () => async dispatch => {
    try {
        
        const res = await TransactionService.getTransaction();

        const transactions = res.data.transactions;

        const payload = {
            transactions,
        }

        dispatch({ type: TYPES.GET_TRANSACTION, payload });

    } catch (err) {
        console.log(err);
        ToastDanger('Something went wrong.');
    }
}

