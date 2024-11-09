
import { Cookies } from 'react-cookie';


const cookies = new Cookies();
export const setCookieToken = (token, expires) => {
    return cookies.set('access_token', token, { path: '/', expires: expires });
}

export const getCookieToken = () => {
    return cookies.get('access_token') || null;
}

export const deleteCookieAccessToken = () => {
    return cookies.remove('access_token');
}