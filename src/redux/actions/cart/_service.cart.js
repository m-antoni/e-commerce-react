import http from '../../../utils/api.http';

export const CartService =  {
    getUserCart: () => http.get('/carts'),
    storeCart: (formParams) => http.post('/carts/store', formParams),
}