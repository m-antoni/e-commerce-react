import * as TYPES from './../../types';
import { ToastDanger } from '../../../helpers/_toast';
import { CartService } from './_service.cart';
import { SwalError, SwalWarning } from '../../../helpers/_swal';

// Set loading
export const setLoading = (type = null) => async dispatch => dispatch({ type: TYPES.SET_LOADING, payload: type });


export const handleCart = (action, item) => async (dispatch, getState) => {
    
    let { cart_items, cart } = getState().cart;

    switch (action) {
        case 'add':
            // check item if already on the list;
            const checkItem = cart_items.filter(cart_item => cart_item.id === item.id);

            if(checkItem.length > 0){
                alert(`${item.title} is already added to cart.`)
            }else{
                item['qty'] = 1;
                cart_items.push(item);
                cart++;
            }

            break;
        case 'inc':
            // increment qty of item
            cart_items.map(prod => {
                if(prod.id === item.id){
                    prod['qty'] = prod['qty'] + 1;
                }
            });

            break;
        case 'dec':
            // decrement qty of item
            const cartIndex = cart_items.findIndex((prod) => prod.id === item.id);

            if(cart_items[cartIndex]['qty'] === 1){
                // ask to remove item in the cart
                SwalWarning('Warning!', 'Do you want to remove this item?', () => dispatch(removeItemFromCart(cart_items[cartIndex])));
            }
            else{
                let decrement = cart_items[cartIndex]['qty'] =  cart_items[cartIndex]['qty'] - 1;
                cart_items[cartIndex]['qty'] = decrement;
            }
            
            break;
        default:
            break;
    }

    dispatch({ type: TYPES.HANDLE_CART, payload: { cart, cart_items } })
}


// remove from cart
export const removeItemFromCart = (item) => async (dispatch, getState) => {
    
    let { cart_items } = getState().cart;

    let cart_items_updated = cart_items.filter(cart => cart.id !== item.id);

    dispatch({ type: TYPES.HANDLE_CART, payload: { cart: cart_items_updated.length, cart_items: cart_items_updated } })
}



// Get user Cart
export const getUserCart = () => async dispatch => {
    
    try {
        
        const res = await CartService.getUserCart();

        let payload = {
            cart: res.data.cart,
            cart_items: res.data.cart_items
        }

        dispatch({ type: TYPES.GET_USER_CART, payload })

    } catch (err) {
        console.log(err)
    }
}
