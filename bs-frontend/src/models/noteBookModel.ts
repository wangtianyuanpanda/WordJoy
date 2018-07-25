import {tssFetch} from '../utils/tssFetch';
import {message} from 'antd';

const model = {
    namespace: 'notebook',
    state: {
        dataSource: []
    },
    reducers: {
        updateNoteBookInfo(st, payload) {
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
        * getlist(payload: { payload: {} }, {call, put}) {
            const response = yield call(tssFetch, '/notebook/list', 'GET');
            if(response.status != 200) {
                message.error('Fail to get Notebook Words');
                return;
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: 'updateNoteBookInfo',
                payload: {dataSource: body["noteBookWords"]}
            });
            return;
        }
    }
};

export default model;
