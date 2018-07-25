import {message} from 'antd';
import {routerRedux,browserHistory} from "dva/router";
import GlobalState from '../types/globalState';
import {getName, loadSession, logOut, saveSession} from '../utils/localStorage';
import {LoginFormData} from '../components/LoginForm';
import {tssFetch} from '../utils/tssFetch';

const state: GlobalState = {
    token: '',
    name: ''
};

const model = {
    namespace: 'startRecite',
    state: {
        cet4Done: "",
        cet6Done: "",
        toeflDone: "",
        ieltsDone: ""
    },
    reducers: {
        updatestartReciteInfo(state, payload){
            return {...state, ...payload.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/') {
                    dispatch({ type: 'jump', payload: {direction: ""} });
                }
            });
        }
    },
    effects: {
        * jump(payload: {direction: string}, {call, put}){
            const direction = payload["payload"]["direction"]
            const done = payload["payload"]["done"]
            console.log(direction);
            var Done;
            switch (direction){
                case "cet4": yield put(routerRedux.push({pathname: '/welcome', query: {direction, done}})); yield put({type: 'recite/loadcet4', payload: ""}); break;
                case "cet6": yield put(routerRedux.push({pathname: '/welcome', query: {direction, done}})); yield put({type: 'recite/loadcet6', payload: ""});break;
                case "ielts": yield put(routerRedux.push({pathname: '/welcome', query: {direction, done}})); yield put({type: 'recite/loadielts', payload: ""});break;
                case "toefl": yield put(routerRedux.push({pathname: '/welcome', query: {direction, done}})); yield put({type: 'recite/loadtoefl', payload: ""});break;
            }
        },
        * add(payload: {payload: {english: string | null, chinese: string | null, example: string | null, type: string | null}},{call,put}){
            const word = payload.payload;
            console.log(word);
            const response = yield call(tssFetch, "/words/add", "POST", word);
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            if(response.status!=200){
                message.error(body["status"]);
            }else{
                message.success(body["status"]);
            }
        },
        *getDone(payload: {}, {call, put}){
            const responseCet4 = yield call(tssFetch, "/words/knowNumber/cet4", "GET")
            const jsonBodyCet4 = yield call(responseCet4.text.bind(responseCet4));
            const bodyCet4 = JSON.parse(jsonBodyCet4);
            const cet4 = bodyCet4["status"];
            const responseCet6 = yield call(tssFetch, "/words/knowNumber/cet6", "GET")
            const jsonBodyCet6 = yield call(responseCet6.text.bind(responseCet6));
            const bodyCet6 = JSON.parse(jsonBodyCet6);
            const cet6 = bodyCet6["status"];
            const responseToefl = yield call(tssFetch, "/words/knowNumber/toefl", "GET")
            const jsonBodyToefl = yield call(responseToefl.text.bind(responseToefl));
            const bodyToefl = JSON.parse(jsonBodyToefl);
            const toefl = bodyToefl["status"];
            const responseIelts = yield call(tssFetch, "/words/knowNumber/ielts", "GET")
            const jsonBodyIelts = yield call(responseIelts.text.bind(responseIelts));
            const bodyIelts = JSON.parse(jsonBodyIelts);
            const ielts = bodyIelts["status"];
            yield put({
                type: "updatestartReciteInfo",
                payload: {cet4Done: cet4, cet6Done: cet6, toeflDone: toefl, ieltsDone: ielts}
            })
        }
    },
};

export default model;
