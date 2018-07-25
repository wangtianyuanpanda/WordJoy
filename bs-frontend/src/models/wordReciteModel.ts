import {routerRedux} from "dva/router";
import {tssFetch} from "../utils/tssFetch";
import {message} from "antd";

const model = {
    namespace: 'recite',
    state: {
        dataSourceCet4:[
        ],
        dataSourceCet6:[
            {english: "hospital", chinese: "医院", example: "Let's go to hospital"}
        ]
    },
    reducers: {
        updateWord(st, payload) {
            return {...st, ...payload.payload};
        }
    },
    effects: {
        *loadcet4(payload: {}, {call,put}){
            //fetch cet4 words
            //TODO
            const response = yield call(tssFetch, '/words/cet4', 'GET')
            if(response.status!=200){
                message.error("Cet4 doesn't exist!")
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            yield put({
                type: "updateWord",
                payload: {dataSourceCet4: body["words"]}
            })
            console.log("CET4")
        },
        *loadcet6(payload: {}, {call,put}){
            //fetch cet4 words
            //TODO
            const response = yield call(tssFetch, '/words/cet6', 'GET')
            if(response.status!=200){
                message.error("Cet6 doesn't exist!")
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log("loading Cet6")
            console.log(body["words"])
            yield put({
                type: "updateWord",
                payload: {dataSourceCet6: body["words"]}
            })
            console.log("CET6")
        },
        *loadtoefl(payload: {}, {call,put}){
            //fetch toefl words
            const response = yield call(tssFetch, '/words/toefl', 'GET')
            if(response.status!=200){
                message.error("Cet6 doesn't exist!")
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log("loading Cet6")
            console.log(body["words"])
            yield put({
                type: "updateWord",
                payload: {dataSourceToefl: body["words"]}
            })
            console.log("TOEFL")
        },
        *loadielts(payload: {}, {call,put}){
            //fetch cet4 words
            const response = yield call(tssFetch, '/words/ietls', 'GET')
            if(response.status!=200){
                message.error("Cet6 doesn't exist!")
            }
            const jsonBody = yield call(response.text.bind(response));
            const body = JSON.parse(jsonBody);
            console.log("loading Cet6")
            console.log(body["words"])
            yield put({
                type: "updateWord",
                payload: {dataSourceIelts: body["words"]}
            })
            console.log("IELTS")
        },
        *know(payload:{english: string},{call,put}){
            // console.log(payload["payload"]["english"]);
            const english = payload["payload"]["english"]
            const response = yield call(tssFetch,'/words/recite/know/'+english);
            if(response.status == 200){
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
                console.log(body["status"])
            }

        },
        *unknow(payload:{english: string},{call,put}){
            // console.log(payload["payload"]["english"]);
            const english = payload["payload"]["english"]
            const response = yield call(tssFetch,'/words/recite/unknow/'+english);
            if(response.status == 200){
                const jsonBody = yield call(response.text.bind(response));
                const body = JSON.parse(jsonBody);
            }
            return;
        }
    }
};

export default model;