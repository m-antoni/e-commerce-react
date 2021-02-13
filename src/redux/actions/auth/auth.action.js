import * as TYPES from './../../types';
import { AuthService } from './_service.auth';
import { ToastDanger } from '../../../helpers/_toast';
import { getToken, removeUserSession, setUserSession } from '../../../helpers/common';

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
export const authVerify = () => dispatch => {
    
    if(!getToken()) {
        dispatch({ type: TYPES.LOGIN_FAILED });
    }

    dispatch(setLoading('auth'));
    AuthService.authVerify().then(res => {
        const payload = {
            isAuthenticated: true,
            user: res.data.user,
            id: res.data.id,
            token: res.data.token,
        }
        dispatch(setLoading());
        dispatch({ type: TYPES.LOGIN_SUCCESS, payload });
    })
    .catch(err => {
        dispatch(setLoading());
        dispatch({ type: TYPES.LOGIN_FAILED });
        console.log(err);
    })

}



/**
 * @route POST '/api/auth/register
 * @desc User Register
 * @access public
 */
export const authRegister = () => async (dispatch, getState) => {

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
        ToastDanger('Server Error.');
        dispatch(setLoading());
        console.log(err);
    }
}


/**
 * @route POST '/api/auth/login
 * @desc User Login
 * @access public
 */
export const authLogin = () => async (dispatch, getState) => {
    
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
        dispatch(setLoading());

    } catch (err) {
        ToastDanger('Server Error.');
        dispatch(setLoading());
        console.log(err);
    }
}



export const logOut = () => dispatch => {
    removeUserSession();
    dispatch({ type: TYPES.LOGIN_FAILED });
}