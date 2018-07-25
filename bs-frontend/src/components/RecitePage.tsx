import {Component, FormEvent, ReactNode} from 'react';
import * as React from 'react';
import {Icon, Form, Button, Input, message, Col, Row, Avatar, Progress } from 'antd';
import DvaProps from '../types/DvaProps';

const FormItem = Form.Item;

interface ReciteProps extends DvaProps {
    form: any;
    cet4Done: string;
    cet6Done: string;
    toeflDone: string;
    ieltsDone: string;
    // cet4: number;
    // cet6: number;
    // toefl: number;
    // ielts: number;
}
interface LoginFormState {

}


export default class ReciteComponent extends Component<ReciteProps> {
    constructor(props){
        super(props);
        this.props.dispatch({type:"startRecite/getDone", payload: {}});
    }


    componentDidMount() {

    }
    render() {
        var cet4 = parseInt(this.props.cet4Done)*10;
        var cet6 = parseInt(this.props.cet6Done)*10;
        var toefl = parseInt(this.props.toeflDone)*10;
        var ielts = parseInt(this.props.ieltsDone)*10;
        return (
           <div style={{textAlign: "center",height: "100%",background: "#ECECEC"}}>
               <h1>My Word Book</h1>
               <div style={{margin: "5px auto", width: "70%", height: "80%"}}>
               <Row style={{margin: "2%", height: "50%"}}>
                   <Col span={10} style={{background: "white", textAlign: "left", padding: "2%",height: "85%"}}>
                       <Avatar size={"large"} src={require("../img/cet4.png")}></Avatar><span className={"ant-menu-item-group-title"} style={{marginLeft: "8px", fontSize: "large",marginRight: "40%"}}>大学四级</span>
                       <a onClick={()=>{this.props.dispatch({type: 'startRecite/jump', payload: {direction: "cet4", done: this.props.cet4Done}})}}> <span>Start</span><Icon type={"double-right"}></Icon></a>
                       <Row style={{marginBottom: "7%", marginTop: "6%"}}>
                           <Col span={12} style={{textAlign: "center"}}>
                               <label style={{fontSize: 20, marginRight: "8px"}}>Task</label><span>10</span>
                           </Col>
                           <Col span={12} style={{textAlign: "center"}}>
                               <label style={{fontSize: 20, marginRight: "8px"}}>Done</label><span>{this.props.cet4Done}</span>
                           </Col>
                       </Row>
                       <Progress percent={cet4} status="active" />
                   </Col>
                   <Col span={4}/>
                   <Col span={10} style={{background: "white", textAlign: "left", padding: "2%",height: "85%"}}>
                       <Avatar size={"large"} src={require("../img/cet6.png")}></Avatar><span className={"ant-menu-item-group-title"} style={{marginLeft: "8px", fontSize: "large",marginRight: "40%"}}>大学六级</span>
                       <a onClick={()=>{this.props.dispatch({type: "startRecite/jump", payload:{direction: "cet6", done: this.props.cet6Done}})}} style={{marginRight: "2%"}}> <span>Start</span><Icon type={"double-right"}></Icon></a>
                       <Row style={{marginBottom: "7%", marginTop: "6%"}}>
                           <Col span={12} style={{textAlign: "center"}}>
                               <label style={{fontSize: 20, marginRight: "8px"}}>Task</label><span>10</span>
                           </Col>
                           <Col span={12} style={{textAlign: "center"}}>
                               <label style={{fontSize: 20, marginRight: "8px"}}>Done</label><span>{this.props.cet6Done}</span>
                           </Col>
                       </Row>
                       <Progress percent={cet6} status="active" />
                   </Col>
               </Row>
               <Row style={{margin: "2%", height: "10%"}}>
                   <Col span={10} style={{background: "white", textAlign: "left", padding: "2%",height: "85%"}}>
                       <Avatar size={"large"} src={require("../img/toefl.png")}></Avatar><span className={"ant-menu-item-group-title"} style={{marginLeft: "8px", fontSize: "large",marginRight: "40%"}}>托福单词</span>
                       <a onClick={()=>{this.props.dispatch({type: "startRecite/jump", payload:{direction: "toefl", done: this.props.toeflDone}})}}> <span>Start</span><Icon type={"double-right"}></Icon></a>
                       <Row style={{marginBottom: "7%", marginTop: "6%"}}>
                           <Col span={12} style={{textAlign: "center"}}>
                               <label style={{fontSize: 20, marginRight: "8px"}}>Task</label><span>10</span>
                           </Col>
                           <Col span={12} style={{textAlign: "center"}}>
                               <label style={{fontSize: 20, marginRight: "8px"}}>Done</label><span>{this.props.toeflDone}</span>
                           </Col>
                       </Row>
                       <Progress percent={toefl} status="active" />
                   </Col>
                   <Col span={4}/>
                   <Col span={10}style={{background: "white", textAlign: "left", padding: "2%",height: "85%"}}>
                       <Avatar size={"large"} src={require("../img/ielts.png")}></Avatar><span className={"ant-menu-item-group-title"} style={{marginLeft: "8px", fontSize: "large",marginRight: "40%"}}>雅思单词</span>
                       <a onClick={()=>{this.props.dispatch({type: "startRecite/jump", payload:{direction: "ielts", done: this.props.ieltsDone}})}}> <span>Start</span><Icon type={"double-right"}></Icon></a>
                       <Row style={{marginBottom: "7%", marginTop: "6%"}}>
                           <Col span={12} style={{textAlign: "center"}}>
                               <label style={{fontSize: 20, marginRight: "8px"}}>Task</label><span>10</span>
                           </Col>
                           <Col span={12} style={{textAlign: "center"}}>
                               <label style={{fontSize: 20, marginRight: "8px"}}>Done</label><span>{this.props.ieltsDone}</span>
                           </Col>
                       </Row>
                       <Progress percent={ielts} status="active" />
                   </Col>
               </Row>
               </div>
           </div>
        );
    }
}


