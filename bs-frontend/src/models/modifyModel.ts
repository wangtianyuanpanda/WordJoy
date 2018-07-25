import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {routerRedux} from 'dva/router';

const model = {
    namespace: 'modify',
    state: {
        dataSourceCet4: [],
        dataSourceCet6: [],
        dataSourceToefl: [],
        dataSourceIelts: []
    },
    reducers: {
        updateModifyPageInfo(st, payload) {
            return {...st, ...payload.payload};
        },
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/user') {
                    dispatch({ type: 'userInfo', payload: {uid: ''} });
                }
            });
        }
    },
    effects: {
        *getWordBook(payload: {payload: {}}, {call, put}){
            console.log("fetching the  wordBook....")
            //get cet4
            const responseCet4 = yield call(tssFetch, '/words/cet4All', 'GET')
            if(responseCet4.status!=200){
                message.error("Cet4 doesn't exist!")
            }
            const jsonBodyCet4 = yield call(responseCet4.text.bind(responseCet4));
            const bodyCet4 = JSON.parse(jsonBodyCet4);
            //get cet6
            const responseCet6 = yield call(tssFetch, '/words/cet6All', 'GET')
            if(responseCet6.status!=200){
                message.error("Cet6 doesn't exist!")
            }
            const jsonBodyCet6 = yield call(responseCet6.text.bind(responseCet6));
            const bodyCet6 = JSON.parse(jsonBodyCet6);
            //get toefl
            const responseToefl = yield call(tssFetch, '/words/toeflAll', 'GET')
            if(responseToefl.status!=200){
                message.error("Toefl doesn't exist!")
            }
            const jsonBodyToefl = yield call(responseToefl.text.bind(responseToefl));
            const bodyToefl = JSON.parse(jsonBodyToefl);
            //get ielts
            const responseIelts = yield call(tssFetch, '/words/ieltsAll', 'GET')
            if(responseIelts.status!=200){
                message.error("Ielts doesn't exist!")
            }
            const jsonBodyIelts = yield call(responseIelts.text.bind(responseIelts));
            const bodyIelts = JSON.parse(jsonBodyIelts);
            //refresh the data
            yield put({
                type: "updateModifyPageInfo",
                payload: {dataSourceCet4: bodyCet4["words"], dataSourceCet6: bodyCet6["words"], dataSourceToefl: bodyToefl["words"], dataSourceIelts: bodyIelts["words"]}
            })
        },
        *delete(payload: {english: string}, {call, put}){
            const english = payload["payload"]["english"];
            const response = yield call(tssFetch, "/words/delete/"+english, "GET");
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            if(response.status==200){
                message.success(body.status);
            }
            yield put({type: "getWordBook", payload: {}})
            // yield put(routerRedux.push({pathname: "/modify"}))
            return;
        },
        *add(payload: {}, {call, put}){
            yield put(routerRedux.push("/addWord"));
            return;
        }
    }
}

export default model;