import dva, {connect} from 'dva';
import {Router, Route, Switch, routerRedux, browserHistory} from 'dva/router';
import * as React from 'react';
import {Layout, message} from 'antd';
import {BsFooter, BsHeader, NavigationBar} from './components/BsPublicComponents';
import HomePageComponent from './components/HomePage';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import NavigationPageComponent from './components/NavigationPage';
import UserPageComponent from './components/UserPage';
import LoginModel from './models/loginModel';
import NavigationModel from './models/navigationModel';
import StartReciteModel from './models/startReciteModel';
import WelcomeModel from './models/wordWelcomeModel';
import ReciteModel from './models/wordReciteModel';
import RegisterModel from './models/registerModel';
import NoteBookModel from "./models/noteBookModel";
import ModifyModel from "./models/modifyModel";
import ReviewModel from "./models/ReviewModel";
import LoginPageComponent from "./components/LoginPage";
import WordReciteComponent from "./components/WordRecitePage";
import WordWelcomeComponent from "./components/WordWelcomePage";
import ExtendComponent from "./components/ExtendPage";
import ReciteComponent from "./components/RecitePage";
import NotebookComponent from "./components/NotebookPage";
import ModifyComponent from "./components/Modify";
import AddPageComponent from "./components/AddPage";
import ReviewComponent from "./components/ReviewPage";
const {Content} = Layout;

const app = dva({
    history: browserHistory
});

app.model(LoginModel);
app.model(NavigationModel);
app.model(NoteBookModel);
app.model(WelcomeModel);
app.model(ReciteModel);
app.model(RegisterModel);
app.model(StartReciteModel);
app.model(ModifyModel);
app.model(ReviewModel);

const HomePage = connect(state => {
    return {}
})(HomePageComponent);

const NavigationPage = connect(state => {
    const {name} = state.login;
    return {name: name}
})(NavigationPageComponent);

const UserPage = connect(state => {
    return {...state.userinfo};
})(UserPageComponent);

const LoginPage = connect(state => {
    return {};
})(LoginPageComponent);

const WordRecitePage = connect(state => {
    const {dataSourceCet4, dataSourceCet6, dataSourceToefl, dataSourceIelts} =  state.recite;
    return {dataSourceCet4: dataSourceCet4, dataSourceCet6: dataSourceCet6, dataSourceToefl: dataSourceToefl, dataSourceIelts: dataSourceIelts};
})(WordReciteComponent)

const WordWelcomePage = connect(state => {
    return {};
})(WordWelcomeComponent)

const ExtendPage = connect(state =>{
    return {};
})(ExtendComponent)

const BsHeaderComponent = connect(state =>{
    return {headVisibility: state.navigation.headVisibility};
})(BsHeader)

const RecitePage = connect(state => {
    const {cet4Done, cet6Done, toeflDone, ieltsDone} = state.startRecite;
    return {cet4Done: cet4Done, cet6Done:cet6Done, toeflDone:toeflDone, ieltsDone:ieltsDone}
})(ReciteComponent)

const NotebookPage = connect(state => {
    const {dataSource} = state.notebook;
    return {dataSource: dataSource};
})(NotebookComponent)

const ModifyPage = connect(state =>{
    const {dataSourceCet4, dataSourceCet6, dataSourceToefl, dataSourceIelts} = state.modify;
    return{dataSourceCet4: dataSourceCet4, dataSourceCet6: dataSourceCet6, dataSourceToefl: dataSourceToefl, dataSourceIelts: dataSourceIelts};
})(ModifyComponent)

const AddWordPage = connect(state =>{
    return {}
})(AddPageComponent)

const ReviewPage = connect(state =>{
    const {dataSource} = state.review;
    console.log(dataSource);
    return {dataSource: dataSource};
})(ReviewComponent)

const Navigation = connect(state =>{
    return {show: state.navigation.headVisibility}
})(NavigationBar)
app.router(({history}) => (
        <Router history={history}>
            <Layout>
                <BsHeaderComponent/>
                <Content style={{minHeight: "600px", width: "100%", backgroundColor: "white"}}>
                    <Navigation/>
                    <Switch>
                        <Route path="/" exact component={HomePage}/>
                        <Route path="/navi" component={NavigationPage}/>
                        <Route path="/user" component={UserPage}/>
                        <Route path="/notebook" component={NotebookPage}/>
                        <Route path="/login" component={HomePage}/>
                        <Route path="/recite/:wordCategory" component={WordRecitePage}/>
                        <Route path="/welcome" component={WordWelcomePage}/>
                        <Route path="/extend" component={ExtendPage}/>
                        <Route path="/startRecite" component={RecitePage}/>
                        <Route path="/modify" component={ModifyPage}/>
                        <Route path="/addWord" component={AddWordPage}/>
                        <Route path="/review" component={ReviewPage}/>
                    </Switch>
                </Content>
                <BsFooter/>
            </Layout>
        </Router>
    )
);

app.start('#root');

registerServiceWorker();
