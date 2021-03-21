import * as TYPES from '../types';
import { AuthService, CartService } from '../../utils/api.service';
import { ToastDanger } from '../../helpers/toast';
import { getToken, removeFakeStore, removeUserSession, setUserSession } from '../../helpers/globals';
import { SwalError, SwalWarning } from '../../helpers/swal';
import { getUserCart } from './cart.actions';

// Set loading
export const setLoading = (type = null) => async dispatch => dispatch({ type: TYPES.SET_LOADING, payload: type });

// Handle Input Change
export const handleInputChange = e => async dispatch => {
    const { name, value } = e.target;
    dispatch({ type: TYPES.HANDLE_INPUT, payload: { name, value } });
}

// Handle to clear forms
export const clearAuthForm = () => async dispatch => dispatch({ type: TYPES.CLEAR_AUTH_FORM });

/**
 * @route GET '/api/auth/verify
 * @desc User Login
 * @access public
*/
export const authVerify = () => async dispatch => {

    if(getToken() === null){
        return; // dont't bother if token is null
    }

    try {

        dispatch(setLoading('verify'));
        const res = await AuthService.authVerify()
        const payload = {
            isAuthenticated: res.data.user ? true : false,
            user: res.data.user,
            id: res.data.id,
            token: res.data.token
        }

        dispatch({ type: TYPES.LOGIN_SUCCESS, payload });
        dispatch(setLoading());

    } catch (err) {
        dispatch({ type: TYPES.CLEAR_CART });
        dispatch({ type: TYPES.LOGIN_FAILED });
        removeUserSession();
        removeFakeStore()
        dispatch(setLoading());
        console.log(err);
    }
}


/**
 * @route POST '/api/auth/register
 * @desc User Register
 * @access public
 */
export const authRegister = e => async (dispatch, getState) => {
    e.preventDefault();

    const { name, email, password, confirm_password} = getState().auth;

    if(password !== confirm_password){
        return ToastDanger('Password and Confirm password do not match');
    }

    const formParams = { name, email, password };

    try {
        dispatch(setLoading('auth'));
        const res = await AuthService.authRegister(formParams);
        setUserSession(res.data.token);

        const payload = {
            isAuthenticated: true,
            user: res.data.user,
            id: res.data.id,
            token: res.data.token,
        }

        dispatch({ type: TYPES.LOGIN_SUCCESS, payload });
        dispatch(setLoading());
    } catch (err) {
        ToastDanger(err.data.errors);
        dispatch(setLoading());        
        console.log(err);
    }
}


/**
 * @route POST '/api/auth/login
 * @desc User Login
 * @access public
 */
export const authLogin = e => async (dispatch, getState) => {
    e.preventDefault();

    const { email, password } = getState().auth;

    try {

        dispatch(setLoading('auth'));
        
        const formParams = { email, password };

        const res = await AuthService.authLogin(formParams);
        setUserSession(res.data.token);

        const payload = {
            isAuthenticated: true,
            user: res.data.user,
            id: res.data.id,
            token: res.data.token,
        }

        dispatch({ type: TYPES.LOGIN_SUCCESS, payload });
        dispatch(getUserCart());
        dispatch(setLoading());

    } catch (err) {
        ToastDanger(err.data.errors);
        dispatch(setLoading());
        console.log(err);
    }
}


export const LogoutAlert = () => dispatch => {
    SwalWarning('Warning!', 'Are you sure you want to logout?', () => dispatch(logOut()));
}

export const logOut = () => async (dispatch, getState) => {

    let { cart, cart_items  } = getState().cart;

    try {
        
        // store the items from localstorage to api
        let formParams = { cart, cart_items };
        await CartService.storeCart(formParams);

        dispatch({ type: TYPES.CLEAR_CART });
        dispatch({ type: TYPES.LOGIN_FAILED });
        removeUserSession();
        removeFakeStore();

    } catch (err) {
        console.log(err)
        SwalError('Something went wrong.')
    }
 
} 