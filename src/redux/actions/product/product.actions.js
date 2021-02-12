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