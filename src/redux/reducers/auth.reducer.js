import * as TYPES from '../types';

const initialState = {
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    loading: null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case TYPES.HANDLE_INPUT:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case TYPES.CLEAR_AUTH_FORM:
            return {
                ...state,
                name: '',
                email: '',
                password: '',
                confirm_password: '',
                loading: null,
            }
        default:
            return state;
    }
}


export default authReducer;