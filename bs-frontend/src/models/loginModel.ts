import {message} from 'antd';
import {routerRedux} from "dva/router";
import GlobalState from '../types/globalState';
import {getName, loadSession, logOut, saveSession} from '../utils/localStorage';
import {LoginFormData} from '../components/LoginForm';
import {tssFetch} from '../utils/tssFetch';

const state: GlobalState = {
    token: '',
    name: ''
};

const model = {
    namespace: 'login',
    state: {
        ...state,
        name:""
    },
    reducers: {
        saveSession(st) {
            saveSession({token: st.token, name: st.name});
            return {...st};
        },
        loadSession(st) {
            return loadSession(st)
        },
        updateSession(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            history.listen(location => {
                    dispatch({
                        type: 'updateSession',
                        payload: {}
                    })
            });
        }
    },
    effects: {
        * login(payload: { payload: LoginFormData }, {call, put}) {
            const msg = payload.payload;
            const response = yield call(tssFetch, '/session/login', 'POST', msg);
            console.log(response);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            if (response.status != 200) {
                message.error(body.info);
                return;
            }
            console.log(body.token)
            yield put({type: 'updateSession', payload: {name: body.name, token: body.token}});
            message.success('登录成功');
            yield put({type: 'saveSession'});
            yield put(routerRedux.push('/navi'));
            return;
        },
        * echo(payload: {}, {call, put}) {
            const response = yield call(tssFetch, '/echo', 'GET', {});
            console.log(response);
        },
        * logout(payload: {}, {call, put}) {
            logOut();
            yield put({type: 'updateSession', payload: {name: '', token: ''}});
        },
        * add(payload: {payload: {name: string | null, password: string | null, email: string | null, gender: string | null, telephone: string | null}}, {call, put}){
            const userinfo = payload.payload;
            console.log(userinfo.name)
            const response = yield call(tssFetch, '/user/add', 'PUT', {"name":userinfo.name, "password": userinfo.password, "email": userinfo.email, "gender": userinfo.gender, "telephone": userinfo.telephone});
            console.log(response.status);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log(body);
            if(response.status!=201){
                console.log(body);
                message.error(body["status"]);
            }else{
                message.success(body["status"]);
            }
        }
    },
};

export default model;
