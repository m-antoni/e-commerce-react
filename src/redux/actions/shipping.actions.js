import * as TYPES from '../types';
import { ShippingService } from '../../utils/api.service';
import { ToastDanger, ToastSuccess } from '../../helpers/toast';
import { SwalWarning } from '../../helpers/swal';

// Set loading
export const setLoading = (type = null) => async dispatch => dispatch({ type: TYPES.SET_LOADING, payload: type });

// Set Modal
export const setModal = (open = null) => async dispatch => dispatch({ type: TYPES.SET_MODAL, payload: open });

// Set Shipping form
export const shippingForm = (status, edit_form = null) => async dispatch => {

    let payload = {};

    switch (status) {
        case 'add':
            payload = { shipping_form: status }
            break;
        case 'edit':
            payload = { shipping_form: status, edit_form }
            break;
        default:
            payload = {
                forms: [
                    { address: '', contact: '' }
                ],
                shipping_form: status
            };
            break;
    }

    dispatch({ type: TYPES.SHIPPING_FORM, payload });
}

// Form inputs
export const handleInput = (e, index = null, type = null) => async (dispatch, getState) => {

    let { name, value, checked } = e.target;
    let { forms, shipping, edit_form } = getState().shipping;
    let payload;
    

    switch (type) {
        case 'is_default':
             // NOTE: index value is _id here
            shipping.map((ship, i) => {
                ship['is_default'] = ship._id === index ? checked : !checked;
            });
            
            dispatch(updateDefault(index));
            payload = { shipping };

            break;  
        case 'edit':
            edit_form[name] = value;
            payload = { edit_form };

            break;
        case 'add':
            forms[index][name] = value;
            payload = { forms };

            break;
        default:
            break;
    }


    dispatch({ type: TYPES.HANDLE_INPUT, payload });
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
            forms: [ { address: '', contact: '' } ],
            shipping_form: false,
        }

        dispatch({ type: TYPES.GET_SHIPPING, payload })
        ToastSuccess('Shipping Added Succcessfully');
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

        let payload = {
            shipping: res.data.shipping ? res.data.shipping.details : [],
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
            shipping: res.data.details
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
 
// Update Default 
export const updateDefault = (id) => async dispatch => {
    try {
        let res = await ShippingService.updateDefault(id);
        
        let payload = {
            shipping: res.data.details
        }

        dispatch({ type: TYPES.GET_SHIPPING, payload });
        ToastSuccess('Default Shipping has been updated.')

    } catch (err) {
        ToastDanger('Something went wrong.');
        console.log(err)
    }
}


// Update Single Shipping 
export const updateShipping = () => async (dispatch, getState) => {
    
    let { edit_form } = getState().shipping;

    if(edit_form['address'] === '' || edit_form['contact'] === '')
        return ToastDanger('Address and Contact is required.');

    try {
        
        dispatch(setLoading('shipping'));
     
        let params = {
            _id: edit_form['_id'],
            address: edit_form['address'],
            contact: edit_form['contact']
        }

        let res = await ShippingService.updateShipping(params._id, params);

        let payload = {
            shipping: res.data.details,
            shipping_form: 'close'
        }

        dispatch({ type: TYPES.GET_SHIPPING, payload });
        ToastSuccess('Shipping Updated Successfully.')
        dispatch(setLoading());

    } catch (err) {
        ToastDanger('Something went wrong.');
        dispatch(setLoading());
        console.log(err)
    }
}

