import axios from 'axios';
const STORE_API = process.env.REACT_APP_STORE_API;

const http = axios.create ({
    baseURL: STORE_API,
    headers: {'Content-Type': 'application/json'},
});

export const ProductService = {
    getAllProducts: () => http.get('/products'),
    getSingleProduct: (id) => http.get(`/products/${id}`)
}