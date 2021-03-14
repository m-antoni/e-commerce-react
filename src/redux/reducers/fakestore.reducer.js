import * as TYPES from '../types';

const initialState = {
    fakestore: [],
    single_fakestore: null,
    search: '',
    loading: null
}

const fakeStoreReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPES.SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case TYPES.SEARCH_FAKE_STORE:
            return {
                ...state,
                search: action.payload.search,
                fakestore: action.payload.result
            }
        case TYPES.SET_FAKE_STORE:
            return {
                ...state,
                fakestore: action.payload
            }
        case TYPES.SET_SINGLE_FAKE_STORE:
            return {
                ...state,
                single_fakestore: action.payload
            }
        default:
            return state;
    }
}

export default fakeStoreReducer;