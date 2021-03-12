import http from './api.http';
import axios from 'axios';
const STORE_API = process.env.REACT_APP_STORE_API;

// Authentication api
export const AuthService =  {
    authLogin: (params) => http.post('/auth/login', params),
    authRegister: (params) => http.post('/auth/register', params),
    authVerify: () => http.get('/auth/verify'),
}

// Fake Store api
const _http = axios.create ({
    baseURL: STORE_API,
    headers: {'Content-Type': 'application/json'},
});

export const ProductService = {
    getAllProducts: () => _http.get('/products'),
    getSingleProduct: (id) => _http.get(`/products/${id}`)
}

// Cart 
export const CartService =  {
    getUserCart: () => http.get('/carts'),
    storeCart: (formParams) => http.post('/carts/store', formParams),
}

// Shipping
export const ShippingService = {
    getShipping: () => http.get('/shipping'),
    addShipping: (formParams) => http.post('/shipping', formParams),
    updateShipping: (id, formParams) => http.put(`/shipping/${id}`, formParams),
    removeShipping: (id) => http.delete(`/shipping/${id}`),
    updateDefault: (id) => http.put(`/shipping/default/${id}`)
}

// Transaction
export const TransactionService = {
    getTransaction: () => http.get('/transaction'),
    addTransaction: (formParams) => http.post('/transaction', formParams),
    singleTransaction: (id) => http.get(`/transaction/${id}`),
    removeTransaction: (id) => http.delete(`/transaction/${id}`)
}