import {routerRedux} from "dva/router";

const model = {
    namespace: 'welcome',
    state: {
    },
    reducers: {
        updateUserInfo(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    effects: {
        * start(payload: {type: string}, {call, put}) {
            var type = payload["payload"].type;
            console.log(type)
            switch(type){
                case "cet4": yield put(routerRedux.push({pathname: "/recite/"+type, query: type}));break;
                case "cet6": yield put(routerRedux.push({pathname: "/recite/"+type, query: type}));break;
                case "ielts": yield put(routerRedux.push({pathname: "/recite/"+type, query: type}));break;
                case "toefl": yield put(routerRedux.push({pathname: "/recite/"+type, query: type}));break;
             }
        }
    }
};

export default model;
