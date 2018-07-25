import {routerRedux, browserHistory} from 'dva/router';

const model = {
    namespace: 'navigation',
    state: {
        headVisibility: false,
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload};
        },
        changeVisibility(st, payload){
            return {...st, ...payload.payload};
        }
    },
    subscriptions: {
        setup({dispatch, history}) {
            return history.listen(({pathname}) => {
                if (pathname === '/') {
                    dispatch({ type: 'changeVisibility', payload: {headVisibility: false} });
                }else {
                    dispatch({type: 'changeVisibility', payload: {headVisibility: true}});
                }

            });
        }
    },
    effects: {
        * jump(payload: {payload: {direction: string}}, {call, put}) {
            const direction = payload.payload.direction;
            console.log(direction)
            switch(direction){
                case "extension": yield put(routerRedux.push({pathname: '/extend'})); break;
                case "navi": yield put(routerRedux.push({pathname: '/navi'})); break;
                case "startRecite": yield put(routerRedux.push({pathname: '/startRecite'})); break;
                case "modify": yield put(routerRedux.push({pathname: '/modify'})); break;
                case "notebook": yield put(routerRedux.push({pathname: "/notebook"}));yield put({type:"notebook/getlist", payload:{}}); break;
                case "reviewAndtest": yield put(routerRedux.push({pathname: "/review"}));yield put({type:"review/getQuestion", payload:{}}); break;
                // case "cet6": yield put(routerRedux.push({pathname: '/recite', query: direction})); break;
                // case "ielts": yield put(routerRedux.push({pathname: '/recite', query: direction})); break;
                // case "toefl": yield put(routerRedux.push({pathname: '/recite', query: direction})); break;
            }
            return;
        }
    }
};

export default model;
