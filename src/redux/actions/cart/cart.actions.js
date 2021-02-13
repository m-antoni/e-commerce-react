import * as TYPES from './../../types';
import { ToastDanger } from '../../../helpers/_toast';
import { CartService } from './_service.cart';

// Set loading
export const setLoading = (type = null) => async dispatch => dispatch({ type: TYPES.SET_LOADING, payload: type });


export const handleCart = (action, item) => async (dispatch, getState) => {
    
    let { cart_items, cart } = getState().cart;

    if(action === 'add')
    {
        const findId = cart_items.findIndex((prod) => prod.id === item.id);

        if (findId === -1) 
        {
            item['qty'] = 1;
            cart_items.push(item);
            cart++;
        } 
        else 
        {
            cart_items.map(prod => {
                if(prod.id === item.id){
                    prod['qty'] = prod['qty'] + 1;
                }
            })
            cart++;
        }

        dispatch({ type: TYPES.HANDLE_CART, payload: { cart, cart_items } })
    }
    else
    {
        cart.filter(prod => prod.id !== item.id);

        dispatch({ type: TYPES.HANDLE_CART, payload: cart })
    }
}


export const getUserCart = () => async dispatch => {
    
    try {
        
        const res = await CartService.getUserCart();

        console.log(res);

    } catch (err) {
        console.log(err)
    }

}