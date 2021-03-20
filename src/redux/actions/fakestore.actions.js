import { getFakeStore, setFakeStore } from '../../helpers/globals';
import { ToastDanger } from '../../helpers/toast';
import * as TYPES from '../types';
import { authVerify } from './auth.action';
import { FakeStoreService } from '../../utils/api.service';

// Set loading
export const setLoading = (type = null) => async dispatch => dispatch({ type: TYPES.SET_LOADING, payload: type });

//  Set fake store
export const setFakeStoreAPI = () => async dispatch => {

    const api = getFakeStore();
    
    if(api){
        return false;
    }

    try {
        const res = await FakeStoreService.getFakeStore();

        setFakeStore(res.data.fakestore);
        dispatch({ type: TYPES.SET_FAKE_STORE, payload: res.data.fakestore });

    } catch (err) {
        console.log(err);
        ToastDanger('Server Error');
    }
}

// Handle Input Change
export const searchFakeStore = search => async dispatch => {
  
    try {
        const api = getFakeStore();

        if(api === null) {
            dispatch(authVerify());
        }else{
            const result = api.filter(fil => fil.search.includes(search));
            dispatch({ type: TYPES.SEARCH_FAKE_STORE, payload: { search, result } });
        }
        
    } catch (err) {
        console.log(err)
        ToastDanger('Something went wrong.')
    }   
}

// Get Single FakeStore
export const getSingleFakeStoreAPI = (id) => async dispatch => {
    
    try {
        
        const api = await getFakeStore();

        if(api === null){
            dispatch(authVerify());
        }else{
                
            const result = api.filter(fil => fil._id == id)[0];

            dispatch({ type: TYPES.SET_SINGLE_FAKE_STORE, payload: result });
        }

    } catch (err) {
        console.log(err)
        ToastDanger('Something went wrong.');
    }
}


// Filter
export const filterBy = (search = null)=> async dispatch => {
    try {
        const api = getFakeStore();

        let result = [];
        if(search){
            result = api.filter(fil => fil.category === search);
        }else{
            result = api;
        }


        dispatch({ type: TYPES.SEARCH_FAKE_STORE, payload: { search, result } });
        
    } catch (err) {
        console.log(err)
        ToastDanger('Something went wrong.')
    }   
}