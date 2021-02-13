import * as TYPES from './../../types';
import { ToastDanger } from '../../../helpers/_toast';
import { ProductService } from './_service.product';

// Set loading
export const setLoading = (type = null) => async dispatch => dispatch({ type: TYPES.SET_LOADING, payload: type });

/**
 * @route POST '/store/products
 * @desc Get All Products
 * @access public
*/
export const getAllProducts = () => async dispatch => {
    
    dispatch(setLoading(true));

    try {
        
        const res = await ProductService.getAllProducts();

        console.log(res);
        dispatch({ type: TYPES.GET_ALL_PRODUCTS, payload: res.data });
        dispatch(setLoading(false));

    } catch (err) {
        ToastDanger('Server Error');
        dispatch(setLoading(false));
        console.log(err)
    }

}


/**
 * @route POST '/store/products/:id
 * @desc Get Single Product
 * @access private
*/
export const getSingleProduct = (id) => async dispatch => {
    
    dispatch(setLoading(true));

    try {
        
        const res = await ProductService.getSingleProduct(id);

        console.log(res);
        dispatch({ type: TYPES.GET_SINGLE_PRODUCT, payload: res.data });
        dispatch(setLoading(false));

    } catch (err) {
        ToastDanger('Server Error');
        dispatch(setLoading(false));
        console.log(err)
    }
}


export const handleCart = (action, item) => async (dispatch, getState) => {
    
    let { cart_items, cart } = getState().product;

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

