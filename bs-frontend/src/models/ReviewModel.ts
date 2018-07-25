import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';
import {routerRedux} from 'dva/router';
const model = {
    namespace: 'review',
    state: {
        dataSource: [{english: "", chinese: "", example: "", type: ""}]
    },
    reducers: {
        updateReviewInfo(st, payload) {
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
        * getQuestion(payload: { payload: {} }, {call, put}) {
            const response = yield call(tssFetch, '/notebook/testlist', 'GET');
            if(response.status != 200) {
                message.error('Fail to get Notebook Words');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateReviewInfo',
                payload: {dataSource: body["noteBookWords"]}
            });
            return;
        },
        *finish(payload: {},{call, put}){
            yield put(routerRedux.push("/navi"))
        }
    }
};

export default model;
