import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// All reducers
import authReducer from './auth.reducer';
import cartReducer from './cart.reducer';
import productReducer from './product.reducer';

// persist config 
const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart'] // you want to persist in localstorage
}

// combining all reducers
const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);