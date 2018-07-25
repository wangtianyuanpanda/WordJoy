import {apiBaseUrl} from '../configs/apiBaseUrl';
import {getAuthTokenFromLocalStorage} from './localStorage';

type httpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD';

const tssFetch = (url: string, method: httpMethod, payload: string | object): Promise<Response> => {
    console.log('tssFetch');
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const auth: string = getAuthTokenFromLocalStorage();
    console.log(auth)
    if (method !== 'GET' && method !== 'HEAD') {
        console.log("payload:", payload);
        return fetch(apiBaseUrl + url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': auth
            },
            body: <string>((typeof payload) === 'string' ? payload : JSON.stringify(payload))
        });
    } else {
        return fetch(apiBaseUrl + url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Auth-Token': auth
            }
        });
    }
};

export {httpMethod, tssFetch};
