import http from './api.http';

// FakeStore
export const FakeStoreService = {
    getFakeStore: () => http.get('/fakestore')
}

// Authentication
export const AuthService =  {
    authLogin: (params) => http.post('/auth/login', params),
    authRegister: (params) => http.post('/auth/register', params),
    authVerify: () => http.get('/auth/verify'),
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