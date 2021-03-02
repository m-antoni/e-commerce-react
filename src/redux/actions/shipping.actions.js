import * as TYPES from '../types';
import { ShippingService } from '../../utils/api.service';
import { SwalWarning } from '../../helpers/swal';
import { ToastDanger } from '../../helpers/toast';

// Set loading
export const setLoading = (type = null) => async dispatch => dispatch({ type: TYPES.SET_LOADING, payload: type });

// Set Modal
export const setModal = (open = null) => async dispatch => dispatch({ type: TYPES.SET_MODAL, payload: open });

// getShipping 
export const getShipping = () => async dispatch => {
    
    try {
        
        let res = await ShippingService.getShipping();

        let is_default = res.data.shipping.details.filter(ship => ship.is_default === true);

        let payload = {
            shipping: res.data.shipping.details,
            default_shipping: is_default[0] ? is_default[0] : null
        }

        dispatch({ type: TYPES.GET_SHIPPING, payload })

    } catch (err) {
        ToastDanger('Something went wrong.');
        console.log(err)
    }
}