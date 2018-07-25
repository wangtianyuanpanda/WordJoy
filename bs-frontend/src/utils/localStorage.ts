// import GlobalState from '../types/globalState';
import {sessionStorageKey} from '../configs/localStorage';

interface GlobalState {
    name: string,
    token: string,

}
const saveSession = (state: GlobalState): null => {
    const {name, token} = state;
    const values = JSON.stringify({name, token});
    localStorage.setItem(sessionStorageKey, values);
    return null;
};

const loadSession = (state: GlobalState): GlobalState => {
    const values = JSON.parse(localStorage.getItem(sessionStorageKey) || '{}');
    return {...state, ...values};
};

const getAuthTokenFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(sessionStorageKey) || '{"token": ""}').token;
};

const getName = () => {
    return JSON.parse(localStorage.getItem(sessionStorageKey) || '{"name": ""}').uid;
};

const logOut = () => {
    localStorage.clear();
};

export {saveSession, loadSession, getAuthTokenFromLocalStorage , logOut, getName};
