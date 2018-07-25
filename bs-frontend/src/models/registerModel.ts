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
    namespace: 'register',
    state: {
    },
    reducers: {
    },
    subscriptions: {
    },
    effects: {
        * add(payload: {payload: {name: string | null, password: string | null, email: string | null, gender: string | null, telephone: string | null}}, {call, put}){
            const userinfo = payload.payload;
            console.log(userinfo.name)
            // const response = yield call(tssFetch, '/user/add', 'POST', {"name":userinfo.name, "password": userinfo.password, "email": userinfo.email, "gender": userinfo.gender, "telephone": userinfo.telephone});
            const response = yield call(tssFetch, '/user/add', 'POST', userinfo);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            if(response.status!=201){
                message.error(body["status"]);
            }else{
                message.success(body["status"]);
            }
            yield put({type: "initializeWord", payload:{uname: userinfo.name}})
        },
        *initializeWord(payload:{uname: string},{call,put}){
            console.log("!!!")
            const response = yield call(tssFetch, '/words/initialize/'+payload["payload"]["uname"],'GET');
            if(response.status==200){
                return;
            }else{
                message.error("Word Initialization failed.");
            }
        }
    },
};

export default model;
