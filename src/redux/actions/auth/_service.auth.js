import http from '../../../utils/api.http';

export const AuthService =  {
    authLogin: (params) => http.post('/auth/login', params),
    authRegister: (params) => http.post('/auth/register', params),
    authVerify: () => http.get('/auth/verify'),
}