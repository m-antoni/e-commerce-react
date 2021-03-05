import * as TYPES from '../types';
import { ShippingService } from '../../utils/api.service';
import { ToastDanger, ToastSuccess } from '../../helpers/toast';
import { SwalWarning } from '../../helpers/swal';

// Set loading
export const setLoading = (type = null) => async dispatch => dispatch({ type: TYPES.SET_LOADING, payload: type });

// Set Modal
export const setModal = (open = null) => async dispatch => dispatch({ type: TYPES.SET_MODAL, payload: open });

// Form inputs
export const handleInput = (e, index) => async (dispatch, getState) => {

    let { forms } = getState().shipping;
    let { name, value } = e.target;
    forms[index][name] = value;
    
    dispatch({ type: TYPES.HANDLE_INPUT, payload: forms });
}

// Form submit
export const addShipping = () => async (dispatch, getState)=> {
    
    let { forms } = getState().shipping;

    let checkForms = forms.filter(form => {
        if(form.address === '' || form.contact === ''){
            return true;
        }
    });

    if(checkForms.length > 0)
        return ToastDanger('Address and Contact is required.');

    try {
        
        dispatch(setLoading('shipping'));

        let params = { forms };
        
        let res = await ShippingService.addShipping(params);

            let payload = {
            shipping: res.data.details,
            forms: [ { address: '', contact: '', is_default: false } ],
        }

        dispatch({ type: TYPES.GET_SHIPPING, payload })
        ToastSuccess('Shipping Details Added Succcessfully');
        dispatch(setLoading());
    } catch (err) {
        console.log(err);
        dispatch(setLoading());
        ToastDanger(err.data.errors);
    }
}


// Add Forms
export const genForm = (type = 'add', index = null) => async (dispatch, getState) => {

    let { forms } = getState().shipping;

    let forms_val;
    if(type === 'add'){
        forms_val = forms.concat({ address: '', contact: '', is_default: false })
    }else{
        forms_val = forms.filter((fil, _index) => _index !== index);       
    }
       
    let payload = { forms: forms_val };
    dispatch({ type: TYPES.ADD_FORMS, payload });
}


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


// remove shipping confirm
export const removeShippingWarning = (id) => async dispatch => SwalWarning('Warning!', 'Are you sure to remove shipping detail?', () => dispatch(removeShipping(id)));

// remove shipping detail
export const removeShipping = (id) => async dispatch => {

    try {
        
        dispatch(setLoading('shipping'));

        let res = await ShippingService.removeShipping(id);

        let payload = {
            shipping: res.data.details,
            default_shipping: null
        }

        dispatch({ type: TYPES.GET_SHIPPING, payload });
        ToastSuccess('Shipping has been removed.')
        dispatch(setLoading());

    } catch (err) {
        ToastDanger('Something went wrong.');
        console.log(err)
        dispatch(setLoading());
    }

}
