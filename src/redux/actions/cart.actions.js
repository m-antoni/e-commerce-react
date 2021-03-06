import * as TYPES from '../types';
import { CartService } from '../../utils/api.service';
import { SwalWarning } from '../../helpers/swal';

// Set loading
export const setLoading = (type = null) => async dispatch => dispatch({ type: TYPES.SET_LOADING, payload: type });


export const handleCart = (action, item) => async (dispatch, getState) => {
    
    let { cart_items, cart, checkout: { items } } = getState().cart;

    switch (action) {
        case 'buy':
            let payload = {
                checkout: {
                     items: [item],
                     subtotal: item.price,
                     total: item.price
                }
            } 
            dispatch({ type: TYPES.CHECKED_ITEM, payload });
            break;
        case 'add':
            // check item if already on the list
            const checkItem = cart_items.filter(cart_item => cart_item._id === item._id);

            if(checkItem.length > 0){
                alert(`${item.title} is already added to cart.`)
            }else{
                item['qty'] = 1;
                item['checked'] = false;
                cart_items.push(item);
                cart++;
            }

            break;
        case 'inc':
            // increment qty of item
            cart_items.map(prod => {
                if(prod._id === item._id){
                    prod['qty'] = prod['qty'] + 1;
                }
            });

            break;
        case 'dec':
            // decrement qty of item
            const cartIndex = cart_items.findIndex((prod) => prod._id === item._id);
            let decrement = cart_items[cartIndex]['qty'] =  cart_items[cartIndex]['qty'] - 1;
            cart_items[cartIndex]['qty'] = decrement;
            break;
        default:
            break;
    }


    // Checked if item is Checked then will update the checkout state
    let isChecked = cart_items.filter(cart => {
        if(cart._id === item._id){
            if(cart.checked){
                return true;
            }
        } 
    });

    if(isChecked.length > 0){
        let checked_item = isChecked[0];
        checked_item['amount'] = Number((checked_item.price).toFixed(2)) * checked_item.qty;

        let update_items = items.map(_item => {
            if(_item._id === item._id){
                _item = checked_item;
            }
            return _item;
        });
        
        let _total = update_items.reduce((prev, { amount }) => prev + amount, 0);

        let payload = {
            checkout: {
                items: update_items,
                subtotal: _total,
                total: _total + 5
            },
            cart_items: update_items,
            checked_group: false
        }

        dispatch({ type: TYPES.CHECKED_ITEM, payload });
    }

    // just continue handing inc, dec functions
    dispatch({ type: TYPES.HANDLE_CART, payload: { cart, cart_items } })
}


// Check item from cart items
export const checkItem = (e, _item) => async (dispatch, getState) => {
    
    let { cart_items, checkout: { items, subtotal, total } } = getState().cart;
    let { checked } = e.target;

    // check if true add else remove
    if(checked) {

        let _total = Number((subtotal).toFixed(2)) + (Number((_item.price).toFixed(2)) * _item.qty);
        _item['amount'] = Number((_item.price).toFixed(2)) * _item.qty; // total amount per item

        // updating the cart items checked
        let updateCart = cart_items.map(_cart => {
            if(_cart._id === _item._id){
                _cart['checked'] = true;
            }
            return _cart;
        });

        let payload = {
           checkout: {
                items: items.concat(_item),
                subtotal: _total,
                total: _total + 5
           },
           cart_items: updateCart,
           checked_group: false
        }
        
        dispatch({ type: TYPES.CHECKED_ITEM, payload });

    }else{
        
        let update_items = items.filter(update => update._id !== _item._id );
        let _total = update_items.length > 0 ? update_items.reduce((prev, { amount }) => prev + amount, 0) : 0;

        // updating the cart items checked
        let updateCart = cart_items.map(_cart => {
            if(_cart._id === _item._id){
                _cart['checked'] = false;
            }
            return _cart;
        });

        let payload = {
            checkout: {
                items: update_items,
                subtotal: _total,
                total: _total
           },
           cart_items: updateCart,
           checked_group: false
        }

        dispatch({ type: TYPES.CHECKED_ITEM, payload });
    }
}

// Cheked Group items
export const checkedGroup = e => async (dispatch ,getState) => {
  
    let { cart_items } = getState().cart;
    let { checked } = e.target;

    let update_cart;
    let _total;

    if(checked){
        update_cart = cart_items.map(item => ({...item, checked: true, amount: Number((item.price).toFixed(2)) * item.qty }));
        _total = update_cart.reduce((prev, { amount }) => prev + amount, 0);
    }else{
        update_cart = cart_items.map(item => ({...item, checked: false }));
        _total = 0;
    }

    let payload = {
        checkout: {
            items: checked ? update_cart : [],
            subtotal: _total,
            total: _total + 5
       },
       cart_items: update_cart,
       checked_group: checked
    }

    dispatch({ type: TYPES.CHECKED_ITEM, payload });    
}


// remove from cart warning
export const removeWarning = () => async dispatch => SwalWarning('Warning!', 'Are you sure you want to remove selected item(s)?', () => dispatch(removeFromCart()));

export const removeFromCart = () => async (dispatch, getState) => {

    let { cart_items } = getState().cart;

    let update_cart = cart_items.filter(cart => cart.checked !== true);

    let payload = {
        cart: update_cart.length,
        cart_items: update_cart,
        checkout: {
            items: [],
            subtotal: 0.00,
            total: 0.00
        },
        checked_group: false,
    }

    dispatch({ type: TYPES.REMOVE_ITEM, payload });
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


// UnCheck all the checked items
export const clearCheckOut = () => async (dispatch, getState) => {
    
    let { cart_items } = getState().cart;

    let payload = {
        cart_items: cart_items.map(item => ({ ...item, checked: false })),
        checkout: {
            items: [],
            subtotal: 0.00,
            total: 0.00
        },
        checked_group: false,
    }

    dispatch({ type: TYPES.CLEAR_CHECKOUT, payload });
}

